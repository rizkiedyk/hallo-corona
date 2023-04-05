package articledto

import (
	"hallo-corona/models"
	"time"
)

type ArticleResponse struct {
	ID        int                 `json:"id" gorm:"primary_key:auto_increment"`
	Title     string              `json:"title" gorm:"type:varchar(255)"`
	Image     string              `json:"image" gorm:"type: varchar(255)"`
	User      models.UserResponse `json:"user" gorm:"foreignKey:UserID"`
	Desc      string              `json:"desc" gorm:"type:text" form:"desc"`
	Category  string              `json:"category" gorm:"type:varchar(255)" form:"category"`
	CreatedAt time.Time           `json:"createdAt"`
	UpdatedAt time.Time           `json:"updatedAt"`
}
