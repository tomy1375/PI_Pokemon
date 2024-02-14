import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/navbar.component';
import Landing from './views/landing/landing.component';
import Home from './views/home/home.component';
import Detail from './views/detail/detail.component';
import Create from './views/create/create.component';
import About from './views/about/about.component';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar solo se renderizará en las rutas que lo necesitas */}
        <Route path={["/home", "/detail", "/create","/about"]} component={Navbar} />

        <Route exact path="/home" component={Home} />
        <Route exact path="/" component={Landing} />
        <Route path="/home/:id" component={Detail} />
        <Route path="/create" component={Create} />
        <Route path="/about" component={About} />

        
      </div>
    </Router>
  );
}

export default App;
