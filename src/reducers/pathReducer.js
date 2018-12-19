const initialState = {
  paths: [],
  currentPath: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'GET_PATHS':
      return {
        ...state,
        paths: action.payload
      };
    case 'DELETE_PATHS':
      return {
        ...state,
        paths: state.paths.filter(path => path.id !== action.payload)
      };
    case 'TOGGLE_FAVORITE':
      const paths = state.paths.map((path) => {
        if (path.id === action.payload) path.favorite = !path.favorite;
        return path;
      });
      return {
        ...state,
        paths
      };
    default:
      return state;
  }
}