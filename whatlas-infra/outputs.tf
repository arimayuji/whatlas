output "cloud_run_url" {
  description = "URL pública da API Whatlas no Cloud Run"
  value       = google_cloud_run_service.whatlas_api.status[0].url
}
