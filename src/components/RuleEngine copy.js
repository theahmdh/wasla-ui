import React, { Component } from 'react'
import { Link } from "react-router-dom";
import DataTable , { memoize } from 'react-data-table-component'
import myConfig from '../config'

const Button = () => (
    <button type="button" className="btn btn-sm btn-dark">View</button>
  );
const actions = <Button key="add" flat secondary iconChildren="add">Add</Button>;

const columns = memoize((clickHandler1, clickHandler2  )=> [
    {
        name: 'ID',
        selector: 'ID',
        sortable: true,
        width:'50px'
    },
    
    {
      name: 'RuleName',
      selector: 'RuleName',
      sortable: true,
      width:'500px'
    },
    {
        name: 'Category',
        selector: 'RuleCategory',
        sortable: true,
    },
    {
        name: 'Status',
        selector: 'Active',
        sortable: true,
        cell: row => row.Active == true ? 'Active' : 'Inactive' 
        //format: function(row)  {row.active == '1' ? 'Active' : 'Inactive' },
    },
    {
        cell:(row) => <button className="btn btn-sm btn-outline-primary" onClick={clickHandler1} id={row.ID}>Conditions</button>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
      {
          //cell:(row) => <button className="btn btn-sm btn-outline-success" onClick={clickHandler2} id={row.ID}>Actions</button>,
          cell:(row) => <Link className="btn btn-sm btn-outline-success" id={row.ID} to={{ pathname: `/ruleactions`, state: { rule: row } }}>Actions</Link>,
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
      },
  ]);

export default class RuleEngine extends Component {
    
    onClickActions = (state) => {
        console.log('Actions Clicked');
        //console.log(state.target.id);
        var clickedRule = this.state.rules.filter( rule => rule.ID == state.target.id);
        console.log(clickedRule);
        var operator = Object.keys(clickedRule[0].Conditions);
        console.log(operator.toString());
        var ruleConditions = clickedRule[0].Conditions[operator];
        console.log(ruleConditions);
        
    };

    onClickConditions = (state) => {
        console.log('Conditions Clicked');
        console.log(state.target.id);
    };

    state = {
        rules: [],
        columns: [
            {
                name: 'ID',
                selector: 'ID',
                sortable: true,
                width:'50px'
            },
            {
              name: 'RuleName',
              selector: 'RuleName',
              sortable: true,
              width:'500px'
            },
            {
                name: 'Status',
                selector: 'Active',
                sortable: true,
                cell: row => row.Active == true ? 'Active' : 'Inactive'
            },
            {
                name: 'Category',
                selector: 'RuleCategory',
                sortable: true,
            },
            {
                name: 'Conditions',
                button: true,
                headerClassName: 'text-left',
                cell: (row) => <button onClick={this.handleButtonClick(row)} className="btn btn-sm btn-dark">view</button>,
                ignoreRowClick: true,
            },
            {
                name: 'Actions',
                button: true,
                cell: (row) => <button onClick={this.handleButtonClick(row)} className="btn btn-sm btn-dark">view</button>,
                ignoreRowClick: true,
            },
          ],
    }

    getRules = () => {
        const backend = myConfig.Backend;
        fetch(`${backend}/Rules`)
          .then(res => res.json())
          .then(data => {
            console.log(data.rows)
            this.setState({
                rules: data.rows,
            });
          });
      };
    
    componentDidMount(){
    this.getRules();
    }

    render() {
        if(this.state.rules.length > 0){
        return (
            <div className="">
                <DataTable title="Rule Base" 
                //columns={this.state.columns} 
                columns={columns(this.onClickConditions, this.onClickActions)}
                data={this.state.rules}
                    fixedHeader fixedHeaderScrollHeight="300px" 
                    pagination
                    //selectableRows
                    highlightOnHover
                    //actions = {actions}
                />
            </div>
        )
        }
        else{return(<div>Loading..</div>)}
    }
}
