import React from 'react';

function Artist({ profile_path, character, cast_id, original_name }) {
  const img = 'https://image.tmdb.org/t/p/w1280';

  return (
    <article className="cast-container" key={cast_id}>
      <h1>aaaaaaaa</h1>
      {/* <h3>
        {original_name} as {character}
      </h3>
      <img src={`${img}/${profile_path}`} alt={character} /> */}
    </article>
  );
}

export default Artist;
