package handlers

import (
	// "fmt"
	authdto "hallo-corona/dto/auth"
	dto "hallo-corona/dto/result"
	"hallo-corona/models"
	"hallo-corona/pkg/bcrypt"
	jwtToken "hallo-corona/pkg/jwt"
	"hallo-corona/repositories"
	"log"
	"net/http"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerAuth struct {
	AuthRepository repositories.AuthRepository
}

func HandlerAuth(AuthRepository repositories.AuthRepository) *handlerAuth {
	return &handlerAuth{AuthRepository}
}

func (h *handlerAuth) Register(c echo.Context) error {
	request := new(authdto.RegisterRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	password, err := bcrypt.HashingPassword(request.Password)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	user := models.User{
		Fullname: request.Fullname,
		Username: request.Username,
		Email:    request.Email,
		Password: password,
		// Role:     "",
		ListAs:  request.ListAs,
		Gender:  request.Gender,
		Phone:   request.Phone,
		Address: request.Address,
	}

	data, err := h.AuthRepository.Register(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Message: "Your registration is success", Data: data})
}

func (h *handlerAuth) Login(c echo.Context) error {
	request := new(authdto.LoginRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data := models.User{
		Username: request.Username,
		Password: request.Password,
	}

	userLogin, err := h.AuthRepository.Login(data.Username)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: "username not registered"})
	}

	isValid := bcrypt.CheckPasswordHash(request.Password, userLogin.Password)
	if !isValid {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: "Incorrect email or password"})
	}

	claims := jwt.MapClaims{}
	claims["id"] = userLogin.ID
	claims["listAs"] = userLogin.ListAs
	// claims["role"] = userLogin.Role
	claims["exp"] = time.Now().Add(time.Hour * 4).Unix() // 4 hours expired

	token, generateTokenErr := jwtToken.GenerateToken(&claims)
	if generateTokenErr != nil {
		log.Println(generateTokenErr)
		return echo.NewHTTPError(http.StatusUnauthorized)
	}

	loginResponse := authdto.LoginResponse{
		ID:       userLogin.ID,
		Fullname: userLogin.Fullname,
		Username: userLogin.Username,
		Email:    userLogin.Email,
		ListAs:   userLogin.ListAs,
		// Role:     userLogin.Role,
		Gender:  userLogin.Gender,
		Phone:   userLogin.Phone,
		Address: userLogin.Address,
		Token:   token,
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: loginResponse})
}

func (h *handlerAuth) CheckAuth(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	user, _ := h.AuthRepository.CheckAuth(int(userId))

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: responseCheckAuth(user)})
}

// type resp struct {
// 	ID       uint
// 	FullName string
// 	Username string
// 	Email    string
// 	ListAs   string
// 	// Role    string
// 	Gender  string
// 	Phone   string
// 	Address string
// 	Image   string
// }

func responseCheckAuth(u models.User) authdto.CheckAuthResponse {
	return authdto.CheckAuthResponse{
		ID:       u.ID,
		Fullname: u.Fullname,
		Username: u.Username,
		Email:    u.Email,
		ListAs:   u.ListAs,
		// Role:    u.Role,
		Gender:  u.Gender,
		Phone:   u.Phone,
		Address: u.Address,
		// Image:   u.Image,
	}
}
