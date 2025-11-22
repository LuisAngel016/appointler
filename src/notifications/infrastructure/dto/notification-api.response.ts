import { NotificationType } from "../../domain/entities/notification.entity";

export interface NotificationAPIResponse {
    id: string;
    title: string;
    message: string;
    type: NotificationType;
    userId: string;
    isRead: boolean;
    appointmentId?: string;
    createdBy?: string;
    createdAt: string;
    updatedAt: string;
}
