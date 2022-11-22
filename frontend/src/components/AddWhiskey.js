import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/WhiskeyForm.css";
import WhiskeyDataService from "../services/whiskies";

let tags = [];

const AddWhiskey = (props) => {
  const [user, setUser] = useState();
  const [editing, setEditing] = useState(false);
  const [whiskeyId, setWhiskeyId] = useState();
  const [whiskey, setWhiskey] = useState();

  const location = useLocation();
  const navigate = useNavigate();

  const checkWhiskey = () => {
    if (location.pathname.split("/")[1] === "editwhiskey") {
      setWhiskeyId(location.pathname.split("/")[2]);
    }
    if (whiskeyId) {
      WhiskeyDataService.find(whiskeyId, "id")
        .then((res) => {
          setWhiskey(res.data.whiskies[0]);
          tags = res.data.whiskies[0].tags;
          createTag();
          setInputData(res.data.whiskies[0]);
          setEditing(true);
        })
        .catch((err) => {
          console.log(`Error when using find: ${err}`);
        });
    }
  };

  useEffect(() => {
    checkWhiskey();
    setUser(props.user);
  }, [whiskeyId, user, props.user]);

  const [inputData, setInputData] = useState({
    whiskeyTitle: "default",
    distillery: [],
    cask: "",
    alc: 0,
    region: "",
    country: "",
    description: "",
    price: 0,
    tags: [],
  });

  const changeData = async (e) => {
    if (e.target.name === "alc" || e.target.name === "price") {
      // Checks the input string of alc and price inputs and changes them into float numbers
      setInputData({
        ...inputData,
        [e.target.name]: parseFloat(e.target.value.replace(",", ".")),
      });
    } else setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const whiskey = {
      whiskeyTitle: inputData.whiskeyTitle,
      distillery: inputData.distillery,
      cask: inputData.cask,
      alc: inputData.alc,
      region: inputData.region,
      country: inputData.country,
      description: inputData.description,
      price: inputData.price,
      tags: inputData.tags,
    };

    console.log("input whiskey", whiskey);

    if (location.pathname.split("/")[1] === "editwhiskey") {
      const config = {
        method: "put",
        url: `${process.env.REACT_APP_WHISKEY_URL}/action?id=${whiskeyId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(whiskey),
      };

      await axios(config)
        .then(function (response) {
          console.log("whiskey edited: ", JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (location.pathname.split("/")[1] === "addwhiskey") {
      let config = {
        method: "post",
        url: process.env.REACT_APP_WHISKEY_URL + "/action",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(whiskey),
      };

      await axios(config)
        .then(function (response) {
          console.log("whiskey added: ", JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    navigate("/");
  };

  const deleteWhiskey = async (e) => {
    e.preventDefault();

    await WhiskeyDataService.deleteWhiskey(whiskeyId)
      .then((res) => console.log("delete res", res))
      .catch((err) => {
        console.log(err);
      });
    navigate("/");
  };

  // ****** ADDING TAGS ******

  const addTag = async (e) => {
    // removing unwanted spaces from user tag
    let tagArr = e.target.value.replace(/\s+/g, " ");
    if (tagArr.length > 1) {
      if (e.key === ",")
        if (tags.length < maxTags) {
          tagArr.split(",").forEach((tag) => {
            // makes sure no dublicates are imported
            if (!tags.includes(tag) && tag.length > 1) {
              tags.push(tag);
              createTag(tag);
              setInputData({ ...inputData, tags });
              e.target.value = "";
            }
          });
        }
    }
  };
  // creates single tag elements from the tag array
  // const liTagArr = [];
  const createTag = () => {
    // empties the tagBox so there will be no dublicates
    const tagBox = document.querySelector(".tagBox");
    tagBox.querySelectorAll("li").forEach((li) => li.remove());
    // reverses the tags array so that the latest tag will be last one in the tagBox
    tags
      .slice()
      .reverse()
      .forEach((tag) => {
        let liTag = document.createElement("li");

        // adds tag inside the newly created li and creates the remove span icon inside li
        liTag.innerHTML = `${tag}<span>x</span>`;
        // adds event listener for the remove span icon
        liTag.children[0].addEventListener("click", (event) => {
          // removes the tag from the tags array and from DOM
          let index = tags.indexOf(tag);
          if (index !== -1) {
            tags.splice(index, 1);
            event.target.parentNode.remove();
          }
          countTag();
        });
        // adds the li element to tagBox
        tagBox.prepend(liTag);
        countTag();
      });
  };

  // gets rids of the comma in the input field after adding the tag
  const checkComma = (e) => {
    if (e.target.value === ",") {
      e.target.value = "";
    }
  };

  let maxTags = 5;
  const countTag = () => {
    const span = document.querySelector(".tagSpan");
    span.innerText = maxTags - tags.length;
  };

  // *** Will be used in later development!
  // const emptyTags = (e) => {
  //   tags = [];
  //   const tagBox = document.querySelector(".tagBox");
  //   tagBox.querySelectorAll("li").forEach((li) => li.remove());
  //   countTag();
  // };

  // ******************

  // ***** ADDING DISTILLERY AND CASK ******
  // Adds a distillery value to the distilleryArray seperated by comma (',') and trims white space from both ends
  const addDistillery = (e) => {
    let distillery = [];
    let distString = e.target.value;
    let trimArr = distString.split(",");
    trimArr.forEach((dist) => {
      let trimmedDist = dist.trim();
      if (trimmedDist.length > 0) distillery.push(trimmedDist);
    });
    setInputData({ ...inputData, distillery });
  };

  const addCask = (e) => {
    let cask = [];
    let caskString = e.target.value;
    let trimArr = caskString.split(",");
    trimArr.forEach((dist) => {
      let trimmedCask = dist.trim();
      if (trimmedCask.length > 0) cask.push(trimmedCask);
    });
    setInputData({ ...inputData, cask });
  };

  if (user) {
    return (
      <div className="formContainer">
        <h1>{editing ? "Edit whiskey" : "Add whiskey"}</h1>
        {editing ? (
          <form
            className="deleteWhiskeyForm"
            onSubmit={(e) => deleteWhiskey(e)}
          >
            <button>Delete whiskey</button>
          </form>
        ) : (
          ""
        )}
        <form
          onKeyPress={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
          onSubmit={onSubmit}
        >
          <div className="form-group">
            <label htmlFor="whiskeyTitle">Whiskey name</label>
            <input
              type="text"
              className="form-control"
              id="whiskeyTitle"
              name="whiskeyTitle"
              defaultValue={whiskey ? whiskey?.whiskeyTitle : ""}
              placeholder="e.g. Kyrö Wood Smoke"
              onChange={changeData}
            />
          </div>
          <div className="form-group">
            <label htmlFor="distillery">Distillery</label>
            <input
              type="text"
              className="form-control"
              id="distillery"
              name="distillery"
              defaultValue={whiskey ? whiskey?.distillery : ""}
              placeholder="e.g. Kyrö Distillery"
              onChange={addDistillery}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cask">Cask</label>
            <input
              type="text"
              className="form-control"
              id="cask"
              name="cask"
              defaultValue={whiskey ? whiskey?.cask : ""}
              placeholder="e.g. Sherry/Amarone"
              onChange={addCask}
            />
          </div>
          <div className="form-group">
            <label htmlFor="alc">Alcohol &#8240; </label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              id="alc"
              name="alc"
              defaultValue={whiskey ? whiskey?.alc : ""}
              placeholder="e.g. 52"
              onChange={changeData}
            />
          </div>
          <div className="form-group">
            <label htmlFor="region">Region</label>
            <input
              type="text"
              className="form-control"
              id="region"
              name="region"
              defaultValue={whiskey ? whiskey?.region : ""}
              placeholder="e.g. Osterbothnia"
              onChange={changeData}
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              className="form-control"
              id="country"
              name="country"
              defaultValue={whiskey ? whiskey?.country : ""}
              placeholder="e.g. Finland"
              onChange={changeData}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              defaultValue={whiskey ? whiskey?.description : ""}
              rows="3"
              onChange={changeData}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price for 2cl in €</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              id="price"
              name="price"
              defaultValue={whiskey ? whiskey?.price : ""}
              placeholder="e.g. 500"
              onChange={changeData}
            />
          </div>
          <div className="my-1 wrapper form-control">
            <label htmlFor="tags">Tags</label>
            <div className="content">
              <ul className="tagBox">
                <input
                  type="text"
                  id="tags"
                  onKeyDown={addTag}
                  onKeyUp={checkComma}
                  defaultValue={tags ? "" : ""}
                  placeholder="Enter comma after each tag"
                />
              </ul>
            </div>
            <div className="details">
              <p className="tagPar my-2">
                <span className="tagSpan">{maxTags}</span> tags are remaining
              </p>
            </div>
          </div>
          <button
            className="button form-control"
            type="submit"
            value="Add whiskey"
            onClick={onSubmit}
          >
            {editing ? "Edit whiskey" : "Add whiskey"}
          </button>
        </form>
      </div>
    );
  } else {
    return <div style={{ color: "white" }}>Not logged in!</div>;
  }
};

export default AddWhiskey;
