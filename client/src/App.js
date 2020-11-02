import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Container } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import './App.css';

import MenuBar from './components/MenuBar';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import Login from './components/pages/Login';


function App() {
  return (
   <Container>
      <Router>
      <MenuBar/>
       <Route exact path='/' component={Home} />
       <Route exact path='/login' component={Login}/>
       <Route exact path='/register' component={Register}/>
    </Router>
   </Container>
  );
}

export default App;
