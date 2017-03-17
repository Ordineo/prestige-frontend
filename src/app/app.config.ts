import {OpaqueToken} from "@angular/core";

export let APP_CONFIG = new OpaqueToken("app.config");

var serverUri = "http://localhost:8585";
var baseEndpoint = "/employee-service";

export interface IAppConfig {
  apiUsersEndpoint: string;
  apiPrestigesEndpoint: string;
  apiRolesEndpoint: string;
  apiPrestigeLikesEndpoint: string;
  apiCategoriesEndpoint: string;
  apiProfileEndpoint: string;
}
export const AppConfig: IAppConfig = {
  apiUsersEndpoint: serverUri + baseEndpoint + "/users",
  apiPrestigesEndpoint: serverUri + baseEndpoint + "/prestiges",
  apiRolesEndpoint: serverUri + baseEndpoint + "/roles",
  apiPrestigeLikesEndpoint: serverUri + baseEndpoint + "/prestigeLikes",
  apiCategoriesEndpoint: serverUri + baseEndpoint + "/categories",
  apiProfileEndpoint: serverUri + baseEndpoint + "/profiles"
};
