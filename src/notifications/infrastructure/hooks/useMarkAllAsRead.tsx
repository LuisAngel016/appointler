import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markAllAsReadUseCase } from "../../IoC/notification.container";
import { toast } from "sonner";

export const useMarkAllAsRead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => markAllAsReadUseCase.execute(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
            toast.success("Todas las notificaciones marcadas como leídas");
        },
        onError: (error: Error) => {
            toast.error("Error al marcar notificaciones", {
                description: error.message
            });
        }
    });
};
