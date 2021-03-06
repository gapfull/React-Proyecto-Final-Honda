import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./CardItem.scss";

const CardItem = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getList() {
      try {
        const request = await fetch("http://localhost:4000/modelos");
        const response = await request.json();
        setList(response);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }
    getList();
  }, []);

  if (error) {
    return <>Error: {error}</>;
  } else if (isLoading) {
    return <><br/>Item Loading...</>;
  } else {
    return (
      <>
        <ul className="flex-container">
          {list.map((item) => {
            return (
              <li className="flex-item" key={item.id}>
                <Link to={"./modelo/" + item.id}>
                  <div className="card">
                    <h3>{item.modelo}</h3>
                    <img
                      className="axis"
                      src={item.foto1}
                      alt="{item.modelo}"
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
};

export default CardItem;
