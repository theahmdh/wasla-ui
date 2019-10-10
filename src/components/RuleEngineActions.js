import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class RuleEngineActions extends Component {

    // onClickActions = (state) => {
    //     console.log('Actions Clicked');
    //     //console.log(state.target.id);
    //     var clickedRule = this.state.rules.filter( rule => rule.ID == state.target.id);
    //     console.log(clickedRule);
    //     var operator = Object.keys(clickedRule[0].Conditions);
    //     console.log(operator.toString());
    //     var ruleConditions = clickedRule[0].Conditions[operator];
    //     console.log(ruleConditions);
        
    // };    

    render() {
        var userRule = this.props.location.state.rule;
        console.log('RuleENgineActions');
        console.log(userRule);
        return (
          <div className="popup">
            <div className="card text-center popup_inner">
              <div className="card-header font-weight-bold">{userRule.RuleName}</div>
              <div className="card-body">
              <h5 className="card-title">Conditions</h5>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li>
                </ul>
                <h5 className="card-title mt-3">Actions</h5>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li>
                </ul>
              </div>
              <div className="card-footer text-muted"><Link className="btn btn-primary" to='/rules'>Back</Link></div>
            </div>
          </div>
        );
    }
}


//style={{ position: "absolute", width: '50%', height:'600px', left: '25%', top:'25%', backgroundColor:'rgba(0, 0, 0, 1)'}}