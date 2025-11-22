export enum NotificationType {
  NEW_APPOINTMENT = "new_appointment",
  APPOINTMENT_UPDATED = "appointment_updated",
  APPOINTMENT_REMINDER = "appointment_reminder",
  APPOINTMENT_CANCELLED = "appointment_cancelled",
  APPOINTMENT_COMPLETED = "appointment_completed",
}

export interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  createdAt: string | Date
  isRead: boolean
  appointmentId?: string
}
