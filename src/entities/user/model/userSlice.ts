import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ThunkExtraArgs } from '@/app/providers/redux/types'
import { AppState } from '@/app/providers/redux/store'

export interface UserSchema {
  isAuth: boolean;
  username: string;
}

const initialState: UserSchema = {
  isAuth: false,
  username: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },
})

export const { setAuth, setUsername } = userSlice.actions
export const userReducer = userSlice.reducer
