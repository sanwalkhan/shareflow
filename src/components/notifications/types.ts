export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "investment" | "approval" | "general";
  from?: string;
  date: string;
  isRead: boolean;
}
