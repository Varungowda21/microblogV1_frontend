const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return { ...state, isLoggedIn: true, user: action.payload };
    }
    case "LOGOUT": {
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    }
    default: {
      return new Error("Invalid action type");
    }
  }
};
export default AuthReducer;
