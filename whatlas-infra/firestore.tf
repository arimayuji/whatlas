resource "google_project_service" "firestore" {
  project = var.project_id
  service = "firestore.googleapis.com"
}

resource "google_firestore_database" "default" {
  name           = "whatlas-db"
  project        = var.project_id
  location_id    = var.firestore_location 
  type           = "FIRESTORE_NATIVE"             
  concurrency_mode = "OPTIMISTIC"       

  depends_on = [google_project_service.firestore]
}
