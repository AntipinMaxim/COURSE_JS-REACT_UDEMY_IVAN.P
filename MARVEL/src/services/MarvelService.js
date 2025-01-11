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

    getAllCharcters = () => {
        return this.getResource (`${this._baseApi}characters?limit=9&${this._apiKey}`);
    }

    getCharacter = (id) => {
        return this.getResource (`${this._baseApi}characters/${id}?${this._apiKey}`);
    }
}

export default MarvelService;