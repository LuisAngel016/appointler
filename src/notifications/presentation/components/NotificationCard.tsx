import React from 'react';
import { Check, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { type Notification } from '@/notifications/domain/entities/notification.entity';
import { formatTimeAgo, getNotificationIcon, getNotificationStyles } from '../utils/notification.utils';
import { cn } from '@/shared/lib/utils';
import { Link } from 'react-router';

interface NotificationCardProps {
    notification: Notification
    onMarkAsRead: (id: string) => void
    onDelete: (id: string) => void
    compact?: boolean
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
    notification,
    onMarkAsRead,
    onDelete,
    compact = false,
}) => {
    const styles = getNotificationStyles(notification.type)

    return (
        <div
            className={cn(
                "group relative flex gap-4 rounded-xl border bg-card p-4 transition-all hover:shadow-md",
                !notification.isRead && "bg-accent/5 border-l-4 border-l-primary pl-3", // Left border for unread
                notification.isRead && "hover:bg-accent/50",
            )}
        >
            {/* Icon Column */}
            <div className="shrink-0">
                <div
                    className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                        styles.bg,
                        styles.text,
                    )}
                >
                    {getNotificationIcon(notification.type)}
                </div>
            </div>

            {/* Content Column */}
            <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-start justify-between gap-2">
                    <h3
                        className={cn(
                            "text-sm font-semibold leading-none",
                            !notification.isRead ? "text-foreground" : "text-muted-foreground",
                        )}
                    >
                        {notification.title}
                        {!notification.isRead && (
                            <span className="ml-2 inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
                        )}
                    </h3>
                    <span className="text-xs text-muted-foreground shrink-0">{formatTimeAgo(notification.createdAt || new Date())}</span>
                </div>

                <p className={cn("text-sm text-muted-foreground", compact ? "line-clamp-2" : "line-clamp-3")}>
                    {notification.message}
                </p>

                {/* Actions Footer */}
                {!compact && (
                    <div className="flex items-center gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity md:opacity-100">
                        {!notification.isRead && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-xs"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onMarkAsRead(notification.id)
                                }}
                            >
                                <Check className="mr-2 h-3.5 w-3.5" />
                                Marcar como leída
                            </Button>
                        )}

                        {notification.appointmentId && (
                            <Button variant="ghost" size="sm" className="h-8 text-xs" asChild>
                                {/* Using <a> tag inside Button asChild for next/link substitute if needed, but Button asChild is safer */}
                                <Link to={`/admin/appointments/${notification.appointmentId}`}>
                                    <ExternalLink className="mr-2 h-3.5 w-3.5" />
                                    Ver detalle
                                </Link>
                            </Button>
                        )}

                        <div className="flex-1" />

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors"
                            onClick={(e) => {
                                e.stopPropagation()
                                onDelete(notification.id)
                            }}
                        >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Eliminar</span>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}