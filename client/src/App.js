import Create from './views/create/create.component';
import Detail from './views/detail/detail.component';
import Home from './views/home/home.component';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
      <Route exact path = "/home" component={Home}/>
      <Route path = "/home/:id" component={Detail}/>
      <Route path = "/create" component={Create}/>
    </div>
    </Router>
  );
}

export default App;
