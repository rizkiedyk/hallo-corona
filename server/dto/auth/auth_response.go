package authdto

type LoginResponse struct {
	ID       int    `json:"id"`
	Fullname string `gorm:"type: varchar(255)" json:"fullname"`
	Username string `gorm:"type: varchar(255)" json:"username"`
	Email    string `gorm:"type: varchar(255)" json:"email"`
	Password string `gorm:"type: varchar(255)" json:"password"`
	// Role     string `json:"role"`
	ListAs  string `gorm:"type: varchar(255)" json:"listAs"`
	Gender  string `gorm:"type: varchar(255)" json:"gender"`
	Phone   string `gorm:"type: varchar(255)" json:"phone"`
	Address string `gorm:"type: varchar(255)" json:"address"`
	Token   string `gorm:"type: varchar(255)" json:"token"`
}

type RegisterResponse struct {
	Fullname string `gorm:"type: varchar(255)" json:"fullname"`
	Username string `gorm:"type: varchar(255)" json:"username"`
	Email    string `gorm:"type: varchar(255)" json:"email"`
	Password string `gorm:"type: varchar(255)" json:"password"`
	ListAs   string `gorm:"type: varchar(255)" json:"listAs"`
	Gender   string `gorm:"type: varchar(255)" json:"gender"`
	Phone    string `gorm:"type: varchar(255)" json:"phone"`
	Address  string `gorm:"type: varchar(255)" json:"address"`
}

type CheckAuthResponse struct {
	ID       int    `json:"id"`
	Fullname string `gorm:"type: varchar(255)" json:"fullname"`
	Username string `gorm:"type: varchar(255)" json:"username"`
	Email    string `gorm:"type: varchar(255)" json:"email"`
	Password string `gorm:"type: varchar(255)" json:"password"`
	ListAs   string `gorm:"type: varchar(255)" json:"listAs"`
	Gender   string `gorm:"type: varchar(255)" json:"gender"`
	Phone    string `gorm:"type: varchar(255)" json:"phone"`
	Address  string `gorm:"type: varchar(255)" json:"address"`
}
