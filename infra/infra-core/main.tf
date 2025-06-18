resource "google_project_service" "scheduler"{
  project = var.project_id
  service = "cloudscheduler.googleapis.com"
}

resource "google_project_service" "logging"{
  project = var.project_id
  service = "logging.googleapis.com"
}