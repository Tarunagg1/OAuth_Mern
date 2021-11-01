import { Container } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import Home from './coponents/Home/Home';
import Auth from './coponents/Auth/Auth';
import Navbar from './coponents/navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <Container maxWidth="large">
      <Navbar />
      <ToastContainer />
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/auth" exact={true} component={Auth} />

      </Switch>
    </Container>
  );
}

export default App;
