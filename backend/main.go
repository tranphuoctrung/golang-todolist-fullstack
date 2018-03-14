package main

import (
	"log"
	"net/http"
	. "golang-todolist-fullstack/backend/restapi/routing"
	. "golang-todolist-fullstack/backend/swagger"

	"github.com/gorilla/mux"
)

// go-swagger examples.
//
// The purpose of this application is to provide some
// use cases describing how to generate docs for your API
//
//     Schemes: http, https
//     Host: localhost
//     BasePath: /
//     Version: 0.0.1
//     Title: 0.0.1
//
//     Consumes:
//     - application/json
//
//     Produces:
//     - application/json
//
// swagger:meta
func main() {
	router := NewRouter()
	var redocOpts RedocOpts
	redocOpts.EnsureDefaults()
	registerRoutes(router)
	redoc := Redoc(redocOpts, &CORSRouterDecorator{router})
	//handler := CorsSettings.Handler(redoc)
	log.Fatal(http.ListenAndServe(":8080", redoc))
}

func registerRoutes(r *mux.Router) {
	RegisterDocRoutes(r)
	RegisterTodoRoutes(r, "/api")
}
