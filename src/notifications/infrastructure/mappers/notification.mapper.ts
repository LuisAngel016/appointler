import { Notification, NotificationType } from "../../domain/entities/notification.entity";
import type { NotificationAPIResponse } from "../dto/notification-api.response";

export class NotificationMapper {
    static fromApiResponse(response: NotificationAPIResponse): Notification {
        // Normalizar el tipo de notificación
        const type = (typeof response.type === 'string' ? response.type.toLowerCase() : response.type) as NotificationType;
        
        return new Notification(
            response.id,
            response.title,
            response.message,
            type,
            response.userId,
            response.isRead,
            response.appointmentId,
            response.createdBy,
            new Date(response.createdAt),
            new Date(response.updatedAt)
        );
    }

    static fromApiResponseArray(responses: NotificationAPIResponse[]): Notification[] {
        return responses.map(this.fromApiResponse);
    }
}
