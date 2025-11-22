import type { INotificationRepository } from "../domain/repositories/notification.repository";
import type { Notification } from "../domain/entities/notification.entity";

export class GetAllNotificationsUseCase {
    constructor(private readonly repository: INotificationRepository) {}

    async execute(): Promise<Notification[]> {
        return await this.repository.getAll();
    }
}
