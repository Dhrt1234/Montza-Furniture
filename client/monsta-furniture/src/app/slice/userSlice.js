import { createSlice } from "@reduxjs/toolkit"
import Cookies from "js-cookie"

const initialState = {
    user: Cookies.get("USER") ? JSON.parse(Cookies.get("USER")) : null,
    token: Cookies.get("TOKEN") ? Cookies.get("TOKEN") : ''
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        userData: (state, reqData) => {

            let { payload } = reqData// {user:res.data.user}
            state.user = payload.user // here payload.user data pass to user state( state user initialize first =null  in initailState)
            state.token = payload.token
            Cookies.set('USER', JSON.stringify(state.user))
            Cookies.set('TOKEN', state.token)
        },

        logOut: (state) => {
            state.user = null
            state.token = ''
            Cookies.remove('USER')
            Cookies.remove('TOKEN')
        },
    },
})

export const { userData, logOut } = loginSlice.actions

export default loginSlice.reducer