const initialState = {
  markers: [],
  length: 0,
  currentPosition: { lat: 0, lng: 0 }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_LENGTH':
      return {
        ...state,
        length: action.payload
      };
    case 'GET_CURRENT_POSITION':
      return {
        ...state,
        currentPosition: action.payload
      };
    case 'ADD_MARKER':
      return {
        ...state,
        markers: [...state.markers, action.payload]
      };
    case 'SET_MARKERS':
      return {
        ...state,
        markers: action.payload
      };
    default:
      return state;
  }
}