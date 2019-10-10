import React, { Component } from 'react'
import RuleBaseConfig from '../config'

export default class EditRule extends Component {
    constructor(props) {
        super(props);
        this.state={
            facts: RuleBaseConfig.RuleBase.facts,
            operators: RuleBaseConfig.RuleBase.operators,
            messages: RuleBaseConfig.RuleBase.messages,
            categories: RuleBaseConfig.RuleBase.categories,
            thisRule: this.props.rule
        };
      }
    

    createRuleEvents = (events) => {        
          return (<div className="row" key='0'>
            <div className="col-lg-1 m-auto">Then</div>
            <div className="col-lg-11 m-auto">
              <select className="form-control" defaultValue={events.params.message} onChange={ e => this.setValueEventMessage(e) }>
                {this.state.messages.map((msgTemplate, index) => {                 
                    return <option value={index} key={index}>{msgTemplate}</option>;                  
                })}
              </select>
            </div>
          </div>
          )
    }

    createRuleConditions(conditions){ 
        return(
            <div className="row" key='1'>
            <div className="col-lg-1 m-auto">When</div>    
            <div className="col-lg-4 m-auto">
                <select className="custom-select" defaultValue={conditions.fact} onChange={ e => this.setValueConditionFact(e) }>
                    {this.state.facts.map((msgTemplate, index) => {                        
                      return (
                        <option key={index}>
                        {msgTemplate}
                        </option>
                      );
                    })}           
                </select>
            </div>
            <div className="col-lg-4 m-auto">
            <select className="custom-select" onChange={ e => this.setValueConditionOperator(e) }>
                    <option>{conditions.operator}</option>
                {this.state.operators.map((msgTemplate, index) => {                       
                      return (
                        <option key={index}>
                        {msgTemplate}
                        </option>
                      );
                    })}             
            </select>
            </div>
            <div className="col-lg-3 m-auto">
                <input type="text" className="form-control" defaultValue={conditions.value} onChange={e => this.setValueConditionValue(e)}  />
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
        //console.log(newCategory);
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
        //console.log(this.state.thisRule)
    }
    setValueConditionFact = (event) => {
        event.preventDefault();
        var newFact = event.target[event.target.value].text;
        //console.log(newFact);
        this.setState(prevState => ({thisRule: {
            ...prevState.thisRule,
            Conditions:{ all: [{
                ...prevState.thisRule.Conditions.all[0],
                fact: newFact
            }] }
        }}));
        //console.log(this.state.thisRule)
    }
    setValueConditionOperator = (event) => {
        event.preventDefault();
        //console.log(event.target.value)
        // var newOperator = event.target[event.target.value].text;
        var newOperator = event.target.value;
        this.setState(prevState => ({thisRule: {
            ...prevState.thisRule,
            Conditions:{ all: [{
                ...prevState.thisRule.Conditions.all[0],
                operator: newOperator
            }] }
        }}));
        //console.log(this.state.thisRule)
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
    }

    saveRule = (e) => {
        e.preventDefault();
        //console.log(this.state.thisRule);
        var newRule = this.state.thisRule;
        //console.log(newRule)
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

    componentDidMount(){
        // var rule = this.props.rule;
        // console.log(rule);
        // this.setState({
        //     thisRule: rule
        // });
        console.log(this.state.thisRule);
    }

    render() {
        var myRule = this.state.thisRule;
        return (
            <div className="popup p-5">
                <div className="card text-center popup_inner">
                    <div className="card-header">
                    <h4>Edit Rule</h4>
                    </div>
                    <div className="card-body">
                    <form onSubmit={this.saveRule} className="container">
                    <div className="row mb-3">
                        <div className="col-lg-4 text-right m-auto font-weight-bold">Rule Name</div>
                        <div className="col-lg-5 text-left m-auto"><input type="text" className="form-control" required defaultValue={myRule.RuleName} disabled  /></div>
                        <div className="col-lg-3 "></div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-lg-4 text-right m-auto font-weight-bold">Rule Category</div>
                        <div className="col-lg-5 text-left m-auto">
                        <select className="custom-select" defaultValue={myRule.RuleCategory} disabled >
                            {this.state.categories.map((msgTemplate, index) => {                        
                            return (
                                <option value={index} key={index}>
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
                        <div className="col-lg-5 text-left m-auto"><input type="checkbox" className="checkbox" defaultChecked={myRule.Active} onChange={ e => this.setValueActive(e) }/></div>
                        <div className="col-lg-3 "></div>
                    </div>
                    {/* Conditions */}
                    <div className="mb-3">{ this.createRuleConditions(myRule.Conditions.all[0])}</div>
                    {/* Events */}
                    <div className="mb-5">{ this.createRuleEvents(myRule.Events)}</div>
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
