terraform {
  required_version = "1.12.2"

  backend "gcs" {
    bucket = "whatlas-terraform-state"
    prefix = "infra-app/terraform.tfstate"
  }

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "6.8.0"
    }
  }
}

provider "google" {
  project     = var.project_id
  region      = var.region
}