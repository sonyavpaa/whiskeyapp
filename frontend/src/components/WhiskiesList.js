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
        <div className="searchContainer form-inline">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search whiskies by title..."
            value={searchTitle}
            onChange={searchTitleHandler}
            aria-label="Search"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                findByTitle(e.currentTarget.value);
              }
            }}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="button"
            onClick={findByTitle}
          >
            Search
          </button>
        </div>

        <div className="selectContainer input-group">
          <select onChange={searchDistilleryHandler}>
            {distilleries.map((distillery, i) => {
              return (
                <option value={distillery} key={i}>
                  {distillery.substr(0, 20)}
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
              Select
            </button>
          </div>
        </div>
      </div>
      <div className="whiskeyListContainer">
        {whiskies.map((whiskey, i) => {
          return (
            <div className="whiskeyCard" key={i}>
              <h5>{whiskey.whiskeyTitle}</h5>
              <p>{whiskey.region}</p>
              <p>{whiskey.country}</p>
              <p>{whiskey.description}</p>
              <p>{whiskey.price}</p>
              <div className="tagsContainer">
                {whiskey?.tags?.map((tag, i) => (
                  <p className="tag" key={i}>
                    {tag}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
        whiskies will be listed here
      </div>
    </div>
  );
};

export default WhiskiesList;
