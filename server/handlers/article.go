package handlers

import (
	"context"
	"fmt"
	articledto "hallo-corona/dto/article"
	dto "hallo-corona/dto/result"
	"hallo-corona/models"
	"hallo-corona/repositories"
	"net/http"
	"os"
	"strconv"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerArticle struct {
	ArticleRepository repositories.ArticleRepository
}

func HandlerArticle(ArticleRepository repositories.ArticleRepository) *handlerArticle {
	return &handlerArticle{ArticleRepository}
}

func (h *handlerArticle) FindArticles(c echo.Context) error {
	articles, err := h.ArticleRepository.FindArticles()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: articles})
}

func (h *handlerArticle) GetArticel(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	products, err := h.ArticleRepository.GetArticle(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponseArticle(products)})
}

func (h *handlerArticle) CreateArticle(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	dataFile := c.Get("dataFile").(string)
	fmt.Println("this is data file", dataFile)

	request := articledto.CreateArticleRequest{
		Title:    c.FormValue("title"),
		UserID:   int(userId),
		Image:    dataFile,
		Desc:     c.FormValue("desc"),
		Category: c.FormValue("category"),
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	// Add your Cloudinary credentials ...
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	// Upload file to Cloudinary ...
	resp, err := cld.Upload.Upload(ctx, dataFile, uploader.UploadParams{Folder: "hallo corona"})

	if err != nil {
		fmt.Println(err.Error())
	}

	// submit to db article
	article := models.Article{
		Title:    request.Title,
		UserID:   int(userId),
		User:     models.UserResponse{},
		Image:    resp.SecureURL,
		Desc:     request.Desc,
		Category: request.Category,
	}

	data, err := h.ArticleRepository.CreateArticle(article)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Message: "Create article success", Data: data})

}

func (h *handlerArticle) UpdateArticle(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userRole := userLogin.(jwt.MapClaims)["listAs"].(string)
	if userRole == "doctor" {
		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
		}

		dataFile := c.Get("dataFile").(string)

		request := articledto.UpdateArticleRequest{
			Title: c.FormValue("title"),
			Image: dataFile,
			Desc:  c.FormValue("desc"),
		}

		validation := validator.New()
		err = validation.Struct(request)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		}

		var ctx = context.Background()
		var CLOUD_NAME = os.Getenv("CLOUD_NAME")
		var API_KEY = os.Getenv("API_KEY")
		var API_SECRET = os.Getenv("API_SECRET")

		// Add your Cloudinary credentials ...
		cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

		// Upload file to Cloudinary ...
		resp, err := cld.Upload.Upload(ctx, dataFile, uploader.UploadParams{Folder: "hallo corona"})

		if err != nil {
			fmt.Println(err.Error())
		}

		article, err := h.ArticleRepository.GetArticle(id)
		if err != nil {
			return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
		}

		if request.Title != "" {
			article.Title = request.Title
		}

		if request.Image != "" {
			article.Image = resp.SecureURL
		}

		if request.Desc != "" {
			article.Desc = request.Desc
		}

		articleUpdate, err := h.ArticleRepository.UpdateArticle(article)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		}
		return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: articleUpdate})
	}
	return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: "Access denied"})
}

func (h *handlerArticle) DeleteArticle(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: "Invalid article ID"})
	}

	article, err := h.ArticleRepository.GetArticle(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	articleDel, err := h.ArticleRepository.DeleteArticle(article)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Message: "Delete article success", Data: articleDel})
}

func (h *handlerArticle) FindMyArticle(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	articles, err := h.ArticleRepository.FindMyArticle(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Message: "Succes", Data: articles})
}

func convertResponseArticle(u models.Article) articledto.ArticleResponse {
	return articledto.ArticleResponse{
		ID:        u.ID,
		Title:     u.Title,
		Image:     u.Image,
		User:      u.User,
		Desc:      u.Desc,
		CreatedAt: u.CreatedAt,
		UpdatedAt: u.UpdatedAt,
		Category:  u.Category,
	}
}
