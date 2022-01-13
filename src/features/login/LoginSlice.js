import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Auth from 'models/Auth';
import Cookie from 'js-cookie';

export const fetchLogin = createAsyncThunk(
    'login',
    async (user) => {
      const response = await Auth.login(user);
      return response.data
    }
)

const loginSlice = createSlice({
    name: 'login',
    initialState: { userInfo: undefined, loading: 'pending' },
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload
        },
        logout(state, action) {
            Cookie.remove('token')
            state.userInfo = undefined
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
    },
})

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;