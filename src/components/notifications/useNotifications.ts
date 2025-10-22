import { useState } from "react";
import { Notification } from "./types";

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Investment Request Submitted",
      message: "Your request for $5,000 in TechNova Solutions was submitted.",
      type: "investment",
      from: "Shareholder",
      date: new Date().toLocaleString(),
      isRead: false,
    },
  ]);

  const addNotification = (n: Notification) => {
    setNotifications((prev) => [n, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const clearAll = () => setNotifications([]);

  return { notifications, addNotification, markAsRead, clearAll };
}
