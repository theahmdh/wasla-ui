import React, { Component } from "react";
import DataTable  from 'react-data-table-component'
import myConfig from "../config";

export default class EngineExecutions extends Component {
    state = {
        engineExecs: [],
        columns: [
          {
            name: '#',
            selector: 'ID',
            sortable: false,
            width: '50px'
          },
          {
            name: 'Timestamp',
            selector: 'Timestamp',
            sortable: true,
          },
          {
            name: 'CustomerID',
            selector: 'CustomerID',
            sortable: true,
          },
          {
            name: 'Result',
            selector: 'Result',
            sortable: true,
          },
        ]
      }; //"ID":1,"Timestamp":"2019-10-09T22:29:34.735Z","CustomerID":102,"Result":"
    
      getEngineExecutions = () => {
        const backend = myConfig.Backend;
        fetch(`${backend}/execs`)
          .then(res => res.json())
          .then(data => {
            console.log(data.rows);
            this.setState({
              engineExecs: data.rows
            });
          });
      };
    
      componentDidMount() {
        this.getEngineExecutions();
      }

    render() {
        var engineExecs = this.state.engineExecs;
        if (engineExecs) {
          return (<DataTable style={{ height: '100%' }}
            title="Engine Executions"
            columns={this.state.columns}
            //columns={columns(this.onClickConditions, this.onClickActions)}
            data={engineExecs}
            fixedHeader
            fixedHeaderScrollHeight="300px"
            pagination
            //selectableRows
            highlightOnHover
            //actions = {actions}
          />)
        } else {
          return <div>Loading..</div>;
        }
      }
}
