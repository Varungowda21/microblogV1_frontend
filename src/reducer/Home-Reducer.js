const homeReducer = (state, action) => {
  switch (action.type) {
    case 'SET-ALL-POST': {
      return { ...state, data: action.payload };
    }
    case 'UPD-LIKE': {
      return {
        ...state,
        data: state.data.map(ele => {
          if (ele._id == action.payload._id) {
            return { ...action.payload };
          } else {
            return { ...ele };
          }
        }),
      };
    }
    case 'ADD-COMMENT': {
      return {
        ...state,
        data: state.data.map(ele => {
          if (ele._id == action.payload._id) {
            return { ...action.payload };
          } else {
            return { ...ele };
          }
        }),
      };
    }
    default: {
      return new Error('Invalid action type');
    }
  }
};
export default homeReducer;
