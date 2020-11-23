import React, { Component } from 'react';
import Axios from "axios";
import {withRouter} from 'react-router-dom';

export class Onboarding extends Component {        
    state={
        address:'',
        zip:'',
        lockername:'',
        no_of_lockers:'',
        Availability: [
            {id: 1, value: "Monday", isChecked: false},
            {id: 2, value: "Tuesday", isChecked: false},
            {id: 3, value: "Wednesday", isChecked: false},
            {id: 4, value: "Thursday", isChecked: false},
            {id: 5, value: "Friday", isChecked: false},
            {id: 6, value: "Saturday", isChecked: false},
            {id: 7, value: "Sunday", isChecked: false}

          ],
        start_time:'07:00',
        end_time:'22:00',
        rating:'2.5',
        throughput:'56',
        lat:'',
        lng:'',
        daystring:''
        

    }
    
    onSubmit=(e)=>{
        e.preventDefault();
        this.props.searchbyaddress(this.state.address);
        this.props.searchbyzip(this.state.zip);
        this.props.searchbylockername(this.state.lockername);
        this.props.queryby(this.state.query);
        //if(!this.state.address || !this.state.zip || !this.state.lockername || !this.state.no_of_lockers )
        
        if(this.state.address)
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
        
        console.log("123456789")
        
        
        }
   onpost=()=>{
     /*  if(this.state.lat && this.state.lng){
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
    }*/
    if(true){
        let string=''
        let Availability=this.state.Availability
        Availability.forEach(avail=>{
            if(avail.isChecked==true)
            string+='1'
            else
            string+='0'
        })
        console.log(string)
        this.setState({daystring:string})
        
        let data = JSON.stringify({
            'address':this.state.address,
            'zipcode':this.state.zip,
            'lockername':this.state.lockername,
            'num_of_locker':this.state.no_of_lockers,
            'daystring':this.state.daystring,
            'start_time':this.state.start_time,
            'end_time':this.state.end_time,
            'lattitude':(this.state.lat),
            'longitude':(this.state.lng)
        })
        console.log(data)
        Axios.post("/api/onboard/", data, {
            headers: {
                'Content-Type': 'application/json',
            }})
            .then(res => {console.log(res);})
            .catch(error => console.error(error))
            console.log("hello");
   }
}
    onSiteChanged=(e) => this.setState({ query: e.target.value});
    onChangeadd=(e)=>this.setState({address:e.target.value});
    onChangezip=(e)=>this.setState({zip:e.target.value});
   // onChangeland=(e)=>this.setState({landmark:e.target.value});
    onChangelocker=(e)=>this.setState({lockername:e.target.value});
    onChangenumberoflocker=(e)=>this.setState({no_of_lockers:e.target.value});
    onChange_start_time=(e)=>this.setState({start_time:e.target.value});
    onChange_end_time=(e)=>this.setState({end_time:e.target.value});
    handleCheck=(e)=>{
        let Availability=this.state.Availability
        Availability.forEach(avail=>{
            if(avail.value==event.target.value)
            avail.isChecked=event.target.checked
        })
        this.setState({Availability:Availability})
    }

    nextPath(path) {
        this.props.history.push(path);
      }

      
    render() {
        return (
          <div>
              
              <form align="left" onSubmit={this.onSubmit} >
                  <div>
              <div style={{color:'orange'}}>
                  <h3><b>Onboard a Locker</b></h3>
              </div>
             
              Please enter the Locker details
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
                            <select name="country" id="country1">
                                <option value="India">
                                    India
                                </option>
                            </select>
                          </td>
                      </tr>
                      
                      <tr>
                          <td align="left" vlign="top">
                                   <b>Address:</b>
                          </td>
                          <td valign="top">
                              <input type="text" name="address" maxLength="50" value={this.state.address} onChange={this.onChangeadd} onClick={()=>this.state.query="address"} /><br/>
                            <font size="1">e.g. Plot No–M 03, Sector 18, Noida</font> 
                           
                                                       
                          </td>
                      </tr>
                      <tr>
                          <td align="left" vlign="top">
                                  <b>Zip Code:</b>
                          </td>
                          <td valign="top">
                              <input type="text" name="storeZip" size="6" maxLength="6" value={this.state.zip} onChange={this.onChangezip} onClick={()=>this.state.query="storeZip"} />
                            <font size="1">&nbsp;e.g. 201301</font><br/>
                            
                                                       
                          </td>
                      </tr>
                      <tr>
                          <td align="left" vlign="top">
                              <b>Locker Name:</b>
                          </td>
                          <td valign="top">
                              <input type="text" name="storeName" size="30" maxLength="50" value={this.state.lockername} onChange={this.onChangelocker}  onClick={()=>this.state.query="lockername"}/><br/>
                            <font size="1">&nbsp;e.g. Shipra</font>
                            
                                                       
                          </td>
                      </tr>
                      <tr>
                          <td align="left" vlign="top">
                              <b>Number of Lockers:</b>
                          </td>
                          <td valign="top">
                              <input type="text" name="numoflockers" size="2" maxLength="2" value={this.state.no_of_lockers} onChange={this.onChangenumberoflocker} onClick={()=>this.state.query="landmark"}/><br/>
                            <font size="1">&nbsp;e.g. 30</font>
                            
                                                       
                          </td>
                      </tr>
                      <tr>
                          <td align="left" vlign="top">
                              <b>Availability</b>
                          </td>
                          <td valign="top">
                              <div>
                              <input type="checkbox" key="1" id="Monday" name="Monday"   value="Monday" onChange={this.handleCheck}/>&nbsp;
                                <label ><font size="2">Monday</font></label>
                                &nbsp;&nbsp;
                                <input type="checkbox" key="2" id="Tuesday" name="Tuesday"   value="Tuesday" onChange={this.handleCheck} />&nbsp;
                                <label ><font size="2">Tuesday</font></label>
                                &nbsp;&nbsp;
                                <input type="checkbox" key="3" id="Wednesday" name="Wednesday"   value="Wednesday" onChange={this.handleCheck} />&nbsp;
                                <label ><font size="2">Wednesday</font></label>
                                &nbsp;&nbsp;
                                <input type="checkbox" key="4" id="Thursday" name="Thursday"   value="Thursday" onChange={this.handleCheck} />&nbsp;
                                <label ><font size="2">Thursday</font></label>
                                &nbsp;&nbsp;
                                <input type="checkbox" key="5" id="Friday" name="Friday"   value="Friday" onChange={this.handleCheck} />&nbsp;
                                <label ><font size="2">Friday</font></label>
                                &nbsp;&nbsp;
                                <input type="checkbox" key="6" id="Saturday" name="Saturday"   value="Saturday" onChange={this.handleCheck}/>&nbsp;
                                <label ><font size="2">Saturday</font></label>
                                &nbsp;&nbsp;
                                <input type="checkbox" key="7" id="Sunday" name="Sunday"   value="Sunday" onChange={this.handleCheck} />&nbsp;
                                <label ><font size="2">Sunday</font></label>

                                </div>
                                                       
                          </td>
                      </tr>
                      <tr>
                          <td align="left" vlign="top">
                              <b>Timings</b>
                          </td>
                          <td valign="top">
                              <input type="time"  defaultValue="07:00" onChange={this.onChange_start_time}/>
                              &nbsp;to&nbsp;
                              <input type="time"  defaultValue="22:00" onChange={this.onChange_end_time}/>

                            
                                                       
                          </td>
                      </tr>

                      <tr>
                          <td>
                              <br/>
                              <button type="submit" style={{background: 'orange',borderRadius:'8px'}} onClick={() => this.nextPath('/onboard/results')}>
                                 Submit
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

export default withRouter(Onboarding)
