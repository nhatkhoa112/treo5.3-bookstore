import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFoundPage from './pages/404Page';
import BookDetailPage from './pages/BookDetailPage';
import FavoriteBookPage from './pages/FavoriteBookPage';
import HomePage from './pages/HomePage';
import SearchBook from './pages/SearchBook';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route exact path="/books/:id" component={BookDetailPage} />
        <Route exact path="/favorite" component={FavoriteBookPage} />
        <Route exact path="/search" component={SearchBook} />
        <Route exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  )
}

export default App;
