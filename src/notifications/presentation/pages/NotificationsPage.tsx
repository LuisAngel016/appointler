import React, { useState } from 'react';
import { CheckCheck, Bell, Filter, Search } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { Input } from '@/shared/components/ui/input';
import { useGetNotifications } from '@/notifications/infrastructure/hooks/useGetNotifications';
import { useMarkAsRead } from '@/notifications/infrastructure/hooks/useMarkAsRead';
import { useMarkAllAsRead } from '@/notifications/infrastructure/hooks/useMarkAllAsRead';
import { useDeleteNotification } from '@/notifications/infrastructure/hooks/useDeleteNotification';
import { NotificationCard } from '../components/NotificationCard';
import { useParams, useNavigate } from 'react-router';

export const NotificationsPage: React.FC = () => {
    const { filter } = useParams<{ filter?: string }>();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const { data: allNotifications } = useGetNotifications();

    const activeTab = (filter === 'unread' || filter === 'read') ? filter : 'all';
    const markAsRead = useMarkAsRead();
    const markAllAsRead = useMarkAllAsRead();
    const deleteNotification = useDeleteNotification();

    const handleMarkAsRead = (id: string) => {
        markAsRead.mutate(id);
    };

    const handleDelete = (id: string) => {
        deleteNotification.mutate(id);
    };

    const handleMarkAllAsRead = () => {
        markAllAsRead.mutate();
    };

    const unreadCount = allNotifications?.filter((n) => !n.isRead).length || 0;

    const filteredNotifications = allNotifications?.filter((n) => {
        const matchesSearch =
            n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            n.message.toLowerCase().includes(searchQuery.toLowerCase());

        if (activeTab === 'unread') return !n.isRead && matchesSearch;
        if (activeTab === 'read') return n.isRead && matchesSearch;
        return matchesSearch;
    }) || [];

    return (
        <div className="p-3 md:p-4 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen animate-fade-up animated-duration-[800ms] animate-delay-100">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Notificaciones</h1>
                    <p className="text-muted-foreground mt-1 text-lg">Administra tus avisos y recordatorios</p>
                </div>
                <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                        <Button onClick={handleMarkAllAsRead} variant="default" className="shadow-sm">
                            <CheckCheck className="h-4 w-4 mr-2" />
                            Marcar todo leído
                        </Button>
                    )}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="shadow-sm border-none bg-card/50 backdrop-blur hover:bg-card transition-colors">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Bell className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total</p>
                            <p className="text-3xl font-bold">{allNotifications?.length || 0}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="shadow-sm border-none bg-blue-50/50 dark:bg-blue-900/10 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center shrink-0">
                            <Filter className="h-6 w-6 text-blue-600 dark:text-blue-200" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Sin leer</p>
                            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{unreadCount}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="shadow-sm border-none bg-green-50/50 dark:bg-green-900/10 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center shrink-0">
                            <CheckCheck className="h-6 w-6 text-green-600 dark:text-green-200" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Leídas</p>
                            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                                {(allNotifications?.length || 0) - unreadCount}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Controls & List */}
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card p-2 rounded-xl shadow-sm border">
                    <Tabs value={activeTab} onValueChange={(value) => navigate(`../${value}`)} className="w-full sm:w-auto">
                        <TabsList className="grid w-full grid-cols-3 sm:w-auto">
                            <TabsTrigger value="all">Todas</TabsTrigger>
                            <TabsTrigger value="unread">No leídas</TabsTrigger>
                            <TabsTrigger value="read">Leídas</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Buscar notificaciones..."
                            className="pl-9 bg-muted/50 border-none focus-visible:ring-1"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    {filteredNotifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center bg-card/50 rounded-xl border border-dashed">
                            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6 animate-pulse">
                                <Bell className="h-10 w-10 text-muted-foreground/50" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-foreground">No se encontraron notificaciones</h3>
                            <p className="text-muted-foreground max-w-sm">
                                {searchQuery
                                    ? `No hay resultados para "${searchQuery}"`
                                    : activeTab === 'unread'
                                        ? '¡Estás al día! No tienes mensajes pendientes.'
                                        : 'Tu bandeja de notificaciones está vacía.'}
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-3">
                            {filteredNotifications.map((notification) => (
                                <NotificationCard
                                    key={notification.id}
                                    notification={notification}
                                    onMarkAsRead={handleMarkAsRead}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
