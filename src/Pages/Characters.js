import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import React, { useState, useEffect, useContext, useRef } from "react";

import { store } from '../context/store';
import { getCharacteres, saveCharacters } from '../services/characters.service';

import Card from "../components/Card/Card";
import Pagination from "../components/Pagination/Pagination";
import Filter from "../components/Filter/Filter";
import Search from "../components/Search/Search";
import { Modal } from "../components/Modal/Modal";

const Characters = () => {
  let [pageNumber, updatePageNumber] = useState(1);
  let [status, updateStatus] = useState("");
  let [gender, updateGender] = useState("");
  let [species, updateSpecies] = useState("");
  let [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const state = useContext(store);

  const { results } = state.state.pageCharacters[pageNumber] || [];
  const info = state.state.currentInfo;
  const maxItemPeerPage = 20
  const maxPage = 42;

  let resultMockCharacters = useRef([]);

  const actionAdd = (e) => {
    e.preventDefault();
    setShowModal(true)
  }

  const onSaveData = (data) => {
    //Creación de personajes directos al context
    resultMockCharacters.current.push(saveCharacters(data));

    if (resultMockCharacters.current.length >= maxItemPeerPage || info.pages === maxPage) {
      if (!!info) {
        info.count = info.count+1;
        info.next  = "#";
        info.pages = info.pages+1;
        info.prev  = null;
      }
    }

    state.dispatch({ type: 'SET_PAGE_CHARACTERS', payload: {
      page: info.pages,
      data: {
        info: {
          count: info.count,
          next:"#",
          pages: info.pages,
          prev: null
        },
        results: resultMockCharacters.current
      }
    } });

    if (resultMockCharacters.current.length >= maxItemPeerPage) {
      resultMockCharacters.current = [];
    }
  }

 useEffect(() => {
    (async function () {
      let data = await getCharacteres(pageNumber, search, status, gender, species);
      console.log('data', data);
      if (data) {
        state.dispatch({ type: 'SET_PAGE_CHARACTERS', payload: {
            page: pageNumber,
            data: data
        } })
      }
    })();
  }, [pageNumber, search, status, gender, species]);

  useEffect(() => {
    console.log('ingreso')
    return () => {
      console.log('me salgo')
    }
  }, []);

  useEffect(() => {
    console.log('ingreso')
  });

  return (
    <div className="episodes">
      <h1 className="text-center mb-3">Personaje</h1>
      { showModal &&
        <Modal
          onClose={() => setShowModal(false)}
        >
          <FormCharacter onSaveData={onSaveData} onClose={() => setShowModal(false)}/>
        </Modal>
      }
      <Search setSearch={setSearch} updatePageNumber={updatePageNumber} actionAdd={actionAdd}/>
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

const FormCharacter = (props) => {

  const [form, setForm] = useState({
    characterName: '',
    characterPhoto: '',
    characterGender: '',
    characterLocation: ''
  })

  const onChangeForm = (e) =>
    setForm({...form, [e.target.name] : e.target.value})

  const saveData = (e) => {
    e.preventDefault();
    props.onSaveData(form);
    setForm({});
    props.onClose()
  }

  return (
    <form onSubmit={(e) => saveData(e)}>
      <h3>Agregar Personaje</h3>
      <br></br>
      <div className="form-group">
        <label htmlFor="characterName">Nombre</label>
        <input
          className="form-control"
          id="characterName"
          name="characterName"
          placeholder="Ingrese Nombre"
          onChange={(e) => onChangeForm(e)}
          value={form.characterName}
        />
      </div>
      <div className="form-group">
        <label htmlFor="characterPhoto">Subir Foto</label>
        <input
          type='file'
          className="form-control"
          id="characterPhoto"
          name="characterPhoto"
          placeholder="Subicr imagen..."
        />
      </div>
      <div className="form-group">
        <label htmlFor="characterGender">Género</label>
        <select
          className="form-control"
          id="characterGender"
          name="characterGender"
          placeholder="Ingrese Género"
          onChange={(e) => onChangeForm(e)}
          value={form.characterGender}
        >
          <option value={"Male"}>Masculino</option>
          <option value={"Female"}>Femenino</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="characterLocation">Ubicación</label>
        <input
          className="form-control"
          id="characterLocation"
          name="characterLocation"
          placeholder="Ingrese Ubicación"
          value={form.characterLocation}
          onChange={(e) => onChangeForm(e)}
        />
      </div>
      <br></br>
      <button type="submit" className="btn btn-primary">Agregar</button>
    </form>
  );
}

export default Characters;