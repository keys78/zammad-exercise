import { defineStore } from 'pinia'
import { NotificationType, NotificationState } from '../types/exercise'

interface Notification {
  id: number
  type: NotificationType
  message: string
}

const useNotificationStore = defineStore({
  id: 'notification',
  state: (): NotificationState => ({
    notifications: [],
  }),

  actions: {
    addNotification(this: any, type: NotificationType, message: string): void {
      const newNotification: Notification = {
        id: Date.now(),
        type,
        message,
      }

      this.notifications.push(newNotification)

      // dissaper  notification after 2 seconds
      setTimeout(() => {
        const index = this.notifications.findIndex(
          (n: Notification) => n.id === newNotification.id,
        )
        if (index !== -1) {
          this.notifications.splice(index, 1)
        }
      }, 2000)
    },

    clearNotifications(this: any): void {
      this.notifications = []
    },
  },
})

export default useNotificationStore
