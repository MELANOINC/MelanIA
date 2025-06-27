import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Activar from './pages/activar';
import MelaniaFlow from './components/MelaniaFlow';
import IrresistibleOffer from './components/IrresistibleOffer';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/activar" component={Activar} />
        <Route path="/melania_flow" component={MelaniaFlow} />
        <Route path="/irresistible_offer" component={IrresistibleOffer} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;
