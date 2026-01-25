import { BaseService } from "./base-service";
import { Banner } from "../types/endpoints";
import { ApiResponse } from "../types/api-types";

class BannerService extends BaseService {
  protected basePath = "/banners";

  async getBanners(params?: {
    admin?: boolean;
  }): Promise<ApiResponse<Banner[]>> {
    return this.get<ApiResponse<Banner[]>>("", params);
  }

  async createBanner(data: FormData): Promise<ApiResponse<Banner>> {
    return this.post<ApiResponse<Banner>>("", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async updateBanner(id: string, data: FormData): Promise<ApiResponse<Banner>> {
    return this.patch<ApiResponse<Banner>>(`/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async deleteBanner(id: string): Promise<ApiResponse<void>> {
    return this.delete<ApiResponse<void>>(`/${id}`);
  }
}

export const bannerService = new BannerService();
