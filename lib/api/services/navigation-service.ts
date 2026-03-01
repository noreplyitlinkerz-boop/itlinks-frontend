import { BaseService } from "./base-service";
import { NavigationItem } from "../types/endpoints";
import { ApiResponse } from "../types/api-types";

class NavigationService extends BaseService {
  protected basePath = "/navigation";

  async getNavigation(params?: {
    admin?: boolean;
  }): Promise<ApiResponse<NavigationItem[]>> {
    return this.get<ApiResponse<NavigationItem[]>>("", params);
  }

  async createNavigation(
    data: Partial<NavigationItem>,
  ): Promise<ApiResponse<NavigationItem>> {
    return this.post<ApiResponse<NavigationItem>>("", data);
  }

  async updateNavigation(
    id: string,
    data: Partial<NavigationItem>,
  ): Promise<ApiResponse<NavigationItem>> {
    return this.patch<ApiResponse<NavigationItem>>(`/${id}`, data);
  }

  async deleteNavigation(id: string): Promise<ApiResponse<void>> {
    return this.delete<ApiResponse<void>>(`/${id}`);
  }
}

export const navigationService = new NavigationService();
