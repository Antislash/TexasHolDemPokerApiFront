import { create, type StoreApi, type UseBoundStore } from 'zustand'
import { combine, persist } from 'zustand/middleware'
import { API_URL } from '../config'

type WithSelectors<S> = S extends { getState: () => infer T }
    ? S & { use: { [K in keyof T]: () => T[K] } }
    : never

function createSelectors<S extends UseBoundStore<StoreApi<object>>>(store: S) {
    const storeWithSelectors = store as WithSelectors<typeof store>
    storeWithSelectors.use = {} as WithSelectors<typeof store>['use']
    for (const key of Object.keys(store.getState())) {
        (storeWithSelectors.use as Record<string, unknown>)[key] =
            () => store(s => s[key as keyof typeof s])
    }
    return storeWithSelectors
}

export const useAuthStore = createSelectors(
    create(
        persist(
            combine(
                {
                    pseudo: null as string | null,
                    email: null as string | null,
                    isAuthenticated: false,
                },
                (set) => ({
                    login: (pseudo: string, email: string) => {
                        set({ pseudo, email, isAuthenticated: true })
                    },
                    logout: () => {
                        fetch(`${API_URL}/login/logout`, { method: 'POST', credentials: 'include' })
                        set({ pseudo: null, email: null, isAuthenticated: false })
                    },
                })
            ),
            {
                name: 'auth-storage',
                partialize: (state) => ({
                    pseudo: state.pseudo,
                    email: state.email,
                    isAuthenticated: state.isAuthenticated,
                }),
            }
        )
    )
)
