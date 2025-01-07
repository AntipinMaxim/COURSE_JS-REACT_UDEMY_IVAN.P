import { Component } from 'react';

import './employees-list-item.css';

class EmloyeesListItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: this.props.name,
            salary: this.props.salary
        }
    }

    changeInput = (e) => {
            e.target.value = (e.target.value.replace(/\D/g, ''));
        const salary = e.target.value;
        this.setState(() => ({
            salary: +salary.slice(0, -1)
        }))
        this.props.onEditSalary(this.state.name, salary);
    }
    onAddSymbol = (e) => {
        e.target.value += '$';
    }

    render() {
        const {name, salary, onDelete, onToggleProp, increase, rise} = this.props;

        let classNames = 'list-group-item d-flex justify-content-between';

        if(increase){
            classNames += ' increase';
        }

        if(rise){
            classNames += ' like';
        }

    return (
        <div className={classNames}>
            <span className="list-group-item-label"
                  onClick={onToggleProp}
                  data-toggle='rise'>{name}</span>
            <input type="text" 
                   className="list-group-item-input" 
                   defaultValue={salary + '$'} 
                   onChange={this.changeInput}
                   onClick={this.changeInput}
                   onBlur={this.onAddSymbol}/>
            <div className="d-flex justify-content-center align-items-center">
                <button type="button"
                        className="btn-cookie btn-sm"
                        onClick={onToggleProp}
                        data-toggle='increase'>
                    <i className="fas fa-cookie"></i>
                </button>

                <button type="text"
                        className="btn-trash btn-sm"
                        onClick={onDelete}>
                    <i className="fas fa-trash"></i>
                </button>
                <i className="fas fa-star"></i>
            </div>
        </div>
    );
    }

    

}

export default EmloyeesListItem;