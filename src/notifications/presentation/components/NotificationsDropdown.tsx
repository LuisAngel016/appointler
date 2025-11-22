import React, { useState } from 'react';
import { Link } from 'react-router';
import { Bell, Check, Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { useGetUnreadNotifications } from '@/notifications/infrastructure/hooks/useGetUnreadNotifications';
import { useGetUnreadCount } from '@/notifications/infrastructure/hooks/useGetUnreadCount';
import { useMarkAsRead } from '@/notifications/infrastructure/hooks/useMarkAsRead';
import { useMarkAllAsRead } from '@/notifications/infrastructure/hooks/useMarkAllAsRead';
import { useDeleteNotification } from '@/notifications/infrastructure/hooks/useDeleteNotification';
import { formatTimeAgo, getNotificationIcon, getNotificationStyles } from '../utils/notification.utils';
import { cn } from '@/shared/lib/utils';


export const NotificationsDropdown: React.FC = () => {
    const [open, setOpen] = useState(false)
    const { data: notifications } = useGetUnreadNotifications()
    const { data: unreadCount } = useGetUnreadCount()
    const markAsRead = useMarkAsRead()
    const markAllAsRead = useMarkAllAsRead()
    const deleteNotification = useDeleteNotification()

    const count = unreadCount || 0

    const handleMarkAsRead = (id: string, e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        markAsRead.mutate(id)
    }

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        deleteNotification.mutate(id)
    }

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <button
                    aria-label="Notificaciones"
                    className="group relative cursor-pointer p-2 text-gray-600 dark:text-gray-300 hover:text-foreground dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                    <Bell size={20} className="transition-transform duration-200 group-hover:rotate-6 group-hover:scale-110" />

                    {/* Badge */}
                    {count > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-background animate-in zoom-in duration-300">
                            {count > 99 ? "99+" : count}
                        </span>
                    )}
                    <span className="sr-only">Notificaciones</span>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-[380px] p-0 rounded-xl shadow-xl border-border/50 font-poppins">
                <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30 sticky top-0 z-10 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm">Notificaciones</h3>
                        {count > 0 && (
                            <span className="bg-primary/10 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                {count} nuevas
                            </span>
                        )}
                    </div>
                    {notifications && notifications.length > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAllAsRead.mutate()}
                            className="h-7 text-xs hover:text-primary px-2"
                        >
                            <Check className="h-3 w-3 mr-1.5" />
                            Marcar todas
                        </Button>
                    )}
                </div>

                <ScrollArea className="h-[400px]">
                    {!notifications || notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                            <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center mb-3">
                                <Bell className="h-6 w-6 text-muted-foreground/50" />
                            </div>
                            <p className="text-sm font-medium text-foreground">¡Estás al día!</p>
                            <p className="text-xs text-muted-foreground mt-1">No tienes notificaciones sin leer.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-border/50">
                            {notifications.map((notification) => {
                                const styles = getNotificationStyles(notification.type)
                                return (
                                    <div
                                        key={notification.id}
                                        className="group relative flex gap-3 p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                                        onClick={() => {
                                            markAsRead.mutate(notification.id)
                                        }}
                                    >
                                        <div
                                            className={cn(
                                                "h-8 w-8 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                                                styles.bg,
                                                styles.text,
                                            )}
                                        >
                                            {getNotificationIcon(notification.type)}
                                        </div>

                                        <div className="flex-1 min-w-0 space-y-1">
                                            <div className="flex items-start justify-between gap-2">
                                                <p className="text-sm font-medium leading-tight text-foreground">{notification.title}</p>
                                                <span className="text-[10px] text-muted-foreground shrink-0">
                                                    {formatTimeAgo(notification?.createdAt || new Date())}
                                                </span>
                                            </div>
                                            <p className="text-xs text-muted-foreground line-clamp-2">{notification.message}</p>
                                        </div>

                                        {/* Hover Actions */}
                                        <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-[2px] rounded-md p-0.5 shadow-sm">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 hover:text-primary hover:bg-primary/10"
                                                onClick={(e) => handleMarkAsRead(notification.id, e)}
                                                title="Marcar como leída"
                                            >
                                                <Check className="h-3 w-3" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 hover:text-destructive hover:bg-destructive/10"
                                                onClick={(e) => handleDelete(notification.id, e)}
                                                title="Eliminar"
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </ScrollArea>

                <div className="p-2 border-t bg-muted/30">
                    <Button variant="outline" className="w-full justify-center text-xs h-8 bg-transparent" asChild>
                        <Link to="/admin/notifications" onClick={() => setOpen(false)}>
                            Ver historial completo
                        </Link>
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}