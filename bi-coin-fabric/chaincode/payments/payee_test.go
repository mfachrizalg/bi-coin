package main

import (
	"testing"

	"github.com/hyperledger/fabric-chaincode-go/v2/shim"
	"github.com/hyperledger/fabric-contract-api-go/v2/contractapi"
	"github.com/hyperledger/fabric-protos-go-apiv2/peer"
)

// payeeStub records the controls call and answers with the configured verdict.
type payeeStub struct {
	shim.ChaincodeStubInterface
	permit    bool
	chaincode string
	args      [][]byte
}

func (s *payeeStub) InvokeChaincode(chaincodeName string, args [][]byte, channel string) *peer.Response {
	s.chaincode = chaincodeName
	s.args = args
	if s.permit {
		return shim.Success(nil)
	}
	return shim.Error("transfer not permitted")
}

type payeeContext struct {
	contractapi.TransactionContextInterface
	stub shim.ChaincodeStubInterface
}

func (f payeeContext) GetStub() shim.ChaincodeStubInterface { return f.stub }

func TestCheckPayeeAsksControlsForTheVerdict(t *testing.T) {
	stub := &payeeStub{permit: true}
	if err := checkPayee(payeeContext{stub: stub}, "retail-1", 1000); err != nil {
		t.Fatalf("permitted payee refused: %v", err)
	}
	if stub.chaincode != controlsChaincode {
		t.Fatalf("chaincode = %q, want %q", stub.chaincode, controlsChaincode)
	}
	want := []string{"CheckPayee", "retail-1", "1000"}
	if len(stub.args) != len(want) {
		t.Fatalf("args = %q, want %q", stub.args, want)
	}
	for i := range want {
		if string(stub.args[i]) != want[i] {
			t.Fatalf("arg %d = %q, want %q", i, stub.args[i], want[i])
		}
	}
}

// Every refusal reaches the payer as the same error, whatever controls reported.
func TestCheckPayeeRefusalIsTheOnlyPayerError(t *testing.T) {
	stub := &payeeStub{permit: false}
	err := checkPayee(payeeContext{stub: stub}, "retail-1", 1001)
	if err != errPayeeRejected {
		t.Fatalf("want errPayeeRejected, got %v", err)
	}
	if err.Error() != "transfer not permitted" {
		t.Fatalf("unexpected text: %q", err.Error())
	}
}
