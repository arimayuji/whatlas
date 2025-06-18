resource "google_project_service" "cloud_run" {
  project = var.project_id
  service = "run.googleapis.com"
}

resource "google_cloud_run_service" "whatlas_api" {
  name     = "whatlas-api"
  location = var.region
  project  = var.project_id

  template {
    spec {
      service_account_name = "whatlas-infra-terraform@maximal-backup-463214-j1.iam.gserviceaccount.com"
      containers {
        image = "southamerica-east1-docker.pkg.dev/${var.project_id}/whatlas-repo/whatlas-api:${var.image_tag}"

        env {
          name = "GOOGLE_APPLICATION_CREDENTIALS_JSON"
          value_from {
            secret_key_ref {
               name = var.secret_id
               key  = "latest"
            }
          }
        }
        
        env {
          name="NODE_ENV"
          value="production"
        }

        resources {
          limits = {
            memory = "512Mi"  
            cpu    = "1"       
          }
        }
      }
    }

    metadata {
      annotations = {
        "autoscaling.knative.dev/minScale"  = "1"
        "run.googleapis.com/cpu-throttling" = "true"
      }
    }
  }

  metadata {
    annotations = {
      "run.googleapis.com/ingress"      = "all"
      "run.googleapis.com/launch-stage" = "GA"
      "run.googleapis.com/visibility"   = "external"
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [
    google_project_service.cloud_run
  ]
}
