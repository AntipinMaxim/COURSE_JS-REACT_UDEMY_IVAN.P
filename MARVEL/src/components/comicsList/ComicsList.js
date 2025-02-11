import useMarvelService from '../../services/MarvelService';
import {useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './comicsList.scss';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(8);
    const [newItemLoading, setNewItemLoading] = useState(false)

    const {loading, error, getAllComics} = useMarvelService(); 

    useEffect(() => {
        getAllComics()
            .then(setComicsList)
    },[])

    const onNewItems = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComics(offset)
            .then(comics => setComicsList(comicsList => {
                setNewItemLoading(false)
                return [...comicsList, ...comics]
            }))
        setOffset(offset => offset + 8);
    }

    const renderItems = (arr) => {
        const items = arr.map((item, i) => {
            return(
                <li className="comics__item" key={i}>
                    <a href="#">
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">${item.title}</div>
                        <div className="comics__item-price">9.99$</div>
                    </a>
                </li>
            )
        })

        return(
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comicsList);
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;

    return (
        <div className="comics__list">
            {items}
            {spinner}
            {errorMessage}
            <button className="button button__main button__long" 
                    onClick={() => onNewItems(offset, false)}
                    disabled={newItemLoading}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;