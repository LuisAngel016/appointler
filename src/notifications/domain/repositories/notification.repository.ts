import type { Notification } from "../entities/notification.entity";

export abstract class INotificationRepository {
    abstract getAll(): Promise<Notification[]>;
    abstract getUnread(): Promise<Notification[]>;
    abstract getUnreadCount(): Promise<number>;
    abstract getById(id: string): Promise<Notification>;
    abstract markAsRead(id: string): Promise<Notification>;
    abstract markAllAsRead(): Promise<void>;
    abstract delete(id: string): Promise<void>;
}
