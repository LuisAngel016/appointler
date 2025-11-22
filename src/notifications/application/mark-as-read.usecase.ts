import type { INotificationRepository } from "../domain/repositories/notification.repository";
import type { Notification } from "../domain/entities/notification.entity";

export class MarkAsReadUseCase {
    constructor(private readonly repository: INotificationRepository) {}

    async execute(id: string): Promise<Notification> {
        return await this.repository.markAsRead(id);
    }
}
