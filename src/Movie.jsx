import React, { useState, useEffect } from 'react';
import './Movie.scss';
import MovieDatas from './MovieDatas';

function Movie() {
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(1);

  const API_KEY = '96088fe5524927c1934d3da46fce32da';
  const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=${index}`;
  const img = 'https://image.tmdb.org/t/p/w1280';

  const pageNumbers = [];
  for (let i = 1; i <= 20; i++) {
    pageNumbers.push(i);
  }

  console.log(movies);

  useEffect(() => {
    async function getMovies() {
      let response = await fetch(url);
      response = await response.json();
      setMovies(response.results);
    }

    getMovies();
  }, [url]);

  const setPage = (e) => {
    e.preventDefault();
    let paginate = parseInt(e.target.textContent);
    console.log(e.target.parentElement);

    setIndex(paginate);
  };

  return (
    <>
      <div className="movie-wrapper">
        {movies.map((movie) => {
          return <MovieDatas key={movie.id} {...movie} />;
        })}
      </div>
      <div className="btn-container">
        <button
          onClick={() => setIndex(index + 1)}
          className={`btn ${index > 19 ? 'hide' : ''}`}
        >
          Next
        </button>
        {pageNumbers.map((num, i) => {
          let position;
          index === i + 1 ? (position = 'active') : (position = '');

          return (
            <a href="" onClick={setPage} className={`${position}`}>
              {`${num}  `}
            </a>
          );
        })}
        <button
          className={`btn ${index > 1 ? '' : 'hide'}`}
          onClick={() => setIndex(index + 1)}
        >
          Prev
        </button>
      </div>
    </>
  );
}

export default Movie;
