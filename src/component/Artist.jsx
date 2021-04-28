import React from 'react';
import './Artist.scss';

function Artist({ profile_path, character, cast_id, original_name }) {
  const img = 'https://image.tmdb.org/t/p/w1280';

  return (
    <article className="cast-container" key={cast_id}>
      <img src={`${img}/${profile_path}`} alt={character} />
      <h3>{original_name}</h3>
      <p>as</p>
      <h3 className="character"> {character}</h3>
    </article>
  );
}

export default Artist;
