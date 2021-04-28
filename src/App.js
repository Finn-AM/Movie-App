import './App.css';
import Movie from './component/Movie';
import Header from './component/Header';
import Error from './component/Error';
import Parallax from './component/Parallax';
import MovieDetail from './component/MovieDetail';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './component/Search';

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
