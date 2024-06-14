import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    error: null,
    authError: null,
    loading: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signUpStart: (state) => {
            state.loading = true
            state.authError = null
        },
        signUpSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.authError = null
        },
        signUpFailure: (state, action) => {
            state.authError = action.payload
            state.loading = false
        },
        signInStart: (state) => {
            state.loading = true
            state.authError = null
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.authError = null
        },
        signInFailure: (state, action) => {
            state.authError = action.payload
            state.loading = false
            state.currentUser = null
        },
        clearAuthError: (state) => {
            state.authError = null
            state.currentUser = null
            state.error = null
        },
        saveUserDetailsStart: (state) => {
            state.loading = true
            state.error = null
        },
        saveUserDetailsSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = null
        },
        saveUserDetailsFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        signOutUserStart: (state) => {
            state.loading = true
            state.authError = null
        },
        signOutUserSuccess: (state) => {
            state.currentUser = null
            state.loading = false
            state.authError = null
            state.error = null
        },
        signOutUserFailure: (state, action) => {
            state.authError = action.payload
            state.loading = false
        },
    }
});

export const {
    signUpStart,
    signUpSuccess,
    signUpFailure,
    signInStart,
    signInSuccess,
    signInFailure,
    saveUserDetailsStart,
    saveUserDetailsSuccess,
    saveUserDetailsFailure,
    signOutUserStart,
    signOutUserSuccess,
    signOutUserFailure,
    clearAuthError
} = userSlice.actions

export default userSlice.reducer