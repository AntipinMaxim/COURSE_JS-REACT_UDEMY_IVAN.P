import MarvelService from '../../services/MarvelService';
import { Component } from 'react';

import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';


class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false
   }

    marvelService = new MarvelService();

    componentDidMount () {
        this.marvelService.getAllCharcters()
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoaded = (charList) => {
        this.setState({
            charList,
            loading: false
        })
    }

    renderItems = (arr) => {
        const items = arr.map(item => {
            return (
                <li 
                    className="char__item"
                    key={item.id}>
                        <img src={item.thumbnail} alt={item.name}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        })
        
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
   
                    
               
      
    


    render(){
        const {charList} = this.state
        const items = this.renderItems(charList);

        return (
            <div className="char__list">
                <ul className="char__grid">
                  {items}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    } 
}

export default CharList;