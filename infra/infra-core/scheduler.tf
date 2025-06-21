resource "google_service_account" "scheduler_sa" {
  account_id   = var.cloud_run_service_account_email
  display_name = "Scheduler Pub/Sub Publisher"
}

resource "google_cloud_scheduler_job" "train_status_job" {
  name        = "train-status-job"
  description = "Publica no tópico de status dos trens a cada 15 min v2"
  schedule    = "*/15 * * * *"
  time_zone   = var.timezone

  pubsub_target {
    topic_name = google_pubsub_topic.train_status.id
    data       = base64encode("{}")
    attributes = {
      event = "train-status-trigger"
    }
  }

  attempt_deadline = "320s"
  region           = var.region

}
