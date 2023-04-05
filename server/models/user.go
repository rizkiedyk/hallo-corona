package models

import "time"

type User struct {
	ID       int    `json:"id"`
	Fullname string `json:"fullname" gorm:"type: varchar(255)"`
	Username string `json:"username" gorm:"type: varchar(255)"`
	Email    string `json:"email" gorm:"type: varchar(255)"`
	Password string `json:"password" gorm:"type: varchar(255)"`
	ListAs   string `json:"listAs" gorm:"type: varchar(255)"`
	// Role      string    `json:"role"`
	Gender    string    `json:"gender" gorm:"type: varchar(255)"`
	Phone     string    `json:"phone" gorm:"type: varchar(255)"`
	Address   string    `json:"address" gorm:"type: varchar(255)"`
	Image     string    `json:"image" gorm:"type: varchar(225)"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}

type UserResponse struct {
	ID int `json:"id"`
	// Role     string `json:"role"`
	Fullname string `json:"fullname"`
	Username string `json:"username"`
	Email    string `json:"email"`
	ListAs   string `json:"listAs"`
}

func (UserResponse) TableName() string {
	return "users"
}
