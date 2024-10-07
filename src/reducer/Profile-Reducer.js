const profileReducer = (state, action) => {
  switch (action.type) {
    case 'SET-ALL-PROFILES': {
      return [...action.payload];
    }
    case 'REM-PROFILE': {
      return state.filter(ele => ele._id !== action.payload._id);
    }
    default: {
      return new Error('Invalid action type');
    }
  }
};
export default profileReducer;
