import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface RefreshState {
  interval: number
  setInterval: (interval: number) => void
}

export const useRefreshStore = create<RefreshState>()(
  persist(
    (set) => ({
      interval: 5, // Default 5 seconds
      setInterval: (interval) => set({ interval }),
    }),
    {
      name: 'refresh-settings',
    }
  )
)
