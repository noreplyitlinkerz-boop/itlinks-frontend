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
    data: CreateContactRequest
  ): Promise<ContactMessage> {
    return this.post<ContactMessage>("", data);
  }

  /**
   * Get all contact messages (Admin only)
   */
  async getContacts(
    params?: GetContactsParams
  ): Promise<PaginatedResponse<ContactMessage>> {
    return this.get<PaginatedResponse<ContactMessage>>("", params);
  }
}

export const contactService = new ContactService();
