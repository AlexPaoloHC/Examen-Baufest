import React from "react";
import PropTypes from 'prop-types';
import styles from "./Search.module.scss";

const Search = props => {
  const {
    setSearch,
    actionAdd,
    updatePageNumber } = props;

  let searchBtn = (e) => e.preventDefault();

  return (
    <form
      className={`${styles.search} d-flex flex-sm-row flex-column align-items-center justify-content-center gap-4 mb-5 mt-4`}
    >
      <input
        onChange={(e) => {
          updatePageNumber(1);
          setSearch(e.target.value);
        }}
        placeholder="Busqueda de personaje"
        className={styles.input}
        type="text"
      />
      <button
        onClick={searchBtn}
        className={`${styles.btn} btn btn-outline-success fs-5`}
      >
        Buscar
      </button>

      <button
        onClick={actionAdd}
        className={`${styles.btn} btn btn-outline-success fs-5`}
      >
        Agregar Nuevo
      </button>
    </form>
  );
};

Search.propTypes = {
  setSearch: PropTypes.func.isRequired,
  actionAdd: PropTypes.func.isRequired,
  updatePageNumber: PropTypes.func.isRequired,
}

export default Search;