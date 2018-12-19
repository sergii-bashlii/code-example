import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Map extends Component {
  constructor() {
    super();

    this.mapRef = React.createRef();
  }

  componentDidUpdate() {
    const { isAddingMarker } = this.props;
    const cursor = 'url("https://maps.gstatic.com/mapfiles/openhand_8_8.cur"), default';
    const elem = this.mapRef.current.firstChild.firstChild.firstChild;
    if (elem) elem.style.cursor = isAddingMarker ? 'pointer' : cursor;
  }

  componentDidMount () {
    const { markers, draggable, currentPosition } = this.props;
    const center = markers.length ? markers[0] : currentPosition;
    this.map = new window.google.maps.Map(this.mapRef.current, {
      zoom: 14,
      center
    });

    window.google.maps.event.addListener(this.map, 'click', e => {
      this.addMarker(e.latLng.lat(), e.latLng.lng())
    });

    this.directionsService = new window.google.maps.DirectionsService();
    this.directionsDisplay = new window.google.maps.DirectionsRenderer({
      draggable,
      map: this.map,
    });

    this.directionsDisplay.addListener('directions_changed', (e) => {
      this.computeTotalDistance(this.directionsDisplay.getDirections());
    });

    this.buildWay();
  }

  computeTotalDistance = (result) => {
    const { changeMarker } = this.props;
    const { legs } = result.routes[0];
    const markers = [];
    let length = 0;

    markers.push({lat: legs[0].start_location.lat(), lng: legs[0].start_location.lng()})
    legs.forEach(leg => {
      markers.push({lat: leg.end_location.lat(), lng: leg.end_location.lng()});
      length += leg.distance.value;
    });

    length = length / 1000;
    
    if (changeMarker) changeMarker(markers, length)
  };

  displayRoute = (origin, destination, waypoints, service, display) => {
    service.route({
      origin,  // Haight.
      destination,  // Ocean Beach.
      waypoints,
      travelMode: 'DRIVING',
      avoidTolls: true
    }, function(response, status) {
      if (status === 'OK') {
        display.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  };

  buildWay = () => {
    const { markers } = this.props;
    if (markers.length < 2) return;

    const waypoints = [];
    for (let i = 1; i < markers.length - 1; i++) {
      waypoints.push({
        location: markers[i]
      })
    }

    this.displayRoute(markers[0], markers[markers.length - 1], waypoints, this.directionsService,
      this.directionsDisplay);
  };

  addMarker = (lat, lng) => {
    const { markers, isAddingMarker, addMarker } = this.props;

    if (!isAddingMarker) return;

    if (!markers.length) {
      this.marker = new window.google.maps.Marker({
        position: {lat, lng},
        map: this.map
      });
    }
    if (markers.length && this.marker) {
      this.marker.setMap(null);
      this.marker = false;
    }
    addMarker({lat, lng});
    this.buildWay();
  };

  render() {
    const { height } = this.props;
    return (
      <div style={{height, cursor: 'pointer'}} ref={this.mapRef}>
        
      </div>
    );
  }
}

Map.defaultProps = {
  height: '400px',
  draggable: false,
  currentPosition: {lat: 0, lng: 0},
  isAddingMarker: false,
  addMarker: null,
  changeMarker: null
};

Map.propTypes = {
  height: PropTypes.string,
  markers: PropTypes.array.isRequired,
  draggable: PropTypes.bool,
  currentPosition: PropTypes.object,
  isAddingMarker: PropTypes.bool,
  addMarker: PropTypes.func,
  changeMarker: PropTypes.func,
};

export default Map;