import './employees-list-item.css';

const EmloyeesListItem = (props) => {
        const {name, salary, onDelete, onToggleProp, increase, rise} = props;

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
            <input type="text" className="list-group-item-input" defaultValue={salary + '$'} />
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

export default EmloyeesListItem;