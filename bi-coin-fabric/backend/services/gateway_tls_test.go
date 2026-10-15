package services

import "testing"

func TestGatewayTLSServerName(t *testing.T) {
	for _, test := range []struct {
		gatewayPeer string
		want        string
	}{
		{gatewayPeer: "peer0.centralbank.rupiah.study:7051", want: "peer0.centralbank.rupiah.study"},
		{gatewayPeer: "peer0.centralbank.rupiah.study", want: "peer0.centralbank.rupiah.study"},
		{gatewayPeer: "", want: ""},
	} {
		if got := gatewayTLSServerName(test.gatewayPeer); got != test.want {
			t.Errorf("gatewayTLSServerName(%q) = %q, want %q", test.gatewayPeer, got, test.want)
		}
	}
}
