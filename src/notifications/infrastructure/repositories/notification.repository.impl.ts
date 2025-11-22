import type { INotificationRepository } from "../../domain/repositories/notification.repository";
import type { Notification } from "../../domain/entities/notification.entity";
import type { NotificationAPIResponse } from "../dto/notification-api.response";
import { NotificationMapper } from "../mappers/notification.mapper";
import { httpClient } from "@/shared/api";

export class NotificationRepositoryImpl implements INotificationRepository {
    
    async getAll(): Promise<Notification[]> {
        const response = await httpClient.get<NotificationAPIResponse[]>('/notifications');
        return NotificationMapper.fromApiResponseArray(response.data);
    }

    async getUnread(): Promise<Notification[]> {
        const response = await httpClient.get<NotificationAPIResponse[]>('/notifications/unread');
        return NotificationMapper.fromApiResponseArray(response.data);
    }

    async getUnreadCount(): Promise<number> {
        const response = await httpClient.get<{ count: number }>('/notifications/unread/count');
        return response.data.count;
    }

    async getById(id: string): Promise<Notification> {
        const response = await httpClient.get<NotificationAPIResponse>(`/notifications/${id}`);
        return NotificationMapper.fromApiResponse(response.data);
    }

    async markAsRead(id: string): Promise<Notification> {
        const response = await httpClient.patch<NotificationAPIResponse>(`/notifications/${id}/read`, {});
        return NotificationMapper.fromApiResponse(response.data);
    }

    async markAllAsRead(): Promise<void> {
        await httpClient.post('/notifications/read-all', {});
    }

    async delete(id: string): Promise<void> {
        await httpClient.delete(`/notifications/${id}`);
    }
}
