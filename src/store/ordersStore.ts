import { create } from "zustand";
import { persist } from "zustand/middleware";

export type OrderStatus = "Pending" | "Confirmed" | "Ready" | "Served";

export interface TableOrderItem {
  name: string;
  qty: number;
  price: number;
}
export interface TableOrder {
  id: string;
  table: string;
  customerName: string;
  items: TableOrderItem[];
  total: number;
  status: OrderStatus;
  timestamp: string;
}

interface OrdersState {
  orders: TableOrder[];
  addOrder: (o: Omit<TableOrder, "id" | "timestamp" | "status">) => TableOrder;
  setStatus: (id: string, status: OrderStatus) => void;
  archive: (id: string) => void;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (o) => {
        const order: TableOrder = {
          ...o,
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          status: "Pending",
          timestamp: new Date().toISOString(),
        };
        set((s) => ({ orders: [order, ...s.orders] }));
        return order;
      },
      setStatus: (id, status) =>
        set((s) => ({ orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)) })),
      archive: (id) =>
        set((s) => ({ orders: s.orders.map((o) => (o.id === id ? { ...o, status: "Served" } : o)) })),
    }),
    { name: "fast_baker_table_orders" }
  )
);

interface AdminConfig {
  receptionPin: string;
  adminPin: string;
  whatsappPrimary: string;
  whatsappSecondary: string;
  setReceptionPin: (p: string) => void;
  setAdminPin: (p: string) => void;
  setWhatsappPrimary: (p: string) => void;
  setWhatsappSecondary: (p: string) => void;
}
export const useAdminConfig = create<AdminConfig>()(
  persist(
    (set) => ({
      receptionPin: "9999",
      adminPin: "9999",
      whatsappPrimary: "22870135959",
      whatsappSecondary: "22896357474",
      setReceptionPin: (p) => set({ receptionPin: p }),
      setAdminPin: (p) => set({ adminPin: p }),
      setWhatsappPrimary: (p) => set({ whatsappPrimary: p }),
      setWhatsappSecondary: (p) => set({ whatsappSecondary: p }),
    }),
    { name: "fast_baker_admin_config" }
  )
);
