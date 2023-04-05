package articledto

type CreateArticleRequest struct {
	Title    string `json:"title" gorm:"type: varchar(255)" validate:"required"`
	UserID   int    `json:"user_id" form:"user_id"`
	Image    string `json:"image" gorm:"type: varchar(255)"`
	Desc     string `json:"desc" gorm:"type:text" form:"desc" validate:"required"`
	Category string `json:"category" gorm:"type:varchar(255)" form:"category"`
}

type UpdateArticleRequest struct {
	Title string `json:"title" form:"title"`
	Image string `json:"image" form:"image"`
	Desc  string `json:"desc" form:"desc"`
}
