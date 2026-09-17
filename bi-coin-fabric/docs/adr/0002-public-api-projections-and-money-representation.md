# Public API projections and money representation

Public REST APIs expose explicit, stable DTO projections rather than mirror ledger records. This adds a small mapping layer but decouples public clients from ledger schema changes. Rupiah amounts remain `int64` internally and are serialized as whole-rupiah decimal strings in JSON to prevent precision loss in JavaScript and other public clients.
