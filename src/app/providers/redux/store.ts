import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from '@/entities/user/model/userSlice'
import { api } from '@/shared/api/api'

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { api },
      },
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
