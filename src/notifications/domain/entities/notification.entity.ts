
export enum NotificationType {
    NEW_APPOINTMENT = 'new_appointment',
    APPOINTMENT_UPDATED = 'appointment_updated',
    APPOINTMENT_CANCELLED = 'appointment_cancelled',
    APPOINTMENT_COMPLETED = 'appointment_completed',
    APPOINTMENT_REMINDER = 'appointment_reminder',
}

export class Notification {
    constructor(
        public id: string,
        public title: string,
        public message: string,
        public type: NotificationType,
        public userId: string,
        public isRead: boolean,
        public appointmentId?: string,
        public createdBy?: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ) {}
}
