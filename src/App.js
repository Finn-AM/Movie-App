import './App.css';
import Movie from './Movie';
import Header from './Header';
import Error from './Error';
import Parallax from './Parallax';
import MovieDetail from './MovieDetail';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MovieDatas from './MovieDatas';
import Search from './Search';

function App() {
  return (
    <>
      <BrowserRouter>
        <Parallax />
        <Header />
        <Switch>
          <Route path="/" exact component={Movie} />
          <Route path="/detail" exact component={MovieDetail} />
          <Route path="/search" exact component={Search} />
          <Route path="/" component={Error} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
