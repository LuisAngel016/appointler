import type { INotificationRepository } from "../domain/repositories/notification.repository";

export class MarkAllAsReadUseCase {
    constructor(private readonly repository: INotificationRepository) {}

    async execute(): Promise<void> {
        return await this.repository.markAllAsRead();
    }
}
