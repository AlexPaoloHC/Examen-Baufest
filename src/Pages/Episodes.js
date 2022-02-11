import React, { useEffect, useState } from "react";
import { REACT_APP_API_URL } from '../services/http';
import Card from "../components/Card/Card";
import InputGroup from "../components/Filter/category/InputGroup";

const Episodes = () => {
  let [results, setResults] = React.useState([]);
  let [info, setInfo] = useState([]);
  let { air_date, name, episode } = info; //episode en medio
  let [id, setID] = useState(1);
  const typePresentation = 'episode';

  let api = `${REACT_APP_API_URL}/episode/${id}`;

  useEffect(() =>{
    (async function(){
      let data = await fetch(api).then((res) => res.json());
      setInfo(data);

      let a = await Promise.all(
        data.characters.map((x) => {
          return fetch(x).then((res) => res.json());
        })
      );
      setResults(a);
    })();
}, [api]);
  return (
    <div className="container">
      <div className="row mb-3 mt-5 pt-4">
        <h1 className="text-center mb-3">
          Episodio {episode}:{" "}
          <span className="text-primary">{name === "" ? "Unknown" : name}</span>
        </h1>
        <h5 className="text-center">
          Fecha de emisión: {air_date === "" ? "Unknown" : air_date}
        </h5>
      </div>
      <div className="row mt-5">
        <div className="col-lg-3 col-12 mb-4">
          <h4 className="text-center mb-4">Seleccione Episodio</h4>
          <InputGroup name="Episode" changeID={setID} total={51} />
        </div>
        <div className="col-lg-8 col-12">
          <div className="row">
            <Card page="/episodes/" results={results} presentation={typePresentation} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Episodes;