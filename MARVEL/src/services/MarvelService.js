class MarvelService {
    _baseApi = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=52b17394f26190f6e8d2ddfb39784a87';

    getResource = async (url) => {
        const res = await fetch(url);
    
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    getAllCharcters = async () => {
        const res = await this.getResource (`${this._baseApi}characters?limit=9&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async(id) => {
        const res = await this.getResource (`${this._baseApi}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
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
}

export default MarvelService;