package main

import (
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/v2/contractapi"
)

func main() {
	chaincode, err := contractapi.NewChaincode(&PaymentsContract{})
	if err != nil {
		panic(fmt.Sprintf("create payments chaincode: %v", err))
	}
	if err := chaincode.Start(); err != nil {
		panic(fmt.Sprintf("start payments chaincode: %v", err))
	}
}
