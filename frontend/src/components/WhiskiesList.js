import React, { useState, useEffect } from "react";

import "../style/WhiskiesList.css";

import WhiskeyCard from "./WhiskeyCard";
import WhiskeyDataService from "../services/whiskies";
import SelectComponent from "./SelectComponent";

let optionsArr = [{ value: "", label: "All Distilleries" }];

const WhiskiesList = () => {
  const [whiskies, setWhiskies] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    retrieveWhiskies();
    retrieveDistilleries();
  }, []);

  // DATA RETRIEVAL FUNCTIONS
  const retrieveWhiskies = () => {
    WhiskeyDataService.getWhiskies()
      .then((res) => {
        setWhiskies(res.data.whiskies);
      })
      .catch((err) => console.log(`Error in retrieving whiskies: ${err}`));
  };

  const retrieveDistilleries = () => {
    WhiskeyDataService.getDistilleries()
      .then((res) => {
        res.data.forEach((distillery) => {
          if (optionsArr.length < res.data.length)
            return optionsArr.push({ value: distillery, label: distillery });
        });
        setOptions(optionsArr);
      })

      .catch((err) => {
        console.log(`Error in retrieving distilleries: ${err}`);
      });
  };

  // ****

  // SEARCH HANDLERS

  const searchTitleHandler = (e) => {
    const searchTitle = e.target.value;
    findByTitle(searchTitle);
  };

  const searchDistilleryHandler = (e) => {
    find(e.value, "distillery");
  };

  const findByTitle = (searchTitle) => {
    find(searchTitle, "whiskeyTitle");
  };

  const findByTag = (e) => {
    find(e.target.value, "tags");
  };

  const find = (query, by) => {
    WhiskeyDataService.find(query, by)
      .then((res) => {
        setWhiskies(res.data.whiskies);
      })
      .catch((err) => {
        console.log(`Error when using find: ${err}`);
      });
  };

  // ******

  const refreshList = () => {
    retrieveWhiskies();
  };

  return (
    <div className="whiskieListPageContainer">
      <img
        className="logo"
        alt="Barley & Bait logo"
        src={require("../img/BARLEY-BAIT_logo_round_white-white.png")}
        onClick={() => refreshList()}
      ></img>
      <div className="searchBars">
        <div className="searchContainer form-inline">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search whiskies by title..."
            // value={searchTitle}
            onChange={(e) => searchTitleHandler(e)}
            aria-label="Search"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                findByTitle(e.currentTarget.value);
              }
            }}
          />
        </div>

        <div className="selectContainer input-group">
          <SelectComponent
            options={options}
            onChange={(e) => searchDistilleryHandler(e)}
          />
        </div>
      </div>
      <div className="whiskeyListContainer">
        {whiskies.map((whiskey, i) => {
          return (
            <WhiskeyCard
              whiskey={whiskey}
              key={i}
              tagClicked={(e) => findByTag(e)}
            />
          );
        })}
        whiskies will be listed here
      </div>
    </div>
  );
};

export default WhiskiesList;
