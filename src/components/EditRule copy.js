import React, { Component } from 'react'
import RuleBaseConfig from '../config'

export default class EditRule extends Component {
    state={
        facts: RuleBaseConfig.RuleBase.facts,
        operators: RuleBaseConfig.RuleBase.operators,
        messages: RuleBaseConfig.RuleBase.messages,
        thisRule: {
            RuleName: null,
            RuleCategory: null,
            Active: null,
            Conditions: {
                all: [{
                    fact:null,
                    operator:null,
                    value:0,
            }]},
            Events: {
                type:null,
                params:{
                message:null
                }
            }
        }
    }

    createRuleConditions(ruleConditions, operator){ 
        //console.log('ruleConditions.length : ' + ruleConditions.length);
        //console.log(ruleConditions);        
        if (ruleConditions.length > 0 ) {
            return ruleConditions.map((con, index) => (
              <div className="row mb-2" key={index}>
                <div className="col-lg-1 m-auto">
                  {index == 0 ? "When" : operator == "any" ? "OR" : "AND"}
                </div>
                <div className="col-lg-4 m-auto">
                  <select className="custom-select" defaultValue="0" onChange={ e => this.setValueConditionFact(e) }>
                    <option value="0">{con.fact}</option>
                    {this.state.facts.map((msgTemplate, index) => {
                        if(msgTemplate != con.fact){
                           
                      return (
                        <option value={index} key={index+1}>
                        {msgTemplate}
                        </option>
                      );}
                    })}
                  </select>
                </div>
                <div className="col-lg-4 m-auto">
                  <select className="custom-select" defaultValue="0" onChange={ e => this.setValueConditionOperator(e) }>
                    <option value="0">{con.operator}</option>
                    {this.state.operators.map((msgTemplate, index) => {
                        if(msgTemplate != con.operator){
                      return (
                        <option value={index+1} key={index+1}>
                        {msgTemplate}
                        </option>
                      );}
                    })}
                  </select>
                </div>
                <div className="col-lg-3 m-auto">
                  <input type="text" className="form-control" defaultValue={con.value} onChange={e => this.setValueConditionValue(e)} />
                </div>
              </div>
            ));
         } else { return (<li>Unable to load conditions</li>)}
        //else if(ruleConditions.length == 1) {
        // return(
        //     <div className="row" key='1'>
        //     <div className="col-lg-1 m-auto">When</div>    
        //     <div className="col-lg-4 m-auto">
        //         <select className="custom-select" defaultValue="1">
        //             <option value="1">{ruleConditions[0].fact}</option>
        //             {this.state.facts.map((msgTemplate, index) => {
        //                 if(msgTemplate != ruleConditions[0].fact){
        //               return (
        //                 <option value={index+2}>
        //                 {msgTemplate}
        //                 </option>
        //               );}
        //             })}           
        //         </select>
        //     </div>
        //     <div className="col-lg-4 m-auto">
        //     <select className="custom-select" defaultValue="1">
        //         <option value="1">{ruleConditions[0].operator}</option>   
        //         {this.state.operators.map((msgTemplate, index) => {
        //                 if(msgTemplate != ruleConditions[0].operator){
        //               return (
        //                 <option value={index+2}>
        //                 {msgTemplate}
        //                 </option>
        //               );}
        //             })}             
        //     </select>
        //     </div>
        //     <div className="col-lg-3 m-auto">
        //         <input type="text" className="form-control" defaultValue={ruleConditions[0].value} />
        //     </div>
        // </div> 
        // )
        // }  
         
    }

    createRuleEvents = (events) => {
        return Array(events).map((ev, index) => (
          <div className="row" key={index}>
            <div className="col-lg-1 m-auto">Then</div>
            <div className="col-lg-11 m-auto">
              <select className="form-control" id="cbEvents" defaultValue="0" onChange={ e => this.setValueEventMessage(e) }>
                <option value="0">{ev.params.message}</option>
                {this.state.messages.map((msgTemplate, index) => {
                  if (msgTemplate != ev.params.message) {
                    return <option value={index + 1} key={index+1}>{msgTemplate}</option>;
                  }
                })}
              </select>
            </div>
          </div>
        ));
    }

    setValueEventMessage = (event) => {
        event.preventDefault();
        var newType = this.state.thisRule.RuleCategory, 
            newMessage = event.target[event.target.value].text;
        this.setState(prevState => ({thisRule: {
            ...prevState.thisRule,
            Events:{
                type: newType,
                params:{
                message: newMessage
                }
            } 
        }}));
    }
    setValueActive = (event) => {
        var newStatus = event.target.checked;
        this.setState(prevState => ({thisRule: {
            ...prevState.thisRule,
            Active: newStatus
        }}));
        console.log(this.state.thisRule)
    }
    setValueConditionFact = (event) => {
        event.preventDefault();
        var newFact = event.target[event.target.value].text;
        //console.log(event.target.value);
        this.setState(prevState => ({thisRule: {
            ...prevState.thisRule,
            Conditions:{ all: [{
                ...prevState.thisRule.Conditions.all[0],
                fact: newFact
            }] }
        }}));
        console.log(this.state.thisRule)
    }
    setValueConditionOperator = (event) => {
        event.preventDefault();
        var newOperator = event.target[event.target.value].text;
        this.setState(prevState => ({thisRule: {
            ...prevState.thisRule,
            Conditions:{ all: [{
                ...prevState.thisRule.Conditions.all[0],
                operator: newOperator
            }] }
        }}));
        console.log(this.state.thisRule)
    }
    setValueConditionValue = (event) => {
        event.preventDefault();
        var newValue = event.target.value;
        //console.log(newValue)
        this.setState(prevState => ({thisRule: {
            ...prevState.thisRule,
            Conditions:{ all: [{
                ...prevState.thisRule.Conditions.all[0],
                value: newValue
            }] }
        }}));
        console.log(this.state.thisRule)
    }
    setValueID = () => {
        var rule = this.props.rule;
        // console.log(rule)
        //this.setValueID.bind(rule.ID);
        if(rule) this.setState({thisRule: rule})
        // var vID = ruleID;
        // this.setState(prevState => ({
        //     thisRule:{
        //         ...prevState.thisRule,
        //         ID: vID
        //     }
        // }));   
        console.log(this.state.thisRule)
    }
    saveRule = (e) => {
        e.preventDefault();
        //console.log(this.state.thisRule);
        var newRule = this.state.thisRule;

        fetch('http://localhost:5000/rules', {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRule),
        })
        .then(this.props.closePopup)
        .then(this.props.reloadRules);
    }

    render() {

        var rule = this.props.rule; //{"ID":2,"RuleName":"Customers inactive for more than 30 days","RuleCategory":"Customer Retention","Active":true,"Conditions":{"all":[{"fact":"Customer Inactivity","operator":"greaterThanInclusive","value":30}]},"Events":{"type":"CustomerRetention","params":{"message":"Inactive customer found!"}}};
        var operator = Object.keys(rule.Conditions);
        var ruleConditions = rule.Conditions[operator];
        var ruleEvents = rule.Events;        

        return (
            <div className="popup p-5">
                <div className="card text-center popup_inner">
                    <div className="card-header">
                    <h4>Edit Rule</h4>
                    </div>
                    <div className="card-body">
                    <form onSubmit={this.saveRule} className="container">
                    {/* <div className="row text-left mb-5">
                        <div className="col-lg-12"><h2>Edit Rule</h2></div>
                    </div> */}
                    <div className="row mb-3">
                        <div className="col-lg-4 text-right m-auto font-weight-bold">Rule Name</div>
                        <div className="col-lg-5 text-left m-auto"><input type="text" className="form-control" disabled defaultValue={rule.RuleName}  /></div>
                        <div className="col-lg-3 "></div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-lg-4 text-right m-auto font-weight-bold">Rule Category</div>
                        <div className="col-lg-5 text-left m-auto"><input type="text" className="form-control" disabled defaultValue={rule.RuleCategory}/></div>
                        <div className="col-lg-3 "></div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-lg-4 text-right m-auto font-weight-bold">isActive</div>
                        <div className="col-lg-5 text-left m-auto"><input type="checkbox" className="checkbox" defaultChecked={rule.Active}  onChange={ e => this.setValueActive(e) }/></div>
                        <div className="col-lg-3 "></div>
                    </div>
                    {/* Conditions */}
                    <div className="mb-3">{ this.createRuleConditions(ruleConditions, operator)}</div>
                    {/* Events */}
                    <div className="mb-5">{ this.createRuleEvents(ruleEvents)}</div>
                    <div className="row text-center m-auto d-block mb-3">
                        <input type="submit" className="btn btn-success ml-2 mr-2 btn-submit" value="Save" />
                        <input type="button" className="btn btn-danger ml-2 mr-2 btn-submit" value="Discard" onClick={this.props.closePopup} />
                    </div>
                </form>
                    </div>
                </div>
                
            </div>
        )
    }
}
