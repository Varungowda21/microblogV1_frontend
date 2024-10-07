const postReducer = (state, action) => {
  switch (action.type) {
    case 'SET-POST': {
      return { ...state, data: action.payload };
    }
    case 'ADD-POST': {
      return { ...state, data: [action.payload, ...state.data] };
    }
    case 'DEL-POST': {
      return {
        ...state,
        data: state.data.filter(ele => {
          return ele._id !== action.payload._id;
        }),
      };
    }
    default: {
      return new Error('Invalid action type');
    }
  }
};
export default postReducer;
