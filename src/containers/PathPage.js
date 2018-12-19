import React, {Component} from 'react';
import { connect } from "react-redux";
import Map from '../components/Map';
import { deletePaths, toggleFavorite } from '../actions';


class PathPage extends Component {
  toggleFavorites = (e) => {
    e.preventDefault();
    const { paths, match, toggleFavorite } = this.props;
    const { id } = match.params;
    const data = paths.find(path => path.id === id);
    const { favorite } = data;
    toggleFavorite(id, !favorite)
  };

  remove = (e) => {
    e.preventDefault();
    const { match, history, deletePaths } = this.props;
    const { id } = match.params;
    deletePaths(id).then(() => {
      history.push('/')
    })
  };

  render() {
    const { match, paths } = this.props;
    const data = paths.find(path => path.id === match.params.id);
    if (!data) return <h2>Loading...</h2>;
    const { id, title, fullDescription, length, markers, favorite } = data;
    return (
      <div>
        <header>
          <h2>{title}</h2>
          <p className="distance">{length} km</p>
        </header>
        <p className="description">{fullDescription}</p>
        <Map key={id} markers={markers} />
        <div className="actions">
          {
            favorite ?
              <a href="#" onClick={this.toggleFavorites}>Remove from favorites</a> :
              <a href="#" onClick={this.toggleFavorites}>Add to favorites</a>
          }
          <a href="#" onClick={this.remove}>Remove</a>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ paths }) => ({ paths: paths.paths }),
  {
    deletePaths,
    toggleFavorite,
  }
)(PathPage);