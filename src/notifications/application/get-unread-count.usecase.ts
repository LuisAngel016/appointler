import type { INotificationRepository } from "../domain/repositories/notification.repository";

export class GetUnreadCountUseCase {
    constructor(private readonly repository: INotificationRepository) {}

    async execute(): Promise<number> {
        return await this.repository.getUnreadCount();
    }
}
