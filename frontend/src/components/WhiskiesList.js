import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/WhiskiesList.css";

import WhiskeyDataService from "../services/whiskies";

const WhiskiesList = (props) => {
  const [whiskies, setWhiskies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchDistillery, setSearchDistillery] = useState("");
  const [distilleries, setDistilleries] = useState(["All Distilleries"]);

  useEffect(() => {
    retrieveWhiskies();
    retrieveDistilleries();
  }, []);

  const searchTitleHandler = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const searchDistilleryHandler = (e) => {
    const searchDistillery = e.target.value;
    setSearchDistillery(searchDistillery);
  };

  const retrieveWhiskies = () => {
    WhiskeyDataService.getWhiskies()
      .then((res) => {
        console.log(`Retrieved whiskies: ${res.data}`);
        setWhiskies(res.data.whiskies);
      })
      .catch((err) => console.log(`Error in retrieving whiskies: ${err}`));
  };

  const retrieveDistilleries = () => {
    WhiskeyDataService.getDistilleries()
      .then((res) => {
        console.log(`Retrieved distilleries: ${res.data}`);
        setDistilleries(["All Distilleries"].concat(res.data));
      })
      .catch((err) => {
        console.log(`Error in retrieving distilleries: ${err}`);
      });
  };

  const refreshList = () => {
    retrieveWhiskies();
  };

  const find = (query, by) => {
    WhiskeyDataService.find(query, by)
      .then((res) => {
        console.log(`Data from find: ${res.data}`);
        setWhiskies(res.data.whiskies);
      })
      .catch((err) => {
        console.log(`Error when using find: ${err}`);
      });
  };

  const findByTitle = () => {
    find(searchTitle, "whiskeyTitle");
  };

  const findByDistillery = () => {
    if (searchDistillery == "All Distilleries") {
      refreshList();
    } else {
      find(searchDistillery, "distillery");
    }
  };

  return (
    <div className="whiskieListPageContainer">
      <div className="searchBars">
        <form className="form-inline">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search whiskies by title..."
            value={searchTitle}
            onChange={searchTitleHandler}
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="button"
            onClick={findByTitle}
          >
            Search
          </button>
        </form>

        <form className="select input-group">
          <select className="select" onChange={searchDistilleryHandler}>
            {distilleries.map((distillery) => {
              return (
                <option value={distillery}>
                  <p>{distillery.substr(0, 20)}</p>
                </option>
              );
            })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByDistillery}
            >
              Search
            </button>
          </div>
        </form>
      </div>
      whiskies will be listed here
    </div>
  );
};

export default WhiskiesList;
