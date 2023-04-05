package models

import "time"

type Consultation struct {
	ID         int          `json:"id" gorm:"primary_key:auto_increment"`
	Fullname   string       `json:"fullname" gorm:"type: varchar(255)"`
	Phone      string       `json:"phone" gorm:"type: varchar(255)"`
	BornDate   string       `json:"bornDate" gorm:"type: varchar(255)"`
	Age        int          `json:"age,string,omitempty" gorm:"type: int"`
	Height     int          `json:"height,string,omitempty" gorm:"type: int"`
	Weight     int          `json:"weight,string,omitempty" gorm:"type: int"`
	Gender     string       `json:"gender" gorm:"type: varchar(255)"`
	Subject    string       `json:"subject" gorm:"type: varchar(255)"`
	LiveConsul string       `json:"liveConsul" gorm:"type: varchar(255)"`
	Desc       string       `json:"desc" gorm:"type:text" form:"desc"`
	UserID     int          `json:"user_id" form:"user_id" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	User       UserResponse `json:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Status     string       `json:"status" gorm:"type: varchar(255)"`
	Reply      string       `json:"reply" gorm:"type:text" form:"reply"`
	LinkLive   string       `json:"linkLive" gorm:"type: varchar(255)"`
	CreatedAt  time.Time    `json:"createdAt"`
	UpdatedAt  time.Time    `json:"updatedAt"`
}

type ConsultationResponse struct {
	ID         int          `json:"id" gorm:"primary_key:auto_increment"`
	Fullname   string       `json:"fullname" gorm:"type: varchar(255)"`
	Phone      string       `json:"phone" gorm:"type: varchar(255)"`
	BornDate   string       `json:"bornDate"`
	Age        int          `json:"age,string,omitempty" gorm:"type: int"`
	Height     int          `json:"height,string,omitempty" gorm:"type: int"`
	Weight     int          `json:"weight,string,omitempty" gorm:"type: int"`
	Gender     string       `json:"gender" gorm:"type: varchar(255)"`
	Subject    string       `json:"subject" gorm:"type: varchar(255)"`
	LiveConsul string       `json:"liveConsul"`
	Desc       string       `json:"desc" gorm:"type:text" form:"desc"`
	UserID     int          `json:"-"`
	User       UserResponse `json:"user" gorm:"foreignKey:UserID"`
	Status     string       `json:"status" gorm:"type: varchar(255)"`
	Reply      string       `json:"reply" gorm:"type:text" form:"reply"`
	LinkLive   string       `json:"linkLive" gorm:"type: varchar(255)"`
	CreatedAt  time.Time    `json:"createdAt"`
	UpdatedAt  time.Time    `json:"updatedAt"`
}

func (ConsultationResponse) TableName() string {
	return "users"
}
