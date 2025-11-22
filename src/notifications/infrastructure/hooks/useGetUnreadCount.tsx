import { useQuery } from "@tanstack/react-query";
import { getUnreadCountUseCase } from "../../IoC/notification.container";

export const useGetUnreadCount = () => {
    return useQuery({
        queryKey: ["notifications", "unread", "count"],
        queryFn: () => getUnreadCountUseCase.execute(),
        staleTime: 1000 * 30, // 30 segundos
        refetchInterval: 1000 * 60, // Refetch cada minuto
    });
};
