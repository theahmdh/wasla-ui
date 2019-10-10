import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import RuleEngine from "./components/RuleEngine";
import Home from "./components/Home";
import RuleEngineCondition from "./components/RuleEngineCondition";
import RuleEngineActions from "./components/RuleEngineActions";
import Customers from './components/Customers';
import EngineExecutions from "./components/EngineExecutions";
import Settings from "./components/Settings";
import "./App.css";
import "./css/bootstrap.css";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Header />
          <div className="container-fluid h-100">
            <Switch>
              <Route path="/rules" component={RuleEngine} />
              <Route path="/home" component={Home} />
              <Route path="/customers" component={Customers} />
              <Route path="/ruleconditions" component={RuleEngineCondition} />
              <Route path="/ruleactions" component={RuleEngineActions} />
              <Route path='/engineExecs' component={EngineExecutions}/>
              <Route path='/settings' component={Settings}/>
              <Redirect from="/" exact to="/home" />
              <Redirect to="/notFound" />
            </Switch>
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
