import { Component } from 'react';
import './employees-add-form.css';

class EmployeesAddForm extends Component {
    constructor({props}){
        super(props);
        this.state = {
            name: '',
            salary: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    onSubmit = (e) => {
        const {name, salary} = this.state;

        e.preventDefault();
        if (name.length < 3 || !salary) return;
        this.props.onAddEmployees(name, salary);
        this.setState(() => ({
            name: '',
            salary: ''
        }))
    }

    render() {
        const {name, salary} = this.state;

        return(
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form className="add-form d-flex"
                      onSubmit={this.onSubmit}>
                    <input type="text"
                           name='name'
                           className="form-control new-post-label"
                           placeholder="Как его зовут?"
                           value={name}
                           onChange={this.onValueChange}/>
                    <input type="number"
                           name="salary"
                           className="form-control new-post-label"
                           placeholder="З/П в $?"
                           value={salary}
                           onChange={this.onValueChange}/>
    
                    <button type="submit"
                            className="btn btn-outline-light">Добавить</button>
                </form>
            </div>
        );
    }
}

export default EmployeesAddForm;