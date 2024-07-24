interface Notification {
  id: number;
  message: string;
}

const notifications = ref<Notification[]>([]);

export function useNotification() {
  function addNotification(message: string) {
    const id = Date.now();
    notifications.value.push({ id, message });
    setTimeout(() => {
      notifications.value = notifications.value.filter((n) => n.id !== id);
    }, 3000);
  }

  return {
    notifications,
    addNotification,
  };
}
