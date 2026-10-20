package main

import (
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/v2/contractapi"
)

func main() {
	chaincode, err := contractapi.NewChaincode(&MonetaryContract{})
	if err != nil {
		panic(fmt.Sprintf("create monetary chaincode: %v", err))
	}
	if err := chaincode.Start(); err != nil {
		panic(fmt.Sprintf("start monetary chaincode: %v", err))
	}
}
