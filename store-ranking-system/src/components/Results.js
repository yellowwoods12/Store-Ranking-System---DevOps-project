import React, { Component } from 'react';
import Axios from "axios";
import {withRouter} from 'react-router-dom';

export class Results extends Component {        

    nextPath(path) {
        this.props.history.push(path);
      }


    render() {
        return (
          <div>

                  <h4><b>Thanks for Onboarding!!</b></h4>

          </div>
        )

    }
}

export default withRouter(Results)