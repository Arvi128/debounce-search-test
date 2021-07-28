import React from "react";
import PropTypes from "prop-types";

function Film({ film }) {
  return (
    <div>
      <h2>{film.title}</h2>
    </div>
  );
}

Film.propTypes = {
  film: PropTypes.any.isRequired,
};

export default Film;
