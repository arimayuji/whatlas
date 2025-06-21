resource "google_project_service" "pubsub" {
  service = "pubsub.googleapis.com"
  disable_on_destroy = false
}

resource "google_pubsub_topic" "train_status" {
  name = "train-status-topic"
  depends_on = [ google_project_service.pubsub ]
}
