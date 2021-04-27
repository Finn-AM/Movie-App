import React, { useState, useEffect, useRef } from 'react';
import { useGlobalContext } from './context';
import { useHistory } from 'react-router-dom';
import Loading from './Loading';
import Artist from './Artist';
import { FaChevronUp, FaChevronDown, FaChevronLeft } from 'react-icons/fa';
import defaultImg from './assets/default.jpg';
import './MovieDetail.scss';

function MovieDetail() {
  const [detail, setDetail] = useState('');
  const [artist, setArtist] = useState([]);
  const { url, artistUrl, videos, setVideos } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [expandTrailer, setExpandTrailer] = useState(true);
  const [expandCaster, setExpandCaster] = useState(true);
  const history = useHistory();
  const frameRef = useRef(null);
  const casterRef = useRef(null);
  const img = 'https://image.tmdb.org/t/p/w1280';

  useEffect(() => {
    setLoading(true);
    getDetails();
    getArtist();
    setLoading(false);
  }, []);

  function goBack() {
    history.goBack();
  }

  async function getArtist() {
    let response = await fetch(artistUrl);
    response = await response.json();
    setArtist(response.cast);
  }

  async function getDetails() {
    try {
      let response = await fetch(url);
      response = await response.json();
      setDetail(response);
      console.log(response.videos);
      setVideos(response.videos.results[0].key);
    } catch (error) {
      console.log(error);
      setVideos('aa');
    }
  }

  function handleTrailer() {
    setExpandTrailer(!expandTrailer);

    if (expandTrailer) frameRef.current.style.height = '40vh';
    if (!expandTrailer) frameRef.current.style.height = '0';
  }

  const handleCaster = () => {
    setExpandCaster(!expandCaster);

    if (expandCaster) casterRef.current.style.height = '40vh';
    if (!expandCaster) casterRef.current.style.height = '0';
  };

  console.log(detail);
  console.log(artist);
  console.log(videos);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  const {
    title,
    overview,
    budget,
    revenue,
    tagline,
    status,
    vote_average,
    vote_count,
    backdrop_path,
    poster_path,
  } = detail;
  return (
    <>
      <div className="detail-movie">
        <div className="poster-c">
          <img
            src={backdrop_path ? `${img}/${backdrop_path}` : defaultImg}
            alt={title}
          />

          <FaChevronLeft className="left" onClick={goBack} />
          <div>
            <h2>{title}</h2>
            <p>"{tagline ? tagline : ''}"</p>
          </div>
        </div>
        <div className="embed-container">
          <div className="text">
            <h2> Watch Trailer</h2>
            {expandTrailer ? (
              <FaChevronDown className="down" onClick={handleTrailer} />
            ) : (
              <FaChevronUp className="down" onClick={handleTrailer} />
            )}
          </div>
          <iframe
            className="iframe"
            ref={frameRef}
            src={`https://www.youtube.com/embed/${videos}`}
            frameborder="0"
            allowfullscreen
          />
        </div>

        <section className="artist-container">
          <div className="text">
            <h2>Casters</h2>{' '}
            {expandCaster ? (
              <FaChevronDown className="down" onClick={handleCaster} />
            ) : (
              <FaChevronUp className="down" onClick={handleCaster} />
            )}
          </div>
          <div className="caster-list" ref={casterRef}>
            {artist.map((art) => {
              return <Artist {...art} />;
            })}
          </div>
        </section>

        <section className="movie-report">
          <img src={poster_path ? `${img}/${poster_path}` : defaultImg} />
          <div>
            <h3>{title}</h3>
            <p>{overview}</p>
            <p>budget : ${budget ? budget : 'Unknown'}</p>
            <p>revenue : ${revenue ? revenue : 'Unknown'}</p>
            <p>status : {status}</p>
            <p>{vote_average} / 10</p>
            <p>Rated by {vote_count} people</p>
          </div>
        </section>
      </div>
    </>
  );
}

export default MovieDetail;
