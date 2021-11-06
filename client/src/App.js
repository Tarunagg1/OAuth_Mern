import { Container } from '@material-ui/core';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './coponents/Home/Home';
import Auth from './coponents/Auth/Auth';
import PostDetails from './coponents/PostDetails/PostDetails';
import Navbar from './coponents/navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <Container maxWidth="large">
      <Navbar />
      <ToastContainer />
      <Switch>
        <Route path="/" exact component={() => <Redirect to="/posts" />} />
        <Route path="/posts" exact component={Home} />
        <Route path="/posts/search" exact component={Home} />
        <Route path="/posts/:id" exact component={PostDetails} />
        <Route path="/auth" exact component={Auth} />
      </Switch>
    </Container>
  );
}

export default App;
