import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [
                {name: 'John C.', salary: 800, increase: false, rise: false, id: 1},
                {name: 'Alex M.', salary: 3000, increase: true, rise: true, id: 2},
                {name: 'Carl W.', salary: 5000, increase: false, rise: false, id: 3}
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 4;
    }

    onDelete = (id) => {
       this.setState(({data}) => ({
        data: data.filter(item => item.id !== id)
       }))
    }

    onAddEmployees = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }

        this.setState(({data}) => {
            const newArr = [...data, newItem]
            return {
                data: newArr
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id){
                    return {...item, [prop]: !item[prop]}
                }
                return item
            })
        }))
    }

    searchItems = (items, term) => {
        if(term.length === 0){
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1;
        })
    }

    onChangeTerm = (term) => {
        this.setState({term});
    }

    filterEmloyees = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'moreThan1000': 
                return items.filter(item => item.salary > 1000);
            default: return items;
        }
    }

    onFilterEmloyees = (filter) => {
        this.setState({filter});
    }

    onEditSalary = (emplooyeName, editSalary) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.name === emplooyeName) {
                    item.salary = +editSalary.slice(0, -1);
                    return item;
                }
                return item;
            })
        }))
        console.log(editSalary, emplooyeName);
    }

    render() {
        const {data, term, filter} = this.state;
        const employees = data.length,
              increased = data.filter(item => item.increase).length;
        
        const visibleData = this.filterEmloyees(this.searchItems(data, term), filter);

        return (
            <div className="app">
                <AppInfo employees={employees}
                         increased={increased}/>
    
                <div className="search-panel">
                    <SearchPanel onChangeTerm={this.onChangeTerm}/>
                    <AppFilter filter={filter}
                               onFilterEmloyees={this.onFilterEmloyees}/>
                </div>
    
                <EmployeesList 
                    data={visibleData}
                    onDelete={this.onDelete}
                    onToggleProp={this.onToggleProp}
                    onEditSalary={this.onEditSalary}/>
                <EmployeesAddForm 
                    onAddEmployees={this.onAddEmployees}/>
            </div>
        );
    }
   
}

export default App;