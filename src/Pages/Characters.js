import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import React, { useState, useEffect, useContext } from "react";

import { store } from '../context/store';
import { getCharacteres } from '../services/characters.service';

import Card from "../components/Card/Card";
import Pagination from "../components/Pagination/Pagination";
import Filter from "../components/Filter/Filter";
import Search from "../components/Search/Search";

const Characters = () => {
  let [pageNumber, updatePageNumber] = useState(1);
  let [status, updateStatus] = useState("");
  let [gender, updateGender] = useState("");
  let [species, updateSpecies] = useState("");
  // let [fetchedData, updateFetchedData] = useState([]);
  let [search, setSearch] = useState("");
  const state = useContext(store);
  const { info, results } = state.state.pageCharacters[pageNumber] || [];

  console.log(':: state', state);

  useEffect(() => {
    (async function () {
      let data = await getCharacteres(pageNumber, search, status, gender, species);
      state.dispatch({ type: 'SET_PAGE_CHARACTERS', payload: {
          page: pageNumber,
          data: data
      } })
      // updateFetchedData(data);
    })();
  }, [pageNumber, search, status, gender, species]);

  return (
    <div className="episodes">
      <h1 className="text-center mb-3">Characters</h1>
      <Search setSearch={setSearch} updatePageNumber={updatePageNumber} />
      <div className="container">
        <div className="row">

          <Filter
            pageNumber={pageNumber}
            status={status}
            updateStatus={updateStatus}
            updateGender={updateGender}
            updateSpecies={updateSpecies}
            updatePageNumber={updatePageNumber}
          />
          <div className="col-lg-8 col-12">
            <div className="row">
              <Card page="/" results={results} />
            </div>
          </div>
        </div>
      </div>
      <Pagination
        info={info}
        pageNumber={pageNumber}
        updatePageNumber={updatePageNumber}
      />
    </div>
  );
};

export default Characters;