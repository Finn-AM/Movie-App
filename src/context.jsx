import React, { useState, useContext } from 'react';

const AppContext = React.createContext();

export function AppProvider({ children }) {
  const [url, setUrl] = useState('');
  const [artistUrl, setArtistUrl] = useState('');
  const [videos, setVideos] = useState('');
  const [searchUrl, setSearchUrl] = useState('');

  return (
    <AppContext.Provider
      value={{
        url,
        setUrl,
        artistUrl,
        setArtistUrl,
        videos,
        setVideos,
        searchUrl,
        setSearchUrl,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(AppContext);
};
