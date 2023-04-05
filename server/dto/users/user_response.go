package usersdto

type UserResponse struct {
	ID       int    `json:"id"`
	Fullname string `gorm:"type: varchar(255)" json:"fullname"`
	Username string `gorm:"type: varchar(255)" json:"username"`
	Email    string `gorm:"type: varchar(255)" json:"email"`
	Password string `gorm:"type: varchar(255)" json:"password"`
	ListAs   string `gorm:"type: varchar(100)" json:"listAs"`
	Gender   string `gorm:"type: varchar(100)" json:"gender"`
	Phone    string `gorm:"type: varchar(100)" json:"phone"`
	Address  string `gorm:"type: text" json:"address"`
}

type ChangeImageResponse struct {
	Username string `json:"username"`
	Image    string `json:"image" gorm:"type : varchar(255)"`
	Message  string `json:"messege"`
}
