import axios from 'axios';

const fetchApi = async() => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
            sparkline: false,
        },
        });
        return response
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export {fetchApi}