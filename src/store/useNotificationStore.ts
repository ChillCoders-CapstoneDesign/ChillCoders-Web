import { create } from 'zustand';

type Notification = {
    notificationNo: number;
    message: string;
    createdAt: string;
    read: boolean; // 🔴 읽음 여부 추가
};

type NotificationState = {
    notifications: Notification[];
    setNotifications: (data: Notification[]) => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
    notifications: [],
    setNotifications: (data) => set({ notifications: data }),
}));