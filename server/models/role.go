package models

type Role struct {
	ID       int    `json:"id"`
	Fullname string `json:"fullname" gorm:"type: varchar(255)"`
}
