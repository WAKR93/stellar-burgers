import authReducer, {
  setUser,
  authCheck,
  clearError,
  registerUser,
  loginUser,
  logoutUser,
  initialState
} from './authSlice';
import { TUser } from '@utils-types';

const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

describe('auth reducer', () => {
  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setUser', () => {
    const action = setUser(mockUser);
    const state = authReducer(initialState, action);

    expect(state.user).toEqual(mockUser);
  });

  it('should handle authCheck', () => {
    const action = authCheck();
    const state = authReducer(initialState, action);

    expect(state.isAuthChecked).toBe(true);
  });

  it('should handle clearError', () => {
    const stateWithError = { ...initialState, error: 'Some error' };
    const action = clearError();
    const state = authReducer(stateWithError, action);

    expect(state.error).toBe(null);
  });

  it('should handle registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const state = authReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('should handle registerUser.fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: mockUser
    };
    const state = authReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: false,
      user: mockUser
    });
  });

  it('should handle registerUser.rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'Registration failed' }
    };
    const state = authReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Registration failed'
    });
  });

  it('should handle loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const state = authReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('should handle loginUser.fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: mockUser
    };
    const state = authReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: false,
      user: mockUser
    });
  });

  it('should handle logoutUser.fulfilled', () => {
    const stateWithUser = { ...initialState, user: mockUser };
    const action = { type: logoutUser.fulfilled.type };
    const state = authReducer(stateWithUser, action);

    expect(state.user).toBe(null);
  });
});
