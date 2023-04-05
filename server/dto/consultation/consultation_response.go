package consultationdto

import (
	"hallo-corona/models"
	"time"
)

type ConsultationResponse struct {
	ID         int                 `json:"id"`
	Fullname   string              `gorm:"type: varchar(255)" json:"fullname"`
	Phone      string              `gorm:"type: varchar(255)" json:"phone"`
	BornDate   string              `json:"bornDate"`
	Age        int                 `json:"age,string,omitempty" gorm:"type: int"`
	Height     int                 `json:"height,string,omitempty" gorm:"type: int"`
	Weight     int                 `json:"weight,string,omitempty" gorm:"type: int"`
	Gender     string              `json:"gender" gorm:"type: varchar(255)"`
	Subject    string              `json:"subject" gorm:"type: varchar(255)"`
	LiveConsul string              `json:"liveConsul"`
	Desc       string              `json:"desc" gorm:"type:text" form:"desc"`
	User       models.UserResponse `json:"user" gorm:"foreignKey:UserID"`
	Status     string              `json:"status" gorm:"type: varchar(255)"`
	Reply      string              `json:"reply" gorm:"type:text" form:"reply" `
	LinkLive   string              `json:"linkLive" gorm:"type: varchar(255)"`
	// Reservation	bool					`json:"reservation"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}
