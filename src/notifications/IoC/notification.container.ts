import { NotificationRepositoryImpl } from "../infrastructure/repositories/notification.repository.impl";
import { GetAllNotificationsUseCase } from "../application/get-all-notifications.usecase";
import { GetUnreadNotificationsUseCase } from "../application/get-unread-notifications.usecase";
import { GetUnreadCountUseCase } from "../application/get-unread-count.usecase";
import { MarkAsReadUseCase } from "../application/mark-as-read.usecase";
import { MarkAllAsReadUseCase } from "../application/mark-all-as-read.usecase";
import { DeleteNotificationUseCase } from "../application/delete-notification.usecase";

// Repository
const notificationRepository = new NotificationRepositoryImpl();

// Use Cases
export const getAllNotificationsUseCase = new GetAllNotificationsUseCase(notificationRepository);
export const getUnreadNotificationsUseCase = new GetUnreadNotificationsUseCase(notificationRepository);
export const getUnreadCountUseCase = new GetUnreadCountUseCase(notificationRepository);
export const markAsReadUseCase = new MarkAsReadUseCase(notificationRepository);
export const markAllAsReadUseCase = new MarkAllAsReadUseCase(notificationRepository);
export const deleteNotificationUseCase = new DeleteNotificationUseCase(notificationRepository);
