import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNotificationUseCase } from "../../IoC/notification.container";
import { toast } from "sonner";

export const useDeleteNotification = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteNotificationUseCase.execute(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
            toast.success("Notificación eliminada");
        },
        onError: (error: Error) => {
            toast.error("Error al eliminar notificación", {
                description: error.message
            });
        }
    });
};
