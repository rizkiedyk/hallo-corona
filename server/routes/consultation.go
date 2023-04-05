package routes

import (
	"hallo-corona/handlers"
	"hallo-corona/pkg/middleware"
	"hallo-corona/pkg/mysql"
	"hallo-corona/repositories"

	"github.com/labstack/echo/v4"
)

func ConsultationRoutes(e *echo.Group) {
	consultationRepository := repositories.RepositoryConsultation(mysql.DB)
	h := handlers.HandlerConsultation(consultationRepository)

	e.GET("/consultations", middleware.Auth(h.FindConsultations))
	e.GET("/consultation/:id", middleware.Auth(h.GetConsultation))
	e.GET("/consultations/:id", middleware.Auth(h.FindMyConsultation))
	e.POST("/consultation", middleware.Auth(h.CreateConsultation))
	e.PATCH("/consultation/:id", middleware.Auth(h.UpdateConsultation))
	e.DELETE("/consultation/:id", middleware.Auth(h.DeleteConsultation))
}
