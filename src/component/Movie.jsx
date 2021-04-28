import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import './Movie.scss';
import MovieDatas from './MovieDatas';

function Movie() {
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(1);
  const [loading, setLoading] = useState(true);

  const API_KEY = '96088fe5524927c1934d3da46fce32da';
  const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=${index}`;
  const img = 'https://image.tmdb.org/t/p/w1280';

  const pageNumbers = [];
  for (let i = 1; i <= 20; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    setLoading(true);
    async function getMovies() {
      let response = await fetch(url);
      response = await response.json();
      setMovies(response.results);
    }

    getMovies();
    setLoading(false);
  }, [url]);

  const setPage = (e) => {
    e.preventDefault();
    let paginate = parseInt(e.target.textContent);
    window.scrollTo(0, 0);

    setIndex(paginate);
  };

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <div className="movie-wrapper">
        {movies.map((movie) => {
          return <MovieDatas key={movie.id} {...movie} />;
        })}
      </div>
      <div className="btn-container">
        <button
          className={`btn ${index > 1 ? '' : 'hide'}`}
          onClick={() => {
            setIndex(index + 1);
            window.scrollTo(0, 0);
          }}
        >
          Prev
        </button>
        {pageNumbers.map((num, i) => {
          let position;
          index === i + 1 ? (position = 'active') : (position = '');

          return (
            <a key={i} href="" onClick={setPage} className={`${position}`}>
              {`${num} `}
            </a>
          );
        })}
        <button
          onClick={() => {
            setIndex(index + 1);
            window.scrollTo(0, 0);
          }}
          className={`btn ${index > 19 ? 'hide' : ''}`}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Movie;
