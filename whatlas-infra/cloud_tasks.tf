resource "google_project_service" "cloud_tasks" {
  service = "cloudtasks.googleapis.com"
  project = var.project_id
}

resource "google_cloud_tasks_queue" "user_alerts" {
  name     = "user-alerts"
  location = var.region

  rate_limits {
    max_dispatches_per_second = 5
  }

  retry_config {
    max_attempts = 3
  }
}
