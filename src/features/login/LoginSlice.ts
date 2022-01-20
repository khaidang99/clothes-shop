import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Auth from 'models/Auth';
import Cookie from 'js-cookie'

import { User, valuesLogin } from 'types';

export const fetchLogin = createAsyncThunk(
    'login/singin',
    async (user: valuesLogin) => {
      const response = await Auth.login(user);
      return (await response.data) as User
    }
)

export const getProfile = createAsyncThunk(
    'login/profile',
    async () => {
      const response = await Auth.profile();
      return (await response.data) as User
    }
)

type SliceState = { userInfo: User, loading: 'pending' | 'idle' }

const initialState: SliceState = { loading: 'pending', userInfo: {
    _id: undefined,
    token: '',
    name: undefined,
    email: undefined
}}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload
        },
        logout(state) {
            Cookie.remove('token')
            state.userInfo = {
                _id: undefined,
                name: undefined,
                email: undefined,
                token: '',
            }
        },
    },
    extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
        builder
        .addCase(fetchLogin.pending, (state, action) => {
            if (state.loading === 'idle') {
              state.loading = 'pending'
            }
        })
        .addCase(fetchLogin.fulfilled, (state, action) => {
            // Add user to the state array
            if ( state.loading === 'pending' ) {
                state.loading = 'idle';
                state.userInfo = action.payload;
                Cookie.set('token', action.payload.token);
            }
        })
        .addCase(getProfile.fulfilled, (state, action) => {
            // Add user to the state array
            state.loading = 'idle';
            state.userInfo = action.payload;
        })
    },
})

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;