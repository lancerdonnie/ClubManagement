type RootType = {
  authenticated: boolean;
  username?: string;
  token?: string;
};

export const initialState: RootType = {
  username: localStorage.getItem('username') ?? undefined,
  authenticated: localStorage.getItem('authenticated') === 'true' ? true : false,
  token: localStorage.getItem('token') ?? undefined,
};

const reducer = (state: RootType = initialState, action: { type: string; payload?: any }) => {
  const { type, payload } = action;

  switch (type) {
    case 'AUTHTRUE':
      return {
        ...state,
        authenticated: true,
        token: payload.token,
        username: payload.username,
      };
    case 'AUTHFALSE':
      return {
        ...state,
        authenticated: false,
        token: undefined,
      };
    default:
      return state;
  }
};

export type RootState = ReturnType<typeof reducer>;

export default reducer;
