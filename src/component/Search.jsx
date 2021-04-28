import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useGlobalContext } from '../context';
import defaultImg from '../assets/default.jpg';
import './Search.scss';

function Search() {
  const { searchUrl, url, setUrl, setArtistUrl } = useGlobalContext();

  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const img = 'https://image.tmdb.org/t/p/w1280';
  const history = useHistory();

  useEffect(() => {
    async function getMovieArr() {
      setLoading(true);

      let response = await fetch(searchUrl);
      response = await response.json();
      setSearchData(response.results);
      setLoading(false);
    }

    getMovieArr();
  }, [searchUrl]);

  const toDetails = (e) => {
    let id = e.target.id;
    let searchUrl = `  https://api.themoviedb.org/3/movie/${id}?api_key=96088fe5524927c1934d3da46fce32da&append_to_response=videos`;

    let castUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=96088fe5524927c1934d3da46fce32da&language=en-US`;

    setArtistUrl(castUrl);
    setUrl(searchUrl);
    history.push('/detail');
  };

  console.log(searchData);
  if (loading) {
    return <h1>LOADING</h1>;
  }
  return (
    <>
      <h1 className="search-header">
        {searchData.length > 0
          ? `Here our ${searchData.length} best results`
          : `Sorry We can't find your movie :(`}
      </h1>
      <section className="search-result">
        {searchData.map((queryData) => {
          let { title, backdrop_path, release_date, id } = queryData;
          return (
            <article key={id}>
              <h3>{title}</h3>
              <img
                src={backdrop_path ? `${img}/${backdrop_path}` : defaultImg}
                alt={title}
              />
              <p>{release_date ? release_date : 'Unknown'}</p>
              <button onClick={toDetails} id={id}>
                View More
              </button>
            </article>
          );
        })}
      </section>
    </>
  );
}

export default Search;
