package models

import "time"

type Article struct {
	ID        int          `json:"id"`
	Title     string       `json:"title" gorm:"type: varchar(255)"`
	UserID    int          `json:"user_id" form:"user_id"`
	User      UserResponse `json:"user"`
	Image     string       `json:"image" gorm:"type: varchar(255)"`
	Desc      string       `json:"desc" gorm:"type: text" form:"desc"`
	Category  string       `json:"category" gorm:"type: varchar(255)" form:"category"`
	CreatedAt time.Time    `json:"-"`
	UpdatedAt time.Time    `json:"-"`
}
