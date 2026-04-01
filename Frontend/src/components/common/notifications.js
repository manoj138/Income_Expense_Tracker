const STORAGE_KEY = "smartwallet_notifications";
const EVENT_NAME = "smartwallet-notifications-updated";

const readNotifications = () => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
};

const writeNotifications = (notifications) => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: notifications }));
};

const createNotification = ({ title, message, type = "info" }) => ({
  id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
  title,
  message,
  type,
  read: false,
  createdAt: new Date().toISOString(),
});

const pushNotification = (payload) => {
  const notifications = readNotifications();
  const nextNotifications = [createNotification(payload), ...notifications].slice(0, 20);
  writeNotifications(nextNotifications);
  return nextNotifications;
};

const markAllNotificationsRead = () => {
  const notifications = readNotifications().map((notification) => ({
    ...notification,
    read: true,
  }));
  writeNotifications(notifications);
  return notifications;
};

const clearNotifications = () => {
  writeNotifications([]);
};

export {
  STORAGE_KEY,
  EVENT_NAME,
  readNotifications,
  pushNotification,
  markAllNotificationsRead,
  clearNotifications,
};
