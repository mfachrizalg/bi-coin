package main

import (
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/v2/contractapi"
)

func main() {
	chaincode, err := contractapi.NewChaincode(&ControlsContract{})
	if err != nil {
		panic(fmt.Sprintf("create controls chaincode: %v", err))
	}
	if err := chaincode.Start(); err != nil {
		panic(fmt.Sprintf("start controls chaincode: %v", err))
	}
}
