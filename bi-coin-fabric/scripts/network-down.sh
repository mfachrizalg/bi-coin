#!/bin/bash
set -euo pipefail

FABRIC_SAMPLES="${FABRIC_SAMPLES:-$HOME/fabric-samples}"
"$FABRIC_SAMPLES/test-network/network.sh" down
echo "Fabric network stopped."
