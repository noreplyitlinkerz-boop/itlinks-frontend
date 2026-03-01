import { BaseService } from "./base-service";
import { Brand } from "../types/endpoints";
import { ApiResponse } from "../types/api-types";

class BrandService extends BaseService {
  protected basePath = "/brands";

  async getBrands(): Promise<ApiResponse<Brand[]>> {
    return this.get<ApiResponse<Brand[]>>("");
  }

  async createBrand(data: { name: string }): Promise<ApiResponse<Brand>> {
    return this.post<ApiResponse<Brand>>("", data);
  }

  async updateBrand(
    id: string,
    data: { name: string },
  ): Promise<ApiResponse<Brand>> {
    return this.patch<ApiResponse<Brand>>(`/${id}`, data);
  }

  async deleteBrand(id: string): Promise<ApiResponse<void>> {
    return this.delete<ApiResponse<void>>(`/${id}`);
  }
}

export const brandService = new BrandService();
