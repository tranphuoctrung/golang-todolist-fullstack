package routing

import (
	"net/http"
	. "golang-todolist-fullstack/backend/restapi/handlers"
	. "golang-todolist-fullstack/backend/restapi/logging"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type Routes []Route

var CorsSettings = cors.New(cors.Options{
	AllowedOrigins:   []string{"*"},
	AllowCredentials: true,
	AllowedMethods:   []string{"POST", "GET", "OPTIONS", "PUT", "DELETE"},
	AllowedHeaders:   []string{"Accept", "content-type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization"},
})

var routes = Routes{
	Route{
		"Index",
		"GET",
		"/",
		Index,
	},
	// swagger:route GET /api/todos/list todos listTodos
	//
	// Handler returning list of todos.
	//
	// Responses:
	// 	200: todoList
	Route{
		"TodoIndex",
		"GET",
		"/todos/list",
		TodoIndex,
	},

	// swagger:route GET /api/todos/getbyid/{todoId} todos getTodoById
	//
	// Handler returning information about todo.
	//
	// Information about todo
	//
	// Responses:
	// 	200: todoResp
	//  404: badReq

	Route{
		"GetTodoById",
		"GET",
		"/todos/getbyid/{todoId}",
		GetTodoById,
	},

	// swagger:route POST /api/todos/create todos todoCreate
	//
	// Handler creating a todo.
	//
	// Responses:
	// 	200: todoResp
	//  400: badReq
	Route{
		"TodoCreate",
		"POST",
		"/todos/create",
		TodoCreate,
	},

	// swagger:route DELETE /api/todos/delete/{todoId} todos todoDelete
	//
	// Handler deleting a todo.
	//
	// Responses:
	// 	200: ok
	//  404: badReq
	//  500: internal
	Route{
		"TodoDelete",
		"DELETE",
		"/todos/delete/{todoId}",
		TodoDelete,
	},

	// swagger:route PUT /api/todos/update/{todoId} todos todoUpdate
	//
	// Handler updating a todo.
	//
	// Responses:
	// 	200: ok
	//  404: badReq
	//  500: internal
	Route{
		"TodoUpdate",
		"PUT",
		"/todos/update/{todoId}",
		TodoUpdate,
	},
}

func RegisterTodoRoutes(r *mux.Router, p string) {
	var handler http.Handler
	routeIndex := routes[0]
	handler = routeIndex.HandlerFunc
	handler = Logger(handler, routeIndex.Name)
	r.Methods(routeIndex.Method).
		Path(routeIndex.Pattern).
		Name(routeIndex.Pattern).
		Handler(handler)
	dr := r.PathPrefix(p).Subrouter()
	for _, route := range routes {
		if route.Name != "Index" {
			handler = route.HandlerFunc
			handler = Logger(handler, route.Name)
			//handler = CorsSettings.Handler(handler)
			dr.Methods(route.Method).
				Path(route.Pattern).
				Name(route.Name).
				Handler(handler)
		}
	}
}
