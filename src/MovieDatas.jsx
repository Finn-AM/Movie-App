import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from './context';
import { IoStar } from 'react-icons/io5';
import './MovieDatas.scss';
import defaultImg from './assets/default.jpg';

function MovieDatas({ original_title, poster_path, id, vote_average }) {
  const { url, setUrl, artistUrl, setArtistUrl } = useGlobalContext();
  const img = 'https://image.tmdb.org/t/p/w1280';

  const detailsMovie = (e) => {
    let id = e.target.id;
    let uniqueUrl = `  https://api.themoviedb.org/3/movie/${id}?api_key=96088fe5524927c1934d3da46fce32da&append_to_response=videos`;
    let castUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=96088fe5524927c1934d3da46fce32da&language=en-US`;

    setUrl(uniqueUrl);
    setArtistUrl(castUrl);
  };

  return (
    <div key={id} className="movie-container">
      <h3>{original_title}</h3>
      <img src={poster_path ? `${img}/${poster_path}` : defaultImg} alt="" />
      <div className="overview">
        <span>
          <IoStar />
          {vote_average}
        </span>
      </div>
      <div className="movie-btn">
        <Link to="/detail">
          <button className="btn" onClick={detailsMovie} id={id}>
            More Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default MovieDatas;
