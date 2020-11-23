import React, { Component } from 'react';
import Axios from "axios";
import {withRouter} from 'react-router-dom';

export class Form extends Component {        
    state={
        address:'',
        zip:'',
        landmark:'',
        lockername:'',
        query:'',
        lat:'',
        lng:'',
        
        

    }
    
    onSubmit=(e)=>{
        e.preventDefault();
        this.props.searchbyaddress(this.state.address);
        this.props.searchbyzip(this.state.zip);
        this.props.searchbylandmark(this.state.landmark);
        this.props.searchbylockername(this.state.lockername);
        this.props.queryby(this.state.query);
        
        if(this.state.query=="address" && this.state.address)
        {
            let u=this.state.address
            const response = fetch(`https://api.opencagedata.com/geocode/v1/json?q=${u}&key=27a5cac087534b4ea0d06b147273f65a`)
            .then(response => response.json())
            .then((commit)=>{
            console.log(commit);
             this.setState({lat:commit.results[0].geometry.lat});
            this.setState({lng:commit.results[0].geometry.lng});
            this.onpost();
              }
                 )
    
   
              console.log(response)
              
        }
        if(this.state.query=="storeZip" && this.state.zip )
        {
            let u=this.state.zip
            const response = fetch(`https://api.opencagedata.com/geocode/v1/json?q=${u}&key=27a5cac087534b4ea0d06b147273f65a`)
             .then(response => response.json())
             .then((commit)=>{
               console.log(commit);
               this.setState({lat:commit.results[0].geometry.lat});
              this.setState({lng:commit.results[0].geometry.lng});
              this.onpost();
  
       
    }
    
      )
      console.log(response)
        }
        if(this.state.query=="landmark" && this.state.landmark)
        {
            let u=this.state.landmark
            const response = fetch(`https://api.opencagedata.com/geocode/v1/json?q=${u}&key=27a5cac087534b4ea0d06b147273f65a`)
            .then(response => response.json())
            .then((commit)=>{
             console.log(commit);
            this.setState({lat:commit.results[0].geometry.lat});
            this.setState({lng:commit.results[0].geometry.lng});
            this.onpost();
  
       
    }
    
      )
      console.log(response)
        }
        console.log("123456789")
        
        
        }
   onpost=()=>{
       if(this.state.lat && this.state.lng){
    let data = JSON.stringify({
        'addressfield':this.state.address,
        'zipfield':this.state.zip,
        'landmarksfield':this.state.landmark,
        'lockerfield':this.state.lockername,
        'query':this.state.query,
        'lattitude':(this.state.lat),
        'longitude':(this.state.lng),

    })

    Axios.post("/api/leads/", data, {
        headers: {
            'Content-Type': 'application/json',
        }})
        .then(res => {console.log(res);location.reload(true);})
        .catch(error => console.error(error))
        console.log("hello");
    }
   }
    onSiteChanged=(e) => this.setState({ query: e.target.value});
    onChangeadd=(e)=>this.setState({address:e.target.value});
    onChangezip=(e)=>this.setState({zip:e.target.value});
    onChangeland=(e)=>this.setState({landmark:e.target.value});
    onChangelocker=(e)=>this.setState({lockername:e.target.value});

    nextPath(path) {
        this.props.history.push(path);
      }

      
    render() {
        return (
          <div>
              
              <form align="left" onSubmit={this.onSubmit} >
                  <div>
              <div style={{color:'orange'}}>
                  <h3><b>Search for a new Amazon Pickup Location</b></h3>
              </div>
              Amazon Pickup locations offer package pickup at self-service Amazon Lockers and at staffed locations.
              <br/>
              Please enter address, postal code, landmark, or Amazon Locker name.
              <br/>
              </div>
              <div>
                  <table cellSpacing="2" cellPadding="2">
                      <tbody>
                      <tr>
                          <td colspac="2">
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <b> Country/Region:</b>
                          </td>
                          <td>
                            <select name="country" id="country">
                                <option value="India">
                                    India
                                </option>
                            </select>
                          </td>
                      </tr>
                      
                      <tr>
                          <td align="left" vlign="top">
                              <input type="radio" name="searchCriteria" value="address"  onChange={this.onSiteChanged} checked={this.state.query=="address"}/>&nbsp;
                              <b>Search by Address:</b>
                          </td>
                          <td valign="top">
                              <input type="text" name="address" maxLength="50" value={this.state.address} onChange={this.onChangeadd} onClick={()=>this.state.query="address"} /><br/>
                            <font size="1">e.g. Plot No–M 03, Sector 18, Noida</font> 
                           
                                                       
                          </td>
                      </tr>
                      <tr>
                          <td align="left" vlign="top">
                              <input type="radio" name="searchCriteria" value="storeZip" onChange={this.onSiteChanged} checked={this.state.query=="storeZip"}/>&nbsp;
                              <b>Search by Zip Code:</b>
                          </td>
                          <td valign="top">
                              <input type="text" name="storeZip" size="6" maxLength="6" value={this.state.zip} onChange={this.onChangezip} onClick={()=>this.state.query="storeZip"} />
                            <font size="1">&nbsp;e.g. 201301</font><br/>
                            
                                                       
                          </td>
                      </tr>
                      <tr>
                          <td align="left" vlign="top">
                              <input type="radio" name="searchCriteria" value="landmark" onChange={this.onSiteChanged} checked={this.state.query=="landmark"}/>&nbsp;
                              <b>Search by Landmark:</b>
                          </td>
                          <td valign="top">
                              <input type="text" name="landmark" size="30" maxLength="50" value={this.state.landmark} onChange={this.onChangeland} onClick={()=>this.state.query="landmark"}/><br/>
                            <font size="1">&nbsp;e.g. Ghaziabad</font>
                            
                                                       
                          </td>
                      </tr>
                      <tr>
                          <td align="left" vlign="top">
                              <input type="radio" name="searchCriteria" value="storeName" onChange={this.onSiteChanged} checked={this.state.query=="lockername"}/>&nbsp;
                              <b>Search by Locker or Store Name:</b>
                          </td>
                          <td valign="top">
                              <input type="text" name="storeName" size="30" maxLength="50" value={this.state.lockername} onChange={this.onChangelocker}  onClick={()=>this.state.query="lockername"}/><br/>
                            <font size="1">&nbsp;e.g. Shipra</font>
                            
                                                       
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <br/>
                              <button type="submit" value="Submit" style={{background: 'orange',borderRadius:'8px'}} onClick={() => this.nextPath('/search/listview') }>
                                 Search
                               </button>
                               <br/><br/>
                          </td>
                          <td colSpan="2">&nbsp;</td>
                      </tr>
                      
                      
                      </tbody>
                  </table>
              </div>

              </form>
              
          </div>
        )
        
    }
}

export default withRouter(Form)
