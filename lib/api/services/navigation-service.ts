import { BaseService } from "./base-service";
import { NavigationItem } from "../types/endpoints";
import { ApiResponse } from "../types/api-types";

class NavigationService extends BaseService {
  protected basePath = "/navigation";

  async getNavigation(): Promise<ApiResponse<NavigationItem[]>> {
    return this.get<ApiResponse<NavigationItem[]>>("");
  }
}

export const navigationService = new NavigationService();
