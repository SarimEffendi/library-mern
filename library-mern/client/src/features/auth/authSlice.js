import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser } from '@/features/auth/authThunks';
import { jwtDecode } from 'jwt-decode';

const isTokenExpired = (token) => {
    try {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 < Date.now(); 
    } catch (error) {
        return true; 
    }
};

const token = localStorage.getItem('authToken');
let rolesFromStorage = [];

try {
    const rolesRaw = localStorage.getItem('roles');
    rolesFromStorage = rolesRaw ? JSON.parse(rolesRaw) : [];
} catch (error) {
    console.error('Error parsing roles from localStorage:', error);
    rolesFromStorage = [];
}

let initialState = {
    user: null,
    token: token || null,
    isAuthenticated: false,
    roles: rolesFromStorage, 
    loading: false,
    error: null,
    tokenExpiry: null,
};

// Update user assignment logic
if (token && !isTokenExpired(token)) {
    try {
        const decoded = jwtDecode(token);
        initialState.isAuthenticated = true;
        // Set user as an object containing username and id
        initialState.user = {
            username: decoded.username || null,
            id: decoded._id || null,
        };
        console.log('Decoded user info:', initialState.user);
        initialState.tokenExpiry = decoded.exp;
        initialState.roles = decoded.role || [];
    } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('roles');
    }
} else {
    localStorage.removeItem('authToken');
    localStorage.removeItem('roles');
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.tokenExpiry = null;
            state.roles = []; // Clear roles on logout
            state.error = null;
            localStorage.removeItem('authToken');
            localStorage.removeItem('roles');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                const { token, user, roles } = action.payload;
                const decodedToken = jwtDecode(token);

                state.loading = false;
                state.isAuthenticated = true;
                state.user = {
                    username: decodedToken.username || user.username,
                    id: decodedToken._id || user._id,
                };
                state.token = token;
                state.tokenExpiry = decodedToken.exp;
                state.roles = roles || decodedToken.role || []; 

                localStorage.setItem('authToken', token);
                localStorage.setItem('roles', JSON.stringify(roles || decodedToken.role || []));
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const { token, user, roles } = action.payload;
                const decodedToken = jwtDecode(token);

                state.loading = false;
                state.isAuthenticated = true;
                state.user = {
                    username: decodedToken.username || user.username,
                    id: decodedToken._id || user._id,
                };
                state.token = token;
                state.tokenExpiry = decodedToken.exp;
                state.roles = roles || decodedToken.role || [];

                localStorage.setItem('authToken', token);
                localStorage.setItem('roles', JSON.stringify(roles || decodedToken.role || []));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
