import { useQuery } from "@tanstack/react-query";
import { getAllNotificationsUseCase } from "../../IoC/notification.container";

export const useGetNotifications = () => {
    return useQuery({
        queryKey: ["notifications"],
        queryFn: () => getAllNotificationsUseCase.execute(),
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
};
