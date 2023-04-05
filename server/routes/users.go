package routes

import (
	"hallo-corona/handlers"
	"hallo-corona/pkg/middleware"
	"hallo-corona/pkg/mysql"
	"hallo-corona/repositories"

	"github.com/labstack/echo/v4"
)

func UserRoutes(e *echo.Group) {
	userRepository := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlerUser(userRepository)

	e.GET("/users", h.FindUsers)
	e.GET("/user/:id", h.GetUser)
	e.PATCH("/user", middleware.Auth(h.UpdateUser))
	e.DELETE("/user", middleware.Auth(h.DeleteUser))
	e.PATCH("/change-image/{id}", middleware.UploadFile(h.ChangeImage))
}
