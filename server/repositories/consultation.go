package repositories

import (
	"hallo-corona/models"

	"gorm.io/gorm"
)

type ConsultationRepository interface {
	FindConsultations() ([]models.Consultation, error)
	GetConsultation(ID int) (models.Consultation, error)
	FindMyConsultation(ID int) ([]models.Consultation, error)
	CreateConsultation(consultation models.Consultation) (models.Consultation, error)
	UpdateConsultation(consultation models.Consultation) (models.Consultation, error)
	DeleteConsultation(consultation models.Consultation) (models.Consultation, error)
}

func RepositoryConsultation(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindConsultations() ([]models.Consultation, error) {
	var consultations []models.Consultation
	err := r.db.Preload("User").Find(&consultations).Error

	return consultations, err
}

func (r *repository) GetConsultation(ID int) (models.Consultation, error) {
	var consultation models.Consultation
	err := r.db.Preload("User").First(&consultation, ID).Error

	return consultation, err
}

func (r *repository) FindMyConsultation(ID int) ([]models.Consultation, error) {
	var consultation []models.Consultation
	err := r.db.Where("user_id = ?", ID).Preload("User").Find(&consultation).Error

	return consultation, err
}

func (r *repository) CreateConsultation(consultation models.Consultation) (models.Consultation, error) {
	err := r.db.Preload("User").Create(&consultation).Error

	return consultation, err
}

func (r *repository) UpdateConsultation(consultation models.Consultation) (models.Consultation, error) {
	err := r.db.Preload("User").Save(&consultation).Error

	return consultation, err
}

func (r *repository) DeleteConsultation(consultation models.Consultation) (models.Consultation, error) {
	err := r.db.Preload("User").Delete(&consultation).Error

	return consultation, err
}
