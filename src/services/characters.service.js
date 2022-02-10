import { http, REACT_APP_API_URL } from './http';

export const getCharacteres = async (pageNumber, search, status, gender, species) => {

    let api = `${REACT_APP_API_URL}/character/?page=${pageNumber}&name=${search}&status=${status}&gender=${gender}&species=${species}`;
    let data = await http.get(api);
    return data;
}