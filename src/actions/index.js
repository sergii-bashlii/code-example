import firestore from '../firestoreSettings';


export const setSearch = (data) => ({
  type: 'SEARCH',
  payload: data
});

export const toggleModal = () => ({
  type: 'TOGGLE_MODAL',
});

export const getCurrentPosition = () => {
  return dispatch => {
    navigator.geolocation.getCurrentPosition((data) => {
      const { latitude, longitude } = data.coords;
      dispatch({
        type: 'GET_CURRENT_POSITION',
        payload: {
          lat: latitude,
          lng: longitude
        }
      })
    }, () => {
      dispatch({
        type: 'GET_CURRENT_POSITION',
        payload: {
          lat: 0,
          lng: 0
        }
      })
    });
  }
};

export const addMarker = (marker) => ({
  type: 'ADD_MARKER',
  payload: marker
});

export const setLength = (length) => ({
  type: 'SET_LENGTH',
  payload: length
});

export const setMarkers = (markers) => ({
  type: 'SET_MARKERS',
  payload: markers

});

const getData = (dispatch) => {
  firestore.collection("paths").get()
    .then((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({
          id: doc.id,
          ...doc.data()
        })
      });
      dispatch({
        type: 'GET_PATHS',
        payload: docs
      })
    })
}

export const getPaths = () => {
  return getData
};

export const addPaths = (file) => {
  return (dispatch) => {
    return firestore.collection("paths").add(file)
      .then(() => {
        getData(dispatch)
      })
  }
};

export const toggleFavorite = (id, favorite) => {
  return dispatch => {
    firestore.collection("paths").doc(id).update({favorite})
      .then(function() {
        dispatch({
          type: 'TOGGLE_FAVORITE',
          payload: id
        });
        console.log("Document successfully updated!");
      }).catch(function(error) {
        console.error("Error updating document: ", error);
      });;
  }
};

export const deletePaths = (id) => {
  return dispatch => {
    return firestore.collection("paths").doc(id).delete().then(function() {
      dispatch({
        type: 'DELETE_PATHS',
        payload: id
      });
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  }
};