import { useQuery } from "@tanstack/react-query";
import { getUnreadNotificationsUseCase } from "../../IoC/notification.container";

export const useGetUnreadNotifications = () => {
    return useQuery({
        queryKey: ["notifications", "unread"],
        queryFn: () => getUnreadNotificationsUseCase.execute(),
        staleTime: 1000 * 30, // 30 segundos
        refetchInterval: 1000 * 60, // Refetch cada minuto
    });
};
