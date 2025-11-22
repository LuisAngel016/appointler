import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markAsReadUseCase } from "../../IoC/notification.container";
import { toast } from "sonner";

export const useMarkAsRead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => markAsReadUseCase.execute(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
        onError: (error: Error) => {
            toast.error("Error al marcar notificación como leída", {
                description: error.message
            });
        }
    });
};
