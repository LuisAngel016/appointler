import { Calendar, Check, AlertCircle, Bell, Clock, Info } from "lucide-react"
import { NotificationType } from "./types"

export const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case NotificationType.NEW_APPOINTMENT:
      return <Calendar className="h-5 w-5" />
    case NotificationType.APPOINTMENT_UPDATED:
      return <Clock className="h-5 w-5" />
    case NotificationType.APPOINTMENT_REMINDER:
      return <Bell className="h-5 w-5" />
    case NotificationType.APPOINTMENT_CANCELLED:
      return <AlertCircle className="h-5 w-5" />
    case NotificationType.APPOINTMENT_COMPLETED:
      return <Check className="h-5 w-5" />
    default:
      return <Info className="h-5 w-5" />
  }
}

export const getNotificationStyles = (type: NotificationType) => {
  switch (type) {
    case NotificationType.NEW_APPOINTMENT:
      return {
        bg: "bg-blue-100 dark:bg-blue-900/30",
        text: "text-blue-600 dark:text-blue-400",
        border: "border-blue-200 dark:border-blue-800",
      }
    case NotificationType.APPOINTMENT_UPDATED:
      return {
        bg: "bg-amber-100 dark:bg-amber-900/30",
        text: "text-amber-600 dark:text-amber-400",
        border: "border-amber-200 dark:border-amber-800",
      }
    case NotificationType.APPOINTMENT_CANCELLED:
      return {
        bg: "bg-red-100 dark:bg-red-900/30",
        text: "text-red-600 dark:text-red-400",
        border: "border-red-200 dark:border-red-800",
      }
    case NotificationType.APPOINTMENT_COMPLETED:
      return {
        bg: "bg-green-100 dark:bg-green-900/30",
        text: "text-green-600 dark:text-green-400",
        border: "border-green-200 dark:border-green-800",
      }
    case NotificationType.APPOINTMENT_REMINDER:
      return {
        bg: "bg-purple-100 dark:bg-purple-900/30",
        text: "text-purple-600 dark:text-purple-400",
        border: "border-purple-200 dark:border-purple-800",
      }
    default:
      return {
        bg: "bg-gray-100 dark:bg-gray-800",
        text: "text-gray-600 dark:text-gray-400",
        border: "border-gray-200 dark:border-gray-700",
      }
  }
}

export const formatTimeAgo = (date: string | Date) => {
  const d = new Date(date)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000)

  const rtf = new Intl.RelativeTimeFormat("es", { numeric: "auto" })

  if (seconds < 60) return "hace un momento"
  if (seconds < 3600) return rtf.format(-Math.floor(seconds / 60), "minute")
  if (seconds < 86400) return rtf.format(-Math.floor(seconds / 3600), "hour")
  if (seconds < 604800) return rtf.format(-Math.floor(seconds / 86400), "day")

  return new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d)
}
