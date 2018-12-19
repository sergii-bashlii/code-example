import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";


const Card = ({ id, title, shortDescription, length, favorite }) => {
  return (
    <li className="card">
      <Link to={`/${id}`}>
        <img src="https://cdn0.iconfinder.com/data/icons/pixon-1/24/arrows_extend_full_screen_fullscreen_maximize_resize_outline-512.png" alt="fullscreen"/>
        <div>
          <h3>
            {
              favorite && <img className="favorite" src="https://cdn1.iconfinder.com/data/icons/messaging-3/48/Star-128.png" alt=""/>
            }
            {title}
          </h3>
          <p>{shortDescription}</p>
        </div>
        <p className="distance">{length}km</p>
        <span>></span>
      </Link>
    </li>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  favorite: PropTypes.bool.isRequired,
};

export default Card;