import React, { Component } from 'react'
import myConfig from '../config'

export default class AddRule extends Component {
    state={
        facts: RuleBaseConfig.RuleBase.facts,
        operators: RuleBaseConfig.RuleBase.operators,
        messages: RuleBaseConfig.RuleBase.messages,
        categories: RuleBaseConfig.RuleBase.categories,
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

    createRuleEvents = () => {        
          return (<div className="row" key='0'>
            <div className="col-lg-1 m-auto">Then</div>
            <div className="col-lg-11 m-auto">
              <select className="form-control" defaultValue="0" onChange={ e => this.setValueEventMessage(e) }>
                <option value="0">Select Event</option>
                {this.state.messages.map((msgTemplate, index) => {                 
                    return <option value={index+1} key={index}>{msgTemplate}</option>;                  
                })}
              </select>
            </div>
          </div>
          )
    }

    createRuleConditions(){ 
        return(
            <div className="row" key='1'>
            <div className="col-lg-1 m-auto">When</div>    
            <div className="col-lg-4 m-auto">
                <select className="custom-select" defaultValue="0" onChange={ e => this.setValueConditionFact(e) }>
                <option value="0">Select Fact</option>
                    {this.state.facts.map((msgTemplate, index) => {                        
                      return (
                        <option value={index+1} key={index}>
                        {msgTemplate}
                        </option>
                      );
                    })}           
                </select>
            </div>
            <div className="col-lg-4 m-auto">
            <select className="custom-select" defaultValue="0" onChange={ e => this.setValueConditionOperator(e) }>
            <option value="0">Select Operator</option>
                {this.state.operators.map((msgTemplate, index) => {                       
                      return (
                        <option value={index+1} key={index}>
                        {msgTemplate}
                        </option>
                      );
                    })}             
            </select>
            </div>
            <div className="col-lg-3 m-auto">
                <input type="text" className="form-control" onChange={e => this.setValueConditionValue(e)}  />
            </div>
        </div> 
        )
    }

    setValueName = (event) => {
        event.preventDefault();
        var newName = event.target.value;
        //console.log(event.target.value)
        this.setState(prevState => ({thisRule: {
            ...prevState.thisRule,
            RuleName: newName
        }}));
    }
    setValueCategory = (event) => {
        event.preventDefault();
        var newCategory = event.target[event.target.value].text;
        console.log(newCategory);
        //console.log(event.target[event.target.value].text)
        this.setState(prevState => ({thisRule: {
            ...prevState.thisRule,
            RuleCategory: newCategory
        }}));
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
    }
    setValueConditionFact = (event) => {
        event.preventDefault();
        var newFact = event.target[event.target.value].text;
        console.log(newFact);
        this.setState(prevState => ({thisRule: {
            ...prevState.thisRule,
            Conditions:{ all: [{
                ...prevState.thisRule.Conditions.all[0],
                fact: newFact
            }] }
        }}));
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
    }
    setValueConditionValue = (event) => {
        event.preventDefault();
        var newValue = event.target.value;
        console.log(newValue)
        this.setState(prevState => ({thisRule: {
            ...prevState.thisRule,
            Conditions:{ all: [{
                ...prevState.thisRule.Conditions.all[0],
                value: newValue
            }] }
        }}));
    }

    saveRule = (e) => {
        e.preventDefault();
        const backend = myConfig.Backend;
        //console.log(this.state.thisRule);
        var newRule = this.state.thisRule;

        fetch(`${backend}/rules`, {
        method: 'POST',
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
        return (
            <div className="popup p-5">
                <div className="card text-center popup_inner">
                    <div className="card-header">
                    <h4>Add Rule</h4>
                    </div>
                    <div className="card-body">
                    <form onSubmit={this.saveRule} className="container">
                    <div className="row mb-3">
                        <div className="col-lg-4 text-right m-auto font-weight-bold">Rule Name</div>
                        <div className="col-lg-5 text-left m-auto"><input type="text" className="form-control" required defaultValue="" onChange={ e => this.setValueName(e) }  /></div>
                        <div className="col-lg-3 "></div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-lg-4 text-right m-auto font-weight-bold">Rule Category</div>
                        <div className="col-lg-5 text-left m-auto">
                        <select className="custom-select" defaultValue="0" onChange={ e => this.setValueCategory(e) } >
                            <option value="0">Select Category</option>
                            {this.state.categories.map((msgTemplate, index) => {                        
                            return (
                                <option value={index+1} key={index}>
                                {msgTemplate}
                                </option>
                            );
                            })}           
                        </select>
                        </div>
                        <div className="col-lg-3 "></div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-lg-4 text-right m-auto font-weight-bold">isActive</div>
                        <div className="col-lg-5 text-left m-auto"><input type="checkbox" className="checkbox" onChange={ e => this.setValueActive(e) }/></div>
                        <div className="col-lg-3 "></div>
                    </div>
                    {/* Conditions */}
                    <div className="mb-3">{ this.createRuleConditions()}</div>
                    {/* Events */}
                    <div className="mb-5">{ this.createRuleEvents()}</div>
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
