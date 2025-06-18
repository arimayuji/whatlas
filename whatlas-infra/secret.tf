resource "google_project_service" "secret"{
  project = var.project_id
  service = "secretmanager.googleapis.com"
}

resource "google_secret_manager_secret" "google_app_credentials" {
  secret_id = "google-app-credentials_json"

  replication {
    auto {}
  }
}

resource "google_secret_manager_secret_version" "google_app_credentials_version" {
  secret      = google_secret_manager_secret.google_app_credentials.id
  secret_data = file("../service-account-key.json")
}
