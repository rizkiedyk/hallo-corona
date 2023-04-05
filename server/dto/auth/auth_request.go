package authdto

type RegisterRequest struct {
	// Role     string `json:"role"`
	Fullname string `gorm:"type: varchar(255)" json:"fullname" validate:"required"`
	Username string `gorm:"type: varchar(255)" json:"username" validate:"required"`
	Email    string `gorm:"type: varchar(255)" json:"email" validate:"required"`
	Password string `gorm:"type: varchar(255)" json:"password" validate:"required"`
	ListAs   string `gorm:"type: varchar(100)" json:"listAs" validate:"required"`
	Gender   string `gorm:"type: varchar(100)" json:"gender" validate:"required"`
	Phone    string `gorm:"type: varchar(100)" json:"phone" validate:"required"`
	Address  string `gorm:"type: text" json:"address" validate:"required"`
}

type LoginRequest struct {
	Username string `gorm:"type: varchar(255)" json:"username" validate:"required"`
	Password string `gorm:"type: varchar(255)" json:"password" validate:"required"`
}
