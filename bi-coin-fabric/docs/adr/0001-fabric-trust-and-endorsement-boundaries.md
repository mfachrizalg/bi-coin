# Fabric trust and endorsement boundaries

Hyperledger Fabric provides defense in depth: network endorsement policy limits who can endorse, while chaincode independently authorizes every protected operation. OJK is read-only and excluded from endorsement; Bank Indonesia retains issuance authority, and its endorsement is required for monetary operations: the `rupiah-monetary` policy `AND('CentralBankMSP.peer','DistributorMSP.peer')` enforces it. Issuance can credit only a Distributor reserve.
