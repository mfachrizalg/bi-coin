package main

import (
	"testing"

	"github.com/hyperledger/fabric-chaincode-go/v2/pkg/cid"
	"github.com/hyperledger/fabric-chaincode-go/v2/shim"
	"github.com/hyperledger/fabric-contract-api-go/v2/contractapi"
	"github.com/hyperledger/fabric-protos-go-apiv2/peer"
)

type receiptIdentity struct {
	cid.ClientIdentity
	mspID      string
	attributes map[string]string
}

func (f receiptIdentity) GetMSPID() (string, error) {
	return f.mspID, nil
}

func (f receiptIdentity) GetAttributeValue(name string) (string, bool, error) {
	value, found := f.attributes[name]
	return value, found, nil
}

type receiptStub struct {
	shim.ChaincodeStubInterface
	controlsReply string
}

func (s receiptStub) InvokeChaincode(chaincodeName string, args [][]byte, channel string) *peer.Response {
	return shim.Success([]byte(s.controlsReply))
}

type receiptContext struct {
	contractapi.TransactionContextInterface
	identity cid.ClientIdentity
	stub     shim.ChaincodeStubInterface
}

func (f receiptContext) GetClientIdentity() cid.ClientIdentity {
	return f.identity
}

func (f receiptContext) GetStub() shim.ChaincodeStubInterface {
	return f.stub
}

func TestRequireReceiptReader(t *testing.T) {
	transfer := paymentReceipt{Reference: "payment-1", From: "retail-subject", To: "merchant-subject", Kind: "transfer"}
	conversion := paymentReceipt{Reference: "convert-1", From: "retail-bank", To: "retail-bank", Kind: "conversion"}
	cases := []struct {
		name          string
		identity      receiptIdentity
		controlsReply string
		receipt       paymentReceipt
		allowed       bool
	}{
		{"validator supervises any receipt", receiptIdentity{mspID: validatorMSP}, "false", transfer, true},
		{"subject party reads its transfer", receiptIdentity{mspID: endUserMSP}, "true", transfer, true},
		{"unrelated end user is denied", receiptIdentity{mspID: endUserMSP}, "false", transfer, false},
		{"distributor party reads conversion", receiptIdentity{mspID: distributorMSP, attributes: map[string]string{"distributor_id": "retail-bank"}}, "false", conversion, true},
		{"other distributor is denied", receiptIdentity{mspID: distributorMSP, attributes: map[string]string{"distributor_id": "wholesale-bank"}}, "false", conversion, false},
	}
	for _, tc := range cases {
		ctx := receiptContext{identity: tc.identity, stub: receiptStub{controlsReply: tc.controlsReply}}
		err := requireReceiptReader(ctx, tc.receipt)
		if tc.allowed && err != nil {
			t.Errorf("%s: unexpected denial: %v", tc.name, err)
		}
		if !tc.allowed && err == nil {
			t.Errorf("%s: expected denial", tc.name)
		}
	}
}
