import { ElNotification } from 'element-plus'

type NotifyType = 'success' | 'error' | 'info' | 'warning'

export const useNotify = () => {
  function notify(type: NotifyType, title: string, message: string): void {
    ElNotification[type]({
      title,
      message,
      offset: 100,
      duration: 2000
    })
  }

  return {
    notify
  }
}