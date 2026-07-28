package main

import (
	"crypto/x509"
	"errors"
	"sort"
	"strings"
	"time"

	"github.com/hyperledger/fabric-chaincode-go/v2/shim"
	"github.com/hyperledger/fabric-contract-api-go/v2/contractapi"
	"github.com/hyperledger/fabric-protos-go-apiv2/ledger/queryresult"
	"github.com/hyperledger/fabric-protos-go-apiv2/peer"
	"google.golang.org/protobuf/types/known/timestamppb"
)

const mockMinUnicodeRuneValue = 0

type mockStub struct {
	args           [][]byte
	State          map[string][]byte
	TxID           string
	TxTimestamp    *timestamppb.Timestamp
	signedProposal *peer.SignedProposal
	ChannelID      string
}

func newMockTransactionContext(txID string, ts time.Time) (*contractapi.TransactionContext, *mockStub) {
	return newMockTransactionContextWithMSP(txID, ts, BankIndonesiaMSP)
}

func newMockTransactionContextWithMSP(txID string, ts time.Time, mspID string) (*contractapi.TransactionContext, *mockStub) {
	stub := &mockStub{
		State:       make(map[string][]byte),
		TxID:        txID,
		TxTimestamp: timestamppb.New(ts.UTC()),
		ChannelID:   "test-channel",
	}
	ctx := &contractapi.TransactionContext{}
	ctx.SetStub(stub)
	ctx.SetClientIdentity(&mockClientIdentity{mspID: mspID})
	return ctx, stub
}

func setMockTransaction(stub *mockStub, txID string, ts time.Time) {
	stub.TxID = txID
	stub.TxTimestamp = timestamppb.New(ts.UTC())
}

func (stub *mockStub) GetTxID() string      { return stub.TxID }
func (stub *mockStub) GetChannelID() string { return stub.ChannelID }
func (stub *mockStub) GetArgs() [][]byte    { return stub.args }

func (stub *mockStub) GetStringArgs() []string {
	args := stub.GetArgs()
	strargs := make([]string, 0, len(args))
	for _, barg := range args {
		strargs = append(strargs, string(barg))
	}
	return strargs
}

func (stub *mockStub) GetFunctionAndParameters() (function string, params []string) {
	allargs := stub.GetStringArgs()
	if len(allargs) == 0 {
		return "", []string{}
	}
	return allargs[0], allargs[1:]
}

func (stub *mockStub) GetDecorations() map[string][]byte { return nil }
func (stub *mockStub) GetPrivateData(string, string) ([]byte, error) {
	return nil, errors.New("not implemented")
}
func (stub *mockStub) GetPrivateDataHash(string, string) ([]byte, error) {
	return nil, errors.New("not implemented")
}
func (stub *mockStub) PutPrivateData(string, string, []byte) error {
	return errors.New("not implemented")
}
func (stub *mockStub) DelPrivateData(string, string) error   { return errors.New("not implemented") }
func (stub *mockStub) PurgePrivateData(string, string) error { return errors.New("not implemented") }
func (stub *mockStub) GetPrivateDataByRange(string, string, string) (shim.StateQueryIteratorInterface, error) {
	return nil, errors.New("not implemented")
}
func (stub *mockStub) GetPrivateDataByPartialCompositeKey(string, string, []string) (shim.StateQueryIteratorInterface, error) {
	return nil, errors.New("not implemented")
}
func (stub *mockStub) GetPrivateDataQueryResult(string, string) (shim.StateQueryIteratorInterface, error) {
	return nil, errors.New("not implemented")
}

func (stub *mockStub) GetState(key string) ([]byte, error) {
	return stub.State[key], nil
}

func (stub *mockStub) PutState(key string, value []byte) error {
	if stub.TxID == "" {
		return errors.New("cannot PutState without a transaction")
	}
	if len(value) == 0 {
		return stub.DelState(key)
	}
	stub.State[key] = value
	return nil
}

func (stub *mockStub) DelState(key string) error {
	delete(stub.State, key)
	return nil
}

func (stub *mockStub) GetStateByRange(string, string) (shim.StateQueryIteratorInterface, error) {
	return nil, errors.New("not implemented")
}

func (stub *mockStub) GetQueryResult(string) (shim.StateQueryIteratorInterface, error) {
	return nil, errors.New("not implemented")
}

func (stub *mockStub) GetHistoryForKey(string) (shim.HistoryQueryIteratorInterface, error) {
	return nil, errors.New("not implemented")
}

func (stub *mockStub) GetStateByPartialCompositeKey(objectType string, attributes []string) (shim.StateQueryIteratorInterface, error) {
	prefix, err := stub.CreateCompositeKey(objectType, attributes)
	if err != nil {
		return nil, err
	}
	keys := make([]string, 0)
	for key := range stub.State {
		if strings.HasPrefix(key, prefix) {
			keys = append(keys, key)
		}
	}
	sort.Strings(keys)
	return &mockStateIterator{keys: keys, state: stub.State}, nil
}

func (stub *mockStub) CreateCompositeKey(objectType string, attributes []string) (string, error) {
	return shim.CreateCompositeKey(objectType, attributes)
}

func (stub *mockStub) SplitCompositeKey(compositeKey string) (string, []string, error) {
	componentIndex := 1
	components := []string{}
	for i := 1; i < len(compositeKey); i++ {
		if compositeKey[i] == mockMinUnicodeRuneValue {
			components = append(components, compositeKey[componentIndex:i])
			componentIndex = i + 1
		}
	}
	return components[0], components[1:], nil
}

func (stub *mockStub) GetStateByRangeWithPagination(string, string, int32, string) (shim.StateQueryIteratorInterface, *peer.QueryResponseMetadata, error) {
	return nil, nil, errors.New("not implemented")
}

func (stub *mockStub) GetStateByPartialCompositeKeyWithPagination(string, []string, int32, string) (shim.StateQueryIteratorInterface, *peer.QueryResponseMetadata, error) {
	return nil, nil, errors.New("not implemented")
}

func (stub *mockStub) GetQueryResultWithPagination(string, int32, string) (shim.StateQueryIteratorInterface, *peer.QueryResponseMetadata, error) {
	return nil, nil, errors.New("not implemented")
}

func (stub *mockStub) InvokeChaincode(string, [][]byte, string) *peer.Response { return nil }
func (stub *mockStub) GetCreator() ([]byte, error)                             { return nil, nil }
func (stub *mockStub) SetTransient(map[string][]byte) error                    { return errors.New("not implemented") }
func (stub *mockStub) GetTransient() (map[string][]byte, error) {
	return nil, errors.New("not implemented")
}
func (stub *mockStub) GetBinding() ([]byte, error) { return nil, errors.New("not implemented") }
func (stub *mockStub) GetSignedProposal() (*peer.SignedProposal, error) {
	return stub.signedProposal, nil
}
func (stub *mockStub) GetArgsSlice() ([]byte, error) { return nil, errors.New("not implemented") }

func (stub *mockStub) GetTxTimestamp() (*timestamppb.Timestamp, error) {
	if stub.TxTimestamp == nil {
		return nil, errors.New("timestamp not set")
	}
	return stub.TxTimestamp, nil
}

func (stub *mockStub) SetEvent(string, []byte) error { return nil }
func (stub *mockStub) SetStateValidationParameter(string, []byte) error {
	return errors.New("not implemented")
}
func (stub *mockStub) GetStateValidationParameter(string) ([]byte, error) {
	return nil, errors.New("not implemented")
}
func (stub *mockStub) SetPrivateDataValidationParameter(string, string, []byte) error {
	return errors.New("not implemented")
}
func (stub *mockStub) GetPrivateDataValidationParameter(string, string) ([]byte, error) {
	return nil, errors.New("not implemented")
}

type mockStateIterator struct {
	keys  []string
	index int
	state map[string][]byte
}

func (it *mockStateIterator) HasNext() bool {
	return it.index < len(it.keys)
}

func (it *mockStateIterator) Close() error {
	return nil
}

func (it *mockStateIterator) Next() (*queryresult.KV, error) {
	if !it.HasNext() {
		return nil, errors.New("no more items")
	}
	key := it.keys[it.index]
	it.index++
	return &queryresult.KV{Key: key, Value: it.state[key]}, nil
}

type mockClientIdentity struct {
	mspID      string
	attributes map[string]string
}

func (mockClientIdentity) GetID() (string, error)             { return "", nil }
func (identity mockClientIdentity) GetMSPID() (string, error) { return identity.mspID, nil }
func (identity mockClientIdentity) GetAttributeValue(name string) (string, bool, error) {
	value, ok := identity.attributes[name]
	return value, ok, nil
}
func (identity mockClientIdentity) AssertAttributeValue(name string, expected string) error {
	value, ok := identity.attributes[name]
	if !ok || value != expected {
		return errors.New("attribute mismatch")
	}
	return nil
}
func (mockClientIdentity) GetX509Certificate() (*x509.Certificate, error) { return nil, nil }
