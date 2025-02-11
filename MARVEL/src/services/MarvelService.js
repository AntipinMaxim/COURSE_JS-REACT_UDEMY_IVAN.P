import useHttp from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _baseApi = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=52b17394f26190f6e8d2ddfb39784a87';
    const _baseOffset = 210

    const getAllCharcters = async (offset = _baseOffset) => {
        const res = await request(`${_baseApi}characters?limit=9&&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_baseApi}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        let description = char.description ? (char.description.length < 210 ? char.description : `${char.description.slice(0, 210)}...`) : 'There is no description for this character';
        return {
            id: char.id,
            name: char.name,
            description: description,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_baseApi}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`
        }
    }

    return {loading, error, clearError, getAllCharcters, getCharacter, getAllComics}
}

export default useMarvelService;