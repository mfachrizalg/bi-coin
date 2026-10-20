package main

import (
	"math"
	"testing"

	"github.com/hyperledger/fabric-chaincode-go/v2/pkg/cid"
	"github.com/hyperledger/fabric-contract-api-go/v2/contractapi"
)

func TestCheckedAddRejectsOverflow(t *testing.T) {
	if _, err := checkedAdd(math.MaxInt64, 1); err == nil {
		t.Fatal("checkedAdd must reject overflow")
	}
}

func TestCheckedSubRejectsInsufficientBalance(t *testing.T) {
	if _, err := checkedSub(3, 4); err == nil {
		t.Fatal("checkedSub must reject insufficient balance")
	}
}

type fakeIdentity struct {
	cid.ClientIdentity
	attributes map[string]string
}

func (f fakeIdentity) GetAttributeValue(name string) (string, bool, error) {
	value, found := f.attributes[name]
	return value, found, nil
}

type fakeContext struct {
	contractapi.TransactionContextInterface
	identity cid.ClientIdentity
}

func (f fakeContext) GetClientIdentity() cid.ClientIdentity {
	return f.identity
}

func TestRequireDistributorMatchesAttribute(t *testing.T) {
	ctx := fakeContext{identity: fakeIdentity{attributes: map[string]string{"distributor_id": "retail-bank"}}}
	if err := requireDistributor(ctx, "retail-bank"); err != nil {
		t.Fatalf("own distributor rejected: %v", err)
	}
	if err := requireDistributor(ctx, "wholesale-bank"); err == nil {
		t.Fatal("another distributor's float must be rejected")
	}
	if err := requireDistributor(fakeContext{identity: fakeIdentity{}}, "retail-bank"); err == nil {
		t.Fatal("identity without distributor_id must be rejected")
	}
}
