package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/config"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/handlers"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/middleware"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/services"
	"github.com/rs/cors"
)

func main() {
	cfg := config.Load()

	svc, err := services.NewLedgerService(cfg)
	if err != nil {
		log.Fatalf("ledger service: %v", err)
	}

	h := handlers.New(svc)

	r := mux.NewRouter()

	auth := middleware.AuthMiddleware(cfg)
	r.Use(auth)

	h.RegisterRoutes(r)

	docs := handlers.NewDocsHandler(handlers.DocsSpecs{
		Public:        specPublic,
		Authenticated: specAuthenticated,
		KycVerified:   specKycVerified,
		BankPjp:       specBankPjp,
		BankIndonesia: specBankIndonesia,
		Merchant:      specMerchant,
		Supervisor:    specSupervisor,
	})
	docs.RegisterRoutes(r)

	topology := handlers.TopologyHandler
	topologyRoute := r.NewRoute().Subrouter()
	topologyRoute.Use(middleware.RequireRole(
		middleware.RolePublic, middleware.RoleAuthenticated, middleware.RoleKycVerified,
		middleware.RoleBankIndonesia, middleware.RoleSupervisor,
	))
	topologyRoute.HandleFunc("/network/topology", topology).Methods("GET")

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173", "http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization", "X-API-Key"},
		AllowCredentials: true,
	})

	log.Printf("Garuda Digital Rupiah API Gateway starting on :%s", cfg.Port)
	if err := http.ListenAndServe(":"+cfg.Port, c.Handler(r)); err != nil {
		log.Fatalf("server: %v", err)
	}
}
