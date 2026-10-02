import { create } from "zustand";

type UiStore = {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  collapseSidebar: () => void;
  expandSidebar: () => void;
};

export const useUiStore = create<UiStore>((set) => ({
  sidebarCollapsed: false,

  toggleSidebar: () =>
    set((state) => ({
      sidebarCollapsed: !state.sidebarCollapsed,
    })),

  collapseSidebar: () =>
    set({
      sidebarCollapsed: true,
    }),

  expandSidebar: () =>
    set({
      sidebarCollapsed: false,
    }),
}));
