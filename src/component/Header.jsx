import React, { useState } from 'react';
import './Header.scss';
import { IoSearchSharp } from 'react-icons/io5';
import { GiFilmProjector } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useGlobalContext } from '../context';

function Header() {
  const [query, setQuery] = useState('');
  const { setSearchUrl } = useGlobalContext();
  const history = useHistory();

  const searchMovie = (e) => {
    e.preventDefault();
    const data = `https://api.themoviedb.org/3/search/movie?api_key=96088fe5524927c1934d3da46fce32da&query=${query}`;

    if (query !== '') {
      setSearchUrl(data);
      history.push('/search');
    }

    setQuery('');
  };
  const setInputData = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  return (
    <header className="header">
      <div className="logo">
        <GiFilmProjector onClick={() => history.push('/')} />{' '}
      </div>
      <nav className="navbar">
        <Link to="/">
          <a href="">Home</a>
        </Link>
      </nav>
      <div>
        <IoSearchSharp className="search-icon" />
        <form onSubmit={searchMovie}>
          <input
            onChange={setInputData}
            type="text"
            placeholder=" Search Movie"
            value={query}
          />
        </form>
      </div>
    </header>
  );
}

export default Header;
