package routes

import (
	"hallo-corona/handlers"
	"hallo-corona/pkg/middleware"
	"hallo-corona/pkg/mysql"
	"hallo-corona/repositories"

	"github.com/labstack/echo/v4"
)

func ArticleRoutes(e *echo.Group) {
	articleRepository := repositories.RepositoryArticle(mysql.DB)
	h := handlers.HandlerArticle(articleRepository)

	e.GET("/articles", h.FindArticles)
	e.GET("/article/:id", h.GetArticel)
	e.POST("/article", middleware.Auth(middleware.UploadFile(h.CreateArticle)))
	e.DELETE("/article/:id", middleware.Auth(h.DeleteArticle))
	// e.PATCH("/article/:id", middleware.Auth(middleware.UploadFile(h.UpdateArticle)))
	e.PATCH("/article/:id", middleware.Auth(middleware.UploadFile(h.UpdateArticle)))
	e.GET("/articles/:id", middleware.Auth(h.FindMyArticle))
}
