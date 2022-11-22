import React, { useState, useEffect } from "react";

import "../style/WhiskiesList.css";

import WhiskeyCard from "./WhiskeyCard";
import WhiskeyDataService from "../services/whiskies";
import SelectComponent from "./SelectComponent";

let optionsArr = [{ value: "", label: "All Distilleries" }];

const WhiskiesList = (props) => {
  const [scotland, setScotland] = useState([]);
  const [ireland, setIreland] = useState([]);
  const [finland, setFinland] = useState([]);
  const [japan, setJapan] = useState([]);
  const [usa, setUsa] = useState([]);
  const [filtersOn, setFiltersOn] = useState(false);
  const [othersCounties, setOtherCountries] = useState([]);
  const [options, setOptions] = useState([]);
  const user = props.user;

  useEffect(() => {
    retrieveWhiskies();
    retrieveDistilleries();
  }, []);

  // DATA RETRIEVAL FUNCTIONS
  const retrieveWhiskies = () => {
    WhiskeyDataService.getWhiskies()
      .then((res) => {
        sortWhiskies(res.data.whiskies);
        setFiltersOn(false);
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

  const sortWhiskies = async (whiskeyData) => {
    let scotchArr = [];
    let irishArr = [];
    let finnishArr = [];
    let japaneseArr = [];
    let usaArr = [];
    let othersArr = [];

    await whiskeyData.forEach((whiskey) => {
      if (whiskey.country === "Scotland") {
        scotchArr.push(whiskey);
      } else if (whiskey.country === "Ireland") {
        irishArr.push(whiskey);
      } else if (whiskey.country === "Finland") {
        finnishArr.push(whiskey);
      } else if (whiskey.country === "Japan") {
        japaneseArr.push(whiskey);
      } else if (whiskey.country === "USA") {
        usaArr.push(whiskey);
      } else {
        othersArr.push(whiskey);
      }
    });

    setScotland(scotchArr);
    setIreland(irishArr);
    setFinland(finnishArr);
    setJapan(japaneseArr);
    setUsa(usaArr);
    setOtherCountries(othersArr);
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

  const findByCask = (e) => {
    goToTop();
    find(e.currentTarget.value, "cask");
  };

  const findByTag = (e) => {
    goToTop();
    find(e.target.value, "tags");
  };

  const find = async (query, by) => {
    await WhiskeyDataService.find(query, by)
      .then((res) => {
        sortWhiskies(res.data.whiskies);
      })
      .catch((err) => {
        console.log(`Error when using find: ${err}`);
      });
    setFiltersOn(true);
  };

  const epmtyFiltersHandler = () => {
    retrieveWhiskies();
  };

  // ******

  const goToTop = () => {
    window.scrollTo({
      top: 200,
      behavior: "smooth",
    });
  };

  return (
    <section className="whiskieListPageContainer">
      <img
        className="logo"
        alt="Barley & Bait logo"
        src={require("../img/BARLEY-BAIT_logo_round_white-white.png")}
        onClick={() => window.location.reload()}
      ></img>
      <div className="searchBars">
        <div className="searchContainer form-inline">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search by title"
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
      {filtersOn ? (
        <button className="emptyFilters" onClick={epmtyFiltersHandler}>
          empty filters
        </button>
      ) : (
        <div style={{ visibility: "hidden" }} className="fill"></div>
      )}
      <div className="whiskeyListContainer">
        {scotland.length > 0 ? <h2 className="countryLabel">SCOTLAND</h2> : ""}
        {scotland?.map((whiskey, i) => {
          return (
            <WhiskeyCard
              whiskey={whiskey}
              key={i}
              tagClicked={(e) => findByTag(e)}
              caskClicked={(e) => findByCask(e)}
              user={user}
            />
          );
        })}
        {ireland.length > 0 ? <h2 className="countryLabel">IRELAND</h2> : ""}
        {ireland?.map((whiskey, i) => {
          return (
            <WhiskeyCard
              whiskey={whiskey}
              key={i}
              tagClicked={(e) => findByTag(e)}
              caskClicked={(e) => findByCask(e)}
              user={user}
            />
          );
        })}
        {finland.length > 0 ? <h2 className="countryLabel">FINLAND</h2> : ""}
        {finland?.map((whiskey, i) => {
          return (
            <WhiskeyCard
              whiskey={whiskey}
              key={i}
              tagClicked={(e) => findByTag(e)}
              caskClicked={(e) => findByCask(e)}
              user={user}
            />
          );
        })}
        {japan.length > 0 ? <h2 className="countryLabel">JAPAN</h2> : ""}
        {japan?.map((whiskey, i) => {
          return (
            <WhiskeyCard
              whiskey={whiskey}
              key={i}
              tagClicked={(e) => findByTag(e)}
              caskClicked={(e) => findByCask(e)}
              user={user}
            />
          );
        })}
        {usa.length > 0 ? <h2 className="countryLabel">USA</h2> : ""}
        {usa?.map((whiskey, i) => {
          return (
            <WhiskeyCard
              whiskey={whiskey}
              key={i}
              tagClicked={(e) => findByTag(e)}
              caskClicked={(e) => findByCask(e)}
              user={user}
            />
          );
        })}
        {othersCounties.length > 0 ? (
          <h2 className="countryLabel">OTHER COUNTRIES</h2>
        ) : (
          ""
        )}
        ;
        {othersCounties?.map((whiskey, i) => {
          return (
            <WhiskeyCard
              whiskey={whiskey}
              key={i}
              tagClicked={(e) => findByTag(e)}
              caskClicked={(e) => findByCask(e)}
              user={user}
            />
          );
        })}
      </div>
    </section>
  );
};

export default WhiskiesList;
