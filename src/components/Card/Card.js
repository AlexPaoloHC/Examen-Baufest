import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.sass";
import CardDetails from "./CardDetails"


const Card = ({ page, results, presentation }) => {
  let display;

  const getStylePresentation = () => {
    if (presentation === 'episode') return 'presentation_episode'
  }

  const getStatusCard = (status) => {
    if (status === "Dead") {
      return (
        <div className={`${styles.badge} position-absolute badge bg-danger`} >{status}</div>
      );
    } else if (status === "Alive") {
      return (
        <div className={`${styles.badge} position-absolute badge bg-success`} >{status}</div>
      );
    } else {
      return (
        <div className={`${styles.badge} position-absolute badge bg-secondary`} >{status}</div>
      );
    }
  }

  if (results) {
    display = results.map((x) => {
      let { id, image, name, status, location } = x;

      return (
        <Link
          style={{ textDecoration: "none" }}
          to={`${page}${id}`}
          key={id}className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4 position-relative text-dark"
        >
          <div
            className={`${styles.card__parent} ${styles[getStylePresentation()]} d-flex flex-column justify-content-center`}
          >
            <img className={`${styles.card__img} img-fluid`} src={image} alt="" />
            <div className={`${styles.content}`}>
              <div className="fs-5 fw-bold mb-4">{name}</div>
              <div className="">
                <div className="fs-6 fw-normal">Last Location</div>
                <div className="fs-5">{location.name}</div>
              </div>
            </div>
          </div>

          {getStatusCard(status)}
        </Link>
      );
    });
  } else {
    display = "No Characters Found :/";
  }

  return <>{display}</>;
};

export default Card;