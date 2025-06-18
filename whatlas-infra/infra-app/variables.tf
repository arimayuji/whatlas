variable "project_id" {
  description = "GCP Project ID"
  type        = string
}

variable "region" {
  description = "GCP Region"
  type        = string
  default     = "southamerica-east1"
}

variable "scheduler_region" {
  description = "GCP Scheduler Region"
  type        = string
  default     = "us-central1"
}

variable "firestore_location" {
  type        = string
  default     = "southamerica-east1" 
  description = "Localização regional do banco Firestore"
}

variable "cloud_run_service_account_email" {
  description = "Service account usada pelo Cloud Run para acessar o Secret Manager"
  type        = string
}

variable "gcp_sa_key_json" {
  description = "Conteúdo do JSON da service account"
  type        = string
}

variable "image_tag" {
  description = "Tag da imagem Docker"
  type        = string
  default     = "latest"
}

variable "secret_id" {
  description = "ID do Secret Manager"
  type        = string
}