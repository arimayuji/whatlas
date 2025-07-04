import { GoogleApiController } from "../../presentation/controllers/google.controller";
import { makeRepositories } from "../repositories";

export function makeGoogleController() {
  const repositories = makeRepositories()
  
  return new  GoogleApiController(
    repositories.googleApi
  )
}