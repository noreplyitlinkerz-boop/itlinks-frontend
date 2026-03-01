import { BaseService } from "./base-service";
import { PaginatedResponse, PaginationParams } from "../types/api-types";

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContactRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface GetContactsParams extends PaginationParams {
  search?: string;
}

export class ContactService extends BaseService {
  protected basePath = "/contact";

  /**
   * Submit a contact message
   */
  async submitContactMessage(
    data: CreateContactRequest,
  ): Promise<ContactMessage> {
    return this.post<ContactMessage>("", data);
  }

  /**
   * Get all contact messages (Admin only)
   */
  async getContacts(
    params?: GetContactsParams,
  ): Promise<PaginatedResponse<ContactMessage>> {
    const response = await this.get<any>("", params);

    // Handle nested structure: { success: true, data: { data: [], pagination: { ... } } }
    if (response.data && response.data.pagination) {
      return response.data;
    }

    return response as PaginatedResponse<ContactMessage>;
  }
}

export const contactService = new ContactService();
