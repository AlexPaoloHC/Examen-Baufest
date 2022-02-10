import { http, REACT_APP_API_URL } from './http';

export const getCharacteres = async (pageNumber, search, status, gender, species, maxPage = 42) => {

    if (pageNumber > maxPage) return null;
    let api = `${REACT_APP_API_URL}/character/?page=${pageNumber}&name=${search}&status=${status}&gender=${gender}&species=${species}`;
    let data = await http.get(api);
    return data;
}

export const saveCharacters = (data) => {
    return {
      created: "2017-11-04T18:48:46.250Z",
      episode: ["https://rickandmortyapi.com/api/episode/1"],
      gender: data.characterGender, id: 1, image : "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      location: { name: data.characterLocation, url: "https://rickandmortyapi.com/api/location/3" },
      name : data.characterName,
      origin: { name: "Earth (C-137)", url: "https://rickandmortyapi.com/api/location/1"},
      species : "Human", status: "Alive",
      type : "",
      url : "https://rickandmortyapi.com/api/character/1"
    };
}
