import { BaseService } from "./base-service";
import { Brand } from "../types/endpoints";
import { ApiResponse } from "../types/api-types";

class BrandService extends BaseService {
  protected basePath = "/brands";

  async getBrands(): Promise<ApiResponse<Brand[]>> {
    return this.get<ApiResponse<Brand[]>>("");
  }
}

export const brandService = new BrandService();
