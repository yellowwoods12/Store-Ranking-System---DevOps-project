import React, { Component } from "react";

class LockersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      data1:[],
      loaded: false,
      loaded1:false,
      placeholder: "Loading"
    };
  }

  componentDidMount() {
    fetch("api/availability")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        this.setState(() => {
          return {
            data,
            loaded: true
          };
        });
      });
      fetch("api/onboard")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data1 => {
        this.setState(() => {
          return {
            data1,
            loaded1: true
          };
        });
      });
  }

  render() {
    const daysArr=['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
    return (
      <div>
      <table>
      <ol>
        {this.state.data1.map(locker => {
          return (
            <tr>
            <li key={locker.id}>
            <td style={{width: 500}}><h3 >{locker.name} <br/> {locker.address}</h3></td>
              {this.state.data.map(lockerA => {
                if(locker.lockerid===lockerA.lockerid){
                const ndd=lockerA.non_del_days;
                var days='';
                var i=0;
                while(ndd[i]=='0' && i<7)
                  i+=1;
                if(i<7)
                  days+= daysArr[i];
                if(i+1<7){
                  if(ndd[i+1]=='1'){
                    days+='-';
                  }
                }
                for(var i=i+1;i<7;i+=1){
                  if(i+1<7 && ndd[i]=='1'){
                      if(ndd[i-1]=='0' && ndd[i+1]=='0'){
                        days+=',';
                        days+=daysArr[i];
                      }
                      else if(ndd[i-1]=='0' && ndd[i+1]=='1'){
                        days+=",";
                        days+=daysArr[i];
                        days+='-';
                      }
                      else if(ndd[i-1]=='1' && ndd[i+1]=='0'){
                        days+=daysArr[i];
                      }
                  }
                  else if(ndd[i]=='1'){
                    if(ndd[i-1]=='0'){
                      days+=',';
                      days+=daysArr[i];
                    }
                    else{
                      days+=daysArr[i];
                    }
                  }
                }
                return (
                  <td style={{width: 200}}><h4 style={{color: "orange"}}>
                  {days} <br/>
                  {lockerA.timings_open} - {lockerA.timings_closed}
                  </h4></td>
                );
                }
              })}
            </li>
            </tr>
          );
        })}
      </ol>
      </table>
      </div>
    );
  }
}

export default LockersList;