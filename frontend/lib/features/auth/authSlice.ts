import { AuthState, User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"


const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
 user:  null,

}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string; user: User | null }>) {
      state.isLoggedIn = true
      state.token = action.payload.token
      state.user = action.payload.user
    },
    logout(state) {
      state.isLoggedIn = false
      state.token = null
      state.user = null
    },
    updateUser(state, action: PayloadAction<User>) {
      if (state.isLoggedIn) {
        state.user = action.payload
      }
    },
  },
})

export const { loginSuccess, logout, updateUser } = authSlice.actions
export default authSlice.reducer
