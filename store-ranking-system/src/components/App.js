import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import Onboarding from "./leads/Onboarding";
import Form from "./leads/Form";
import LockersList from './LockersList';
import Buttons from "./Buttons";
import Results from "./Results";
import { Link } from 'react-router-dom'
import List from './List';
import {BrowserRouter as Router,Switch,Route,withRouter} from "react-router-dom";
class App extends Component {
  searchbyaddress=(address) =>{
    console.log(address)
  }
  searchbyzip=(zip) =>{
    console.log(zip)
  }
  searchbylandmark=(landmark) =>{
    console.log(landmark)
  }
  searchbylockername=(lockername) =>{
    console.log(lockername)
  }
  queryby=(query) =>{
    
    console.log(query)
  }
  render() {
    return (
      <Router>
        <Fragment>
          <div className="container">
          
          <Route path="/" component={Buttons}/>

            <Route path="/search" component={() => <Form
              searchbyaddress={this.searchbyaddress}
              searchbyzip={this.searchbyzip}
              searchbylandmark={this.searchbylandmark}
              searchbylockername={this.searchbylockername}
              queryby={this.queryby}
              />}/>
             
              <Route path="/search/listview" component={List}/>

              <Route path="/onboard" component={() => <Onboarding
                searchbyaddress={this.searchbyaddress}
                searchbyzip={this.searchbyzip}
                searchbylandmark={this.searchbylandmark}
                searchbylockername={this.searchbylockername}
                queryby={this.queryby}
                />}/>

                <Route path="/onboard/results" component={Results}/>
          </div>
        </Fragment>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
