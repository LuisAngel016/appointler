import type { INotificationRepository } from "../domain/repositories/notification.repository";

export class DeleteNotificationUseCase {
    constructor(private readonly repository: INotificationRepository) {}

    async execute(id: string): Promise<void> {
        return await this.repository.delete(id);
    }
}
