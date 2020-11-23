import React, { Component } from "react";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
    this.toDays=this.toDays.bind(this);
  }

  componentDidMount() {
    fetch("/api/rankinglist")
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
  } 

  toDays(ndd){
    const daysArr=['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
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
                return days;
  }
  render() {
    console.log(this.state.data);
    return (
      <div>
        <h1>Ranking List:</h1>
        <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Address</th>
            <th>Days Open</th>
            <th>Opening Time</th>
            <th>Closing Time</th>
            <th>Distance(Kms)</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
        {this.state.data.map(x=>(
         <tr key={x.id}>
          <td>{x.rank}</td>
          <td>{x.name}</td>
          <td>{x.address}</td>
          <td>{this.toDays(x.non_del_days)}</td>
          <td>{x.timings_open}</td>
          <td>{x.timings_closed}</td>
          <td>{x.dist.toFixed(3)}</td>
          <td>{x.score.toFixed(3)}</td>
         </tr> 
        ))}
        </tbody>
        </table>
      </div>
    );
  }
}

export default List;