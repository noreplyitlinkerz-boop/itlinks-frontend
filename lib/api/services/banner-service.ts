import { BaseService } from "./base-service";
import { Banner } from "../types/endpoints";
import { ApiResponse } from "../types/api-types";

class BannerService extends BaseService {
  protected basePath = "/banners";

  async getBanners(): Promise<ApiResponse<Banner[]>> {
    return this.get<ApiResponse<Banner[]>>("");
  }
}

export const bannerService = new BannerService();
