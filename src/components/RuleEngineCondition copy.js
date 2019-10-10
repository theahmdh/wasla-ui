import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class RuleEngineCondition extends Component {
    state= {
        rule:{}
    }

    componentWillMount(){        
        this.setState({
            rule: this.props.rule
        });
    }
    

    createRuleConditions(ruleConditions, operator){ 
        //console.log('ruleConditions.length : ' + ruleConditions.length);
        //console.log(ruleConditions);        
        if (ruleConditions.length > 1 ) {
            return((ruleConditions).map((con, index) => (<li className="list-group-item text-primary font-weight-bold" key= {index}> 
                <div className="row">
                <div className="col-lg-1 m-auto">{index == 0 ? '' : operator == 'Any' ? 'OR' : 'AND'}</div>
                    <div className="col-lg-4 m-auto">
                        <span className="">{con.fact}</span>
                    </div>
                    <div className="col-lg-4 m-auto">
                        <span className="">{con.operator}</span>
                    </div>
                    <div className="col-lg-3 m-auto">
                        <input type="text" className="form-control" defaultValue={con.value} />
                    </div>
                </div>            
            
            {// index < ruleConditions.length - 2 ? ( operator == 'Any' ? <div className="row bg-dark">OR</div> :<div className="row bg-dark">AND</div> ) : null
            }
            </li>)))
        } else if(Array(ruleConditions).length == 1) {
        return(<li className="list-group-item text-primary font-weight-bold">
            <div className="row">
            <div className="col-lg-1 m-auto"></div>    
            <div className="col-lg-4 m-auto">
                <span className="">{ruleConditions.fact}</span>
            </div>
            <div className="col-lg-4 m-auto">
                <span className="">{ruleConditions.operator}</span>
            </div>
            <div className="col-lg-3 m-auto">
                <input type="text" className="form-control" defaultValue={ruleConditions.value} />
            </div>
        </div> 
        </li>)
        }   else { return (<li>Unable to load conditions</li>)}
    }

    render() {
        if(this.state.rule){
        const userRule = this.state.rule;
        var operator = Object.keys(userRule.Conditions);
        //console.log(operator.toString());
        var ruleConditions = userRule.Conditions[operator];
        //console.log(ruleConditions);
        var ruleEvents = userRule.Events;
        //console.log(ruleEvents);

        return (
            <div className="">
            <div className="card text-center">
              <div className="card-header font-weight-bolder">{userRule.RuleName}</div>
              <div className="card-body">
              <h5 className="card-title">When</h5>
                <ul className="list-group list-group-flush">
                    {this.createRuleConditions(ruleConditions, operator)}
                </ul>
                <h5 className="card-title mt-3">Then</h5>
                <ul className="list-group list-group-flush">
                    {Array(ruleEvents).map((ev, index) => (
                        <li className="list-group-item text-success font-weight-bold" key= {index}> {ev.params.message}</li>
                    ))}
                </ul>
              </div>
              <div className="card-footer text-muted"><input type="button" className="btn btn-primary" onClick={this.props.closePopup} value="Close"/></div>
            </div>
          </div>
        )}
        else{ return null}
    }
}
