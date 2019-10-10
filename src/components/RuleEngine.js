import React, { Component } from 'react'
import { Link } from "react-router-dom";
import DataTable , { memoize } from 'react-data-table-component'
import myConfig from '../config'
import RuleEngineActions from './RuleEngineActions';
import RuleEngineCondition from './RuleEngineCondition';
import EditRule from './EditRule';
import AddRule from './AddRule';


const OptionsMenu = ({ row }) => (
  <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
    <input type="button" onClick={console.log(row)} className="btn btn-sm btn-dark" value="view"/>
    <input type="button" onClick={console.log(row)} className="btn btn-sm btn-dark" value="edit"/>
    <input type="button" onClick={console.log(row)} className="btn btn-sm btn-dark" value="copy"/>
    <input type="button" onClick={console.log(row)} className="btn btn-sm btn-dark" value="delete"/>
  </div>
);

// const columns = memoize((clickHandler1, clickHandler2  )=> [
//     {
//         name: 'ID',
//         selector: 'ID',
//         sortable: true,
//         width:'50px'
//     },
    
//     {
//       name: 'RuleName',
//       selector: 'RuleName',
//       sortable: true,
//       width:'500px'
//     },
//     {
//         name: 'Category',
//         selector: 'RuleCategory',
//         sortable: true,
//     },
//     {
//         name: 'Status',
//         selector: 'Active',
//         sortable: true,
//         cell: row => row.Active == true ? 'Active' : 'Inactive' 
//         //format: function(row)  {row.active == '1' ? 'Active' : 'Inactive' },
//     },
//     {
//         cell:(row) => <button className="btn btn-sm btn-outline-primary" onClick={clickHandler1} id={row.ID}>Conditions</button>,
//         ignoreRowClick: true,
//         allowOverflow: true,
//         button: true,
//       },
//       {
//           //cell:(row) => <button className="btn btn-sm btn-outline-success" onClick={clickHandler2} id={row.ID}>Actions</button>,
//           cell:(row) => <Link className="btn btn-sm btn-outline-success" id={row.ID} to={{ pathname: `/ruleactions`, state: { rule: row } }}>Actions</Link>,
//           ignoreRowClick: true,
//           allowOverflow: true,
//           button: true,
//       },
//   ]);

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
              name: 'RuleName',
              selector: 'RuleName',
              sortable: true,
              width:'500px'
            },
            {
              name: 'isActive',
              selector: 'Active',
              cell: (row) => {
                console.log(row.Active)
                return (
                  <input type="checkbox" className="checkbox" defaultChecked= {row.Active}  disabled/>
                );
              }
            },
            {
                name: 'Category',
                selector: 'RuleCategory',
                sortable: true,
            },
            // {                
            //     button: true,
            //     cell: (row) => <input type="button" onClick={this.togglePopup.bind(this, row)} className="btn btn-sm btn-dark" value="view"/>,
            //     ignoreRowClick: true,
            // },
            {                
              button: true,
              cell: (row) => <input type="button" onClick={this.editRule.bind(this, row)} className="btn btn-sm btn-primary" value="edit"/>,
              ignoreRowClick: true,
          },
            // {
            //   name: 'options',
            //   cell: (row) => <OptionsMenu row={row} />,              
            // }
          ],
          selectedRow: null,
          showPopup: false,
          showEditDialog: false,
          showAddDialog: false
    }

    getRules = () => {
        const backend = myConfig.Backend;
        fetch(`${backend}/Rules`)
          .then(res => res.json())
          .then(data => {
            //console.log(data.rows)
            this.setState({
                rules: data.rows,
            });
          });
      };
    
      editRule = (row) => {
        this.setState({
          showEditDialog: !this.state.showEditDialog,
          selectedRow: row
        });   
      }

      AddRule = () => {
        this.setState({
          showAddDialog: !this.state.showAddDialog,
          //selectedRow: row
        });   
      }
    
    componentDidMount(){
    this.getRules();
    }

    togglePopup(row) {
        this.setState({
          showPopup: !this.state.showPopup,
          selectedRow: row
        });        
        //console.log('RuleEngine');
        //console.log(this.state.selectedRow);
      }

    render() {
       const Button = () => (
        <button type="button" className="btn btn-sm btn-success btn-submit" onClick={this.AddRule}>+ Add</button>
      );
      const actions = <Button key="add" flat secondary iconChildren="add">Add</Button>;
        if(this.state.rules.length > 0){
        return (
          <div className="container" style={{ height: '100%' }}>
            <div className="row h-100">
          <div className="col-lg-12 h-100">
            <DataTable style={{ height: '100%' }}
              title="Rule Base"
              columns={this.state.columns}
              //columns={columns(this.onClickConditions, this.onClickActions)}
              data={this.state.rules}
              fixedHeader
              fixedHeaderScrollHeight="300px"
              pagination
              //selectableRows
              highlightOnHover
              actions = {actions}
            />
            {this.state.showEditDialog ? (
              <EditRule closePopup={this.editRule.bind(this)} rule={this.state.selectedRow} reloadRules={this.getRules}/>
            ) : null}
            {this.state.showAddDialog ? (
              <AddRule closePopup={this.AddRule.bind(this)} reloadRules={this.getRules}/>
            ) : null}
            
          </div>
          {/* <div className="col-lg-1" id="ruleDetails">
            
          {this.state.showPopup ? (
              <RuleEngineCondition closePopup={this.togglePopup.bind(this)} rule={this.state.selectedRow}/>
            ) : null}
          
          </div> */}
          </div>
          </div>
        );
        }
        else{return(<div>Loading..</div>)}
    }
}
