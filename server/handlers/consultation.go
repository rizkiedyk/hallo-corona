package handlers

import (
	consultationdto "hallo-corona/dto/consultation"
	dto "hallo-corona/dto/result"
	"hallo-corona/models"
	"hallo-corona/repositories"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"

	// "github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerConsultation struct {
	ConsultationRepository repositories.ConsultationRepository
}

func HandlerConsultation(ConsultationRepository repositories.ConsultationRepository) *handlerConsultation {
	return &handlerConsultation{ConsultationRepository}
}

func (h *handlerConsultation) FindConsultations(c echo.Context) error {
	consultations, err := h.ConsultationRepository.FindConsultations()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Message: "Find consultation success", Data: consultations})
}

func (h *handlerConsultation) GetConsultation(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	consult, err := h.ConsultationRepository.GetConsultation(int(id))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: consult})
}

func (h *handlerConsultation) CreateConsultation(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	var request consultationdto.CreateConsultationRequest
	err := c.Bind(&request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	validation := validator.New()
	err = validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	consultation := models.Consultation{
		Fullname:   request.Fullname,
		Phone:      request.Phone,
		BornDate:   request.BornDate,
		Age:        request.Age,
		Height:     request.Height,
		Weight:     request.Weight,
		Gender:     request.Gender,
		Subject:    request.Subject,
		LiveConsul: request.LiveConsul,
		Desc:       request.Desc,
		UserID:     int(userId),
		User:       models.UserResponse{},
		Status:     "pending",
	}

	data, err := h.ConsultationRepository.CreateConsultation(consultation)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Message: "Create consultation success", Data: data})
}

func (h *handlerConsultation) DeleteConsultation(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	consultation, err := h.ConsultationRepository.GetConsultation(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.ConsultationRepository.DeleteConsultation(consultation)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Message: "Delete consultation success", Data: convertResponseConsultation(data)})

}

func (h *handlerConsultation) UpdateConsultation(c echo.Context) error {
	request := new(consultationdto.UpdateConsultationRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	id, _ := strconv.Atoi(c.Param("id"))
	consultation, err := h.ConsultationRepository.GetConsultation(int(id))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	if request.Fullname != "" {
		consultation.Fullname = request.Fullname
	}

	if request.Phone != "" {
		consultation.Phone = request.Phone
	}

	if request.BornDate != "" {
		consultation.BornDate = request.BornDate
	}

	if request.Age != 0 {
		consultation.Age = request.Age
	}

	if request.Height != 0 {
		consultation.Height = request.Height
	}

	if request.Weight != 0 {
		consultation.Weight = request.Weight
	}

	if request.Gender != "" {
		consultation.Gender = request.Gender
	}

	if request.Subject != "" {
		consultation.Subject = request.Subject
	}

	if request.LiveConsul != "" {
		consultation.LiveConsul = request.LiveConsul
	}

	if request.Desc != "" {
		consultation.Desc = request.Desc
	}

	if request.Reply != "" {
		consultation.Reply = request.Reply
	}

	if request.Reply != "" {
		consultation.Status = "waiting"
	}

	if request.LinkLive != "" {
		consultation.LinkLive = request.LinkLive
	}

	data, err := h.ConsultationRepository.UpdateConsultation(consultation)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}

func (h *handlerConsultation) FindMyConsultation(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	consult, err := h.ConsultationRepository.FindMyConsultation(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: consult})
}

func convertResponseConsultation(u models.Consultation) consultationdto.ConsultationResponse {
	return consultationdto.ConsultationResponse{
		ID:         u.ID,
		Fullname:   u.Fullname,
		Phone:      u.Phone,
		Age:        u.Age,
		Height:     u.Height,
		Weight:     u.Weight,
		Gender:     u.Gender,
		LiveConsul: u.LiveConsul,
		Desc:       u.Desc,
		User:       u.User,
		Subject:    u.Subject,
		Status:     u.Status,
		Reply:      u.Reply,
		LinkLive:   u.LinkLive,
		// Reservation: u.Reservation,
		CreatedAt: u.CreatedAt,
		UpdatedAt: u.UpdatedAt,
	}
}
