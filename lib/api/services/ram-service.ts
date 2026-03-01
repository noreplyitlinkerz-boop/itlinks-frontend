import { BaseService } from "./base-service";
import { Ram, CreateRamRequest } from "../types/endpoints";
import { ApiResponse } from "../types/api-types";

class RamService extends BaseService {
  protected basePath = "/products/ram";

  async getRams(): Promise<ApiResponse<Ram[]>> {
    const data = await this.get<Ram[] | ApiResponse<Ram[]>>("");
    // Handle both raw array and ApiResponse wrapper if backend changes
    if (Array.isArray(data)) {
      return { data, success: true };
    }
    return data as ApiResponse<Ram[]>;
  }

  async createRam(data: CreateRamRequest): Promise<ApiResponse<Ram>> {
    return this.post<ApiResponse<Ram>>("", data);
  }

  async updateRam(
    id: string,
    data: Partial<CreateRamRequest>,
  ): Promise<ApiResponse<Ram>> {
    return this.put<ApiResponse<Ram>>(`/${id}`, data);
  }

  async deleteRam(id: string): Promise<ApiResponse<void>> {
    return this.delete<ApiResponse<void>>(`/${id}`);
  }
}

export const ramService = new RamService();
