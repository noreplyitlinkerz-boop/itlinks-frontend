import { BaseService } from "./base-service";
import { Storage, CreateStorageRequest } from "../types/endpoints";
import { ApiResponse } from "../types/api-types";

class StorageService extends BaseService {
  protected basePath = "/products/storage";

  async getStorages(): Promise<ApiResponse<Storage[]>> {
    const data = await this.get<Storage[] | ApiResponse<Storage[]>>("");
    if (Array.isArray(data)) {
      return { data, success: true };
    }
    return data as ApiResponse<Storage[]>;
  }

  async createStorage(
    data: CreateStorageRequest,
  ): Promise<ApiResponse<Storage>> {
    return this.post<ApiResponse<Storage>>("", data);
  }

  async updateStorage(
    id: string,
    data: Partial<CreateStorageRequest>,
  ): Promise<ApiResponse<Storage>> {
    return this.put<ApiResponse<Storage>>(`/${id}`, data);
  }

  async deleteStorage(id: string): Promise<ApiResponse<void>> {
    return this.delete<ApiResponse<void>>(`/${id}`);
  }
}

export const storageService = new StorageService();
