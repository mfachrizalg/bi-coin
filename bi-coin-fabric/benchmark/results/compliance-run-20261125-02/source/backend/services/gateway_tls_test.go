package services

import "testing"

func TestGatewayTLSServerName(t *testing.T) {
	for _, test := range []struct {
		gatewayPeer string
		want        string
	}{
		{gatewayPeer: "peer0.centralbank.bi-coin:7051", want: "peer0.centralbank.bi-coin"},
		{gatewayPeer: "peer0.centralbank.bi-coin", want: "peer0.centralbank.bi-coin"},
		{gatewayPeer: "", want: ""},
	} {
		if got := gatewayTLSServerName(test.gatewayPeer); got != test.want {
			t.Errorf("gatewayTLSServerName(%q) = %q, want %q", test.gatewayPeer, got, test.want)
		}
	}
}
