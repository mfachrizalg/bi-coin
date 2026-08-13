package main

import (
	"context"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/config"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/handlers"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/middleware"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/services"
	"github.com/rs/cors"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("no .env file, using environment variables")
	}
	cfg := config.Load()
	if err := cfg.Validate(); err != nil {
		log.Fatalf("config: %v", err)
	}
	ctx := context.Background()

	store, err := services.NewPostgresStore(ctx, cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("postgres store: %v", err)
	}
	defer store.Close()
	if err := store.EnsureBootstrapUsers(ctx, cfg.AuthBootstrapUsersJSON); err != nil {
		log.Fatalf("bootstrap auth users: %v", err)
	}
	authSvc := services.NewAuthService(store, cfg.AuthJWTSecret, cfg.AuthTokenTTL)

	svc, err := services.NewLedgerService(cfg)
	if err != nil {
		log.Fatalf("ledger service: %v", err)
	}
	defer svc.Close()
	svc.SetKycStore(store)

	server := newHTTPServer(cfg, authSvc, svc)
	log.Printf("Garuda Digital Rupiah API Gateway starting on :%s", cfg.Port)
	if err := server.ListenAndServe(); err != nil {
		log.Fatalf("server: %v", err)
	}
}

func newHTTPServer(cfg *config.Config, authSvc *services.AuthService, svc *services.LedgerService) *http.Server {
	h := handlers.New(svc, authSvc)

	r := mux.NewRouter()
	r.Use(middleware.AuthMiddleware(authSvc))
	r.Use(limitRequestBody(cfg.MaxBodyBytes))

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

	topologyRoute := r.NewRoute().Subrouter()
	topologyRoute.Use(middleware.RequireRole(
		middleware.RolePublic, middleware.RoleAuthenticated, middleware.RoleKycVerified,
		middleware.RoleBankPjp, middleware.RoleBankIndonesia, middleware.RoleMerchant, middleware.RoleSupervisor,
	))
	topologyRoute.HandleFunc("/network/topology", handlers.TopologyHandler).Methods("GET")

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173", "http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization", "Idempotency-Key"},
		AllowCredentials: true,
	})

	return &http.Server{
		Addr:              ":" + cfg.Port,
		Handler:           c.Handler(r),
		ReadTimeout:       cfg.ReadTimeout,
		ReadHeaderTimeout: cfg.ReadHeaderTimeout,
		WriteTimeout:      cfg.WriteTimeout,
		IdleTimeout:       cfg.IdleTimeout,
	}
}

func limitRequestBody(maxBytes int64) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if maxBytes > 0 && r.Body != nil {
				r.Body = http.MaxBytesReader(w, r.Body, maxBytes)
			}
			next.ServeHTTP(w, r)
		})
	}
}
