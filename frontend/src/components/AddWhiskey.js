import React, { useState } from "react";
import "../style/WhiskeyForm.css";
let tags = [];

const AddWhiskey = () => {
  const [inputData, setInputData] = useState({
    whiskeyTitle: "default",
    distillery: "",
    region: "",
    country: "",
    description: "",
    price: 0,
    tags: [],
  });

  const changeData = async (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const whiskey = {
      whiskeyTitle: inputData.whiskeyTitle,
      distillery: inputData.distillery,
      region: inputData.region,
      country: inputData.country,
      description: inputData.description,
      price: inputData.price,
      tags: inputData.tags,
    };

    console.log("whiskey:", whiskey);
    // window.location = "/";
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
  const liTagArr = [];
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

  const emptyTags = (e) => {
    tags = [];
    const tagBox = document.querySelector(".tagBox");
    tagBox.querySelectorAll("li").forEach((li) => li.remove());
    countTag();
  };

  // ******************
  return (
    <div className="formContainer">
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
            placeholder="e.g. Kyrö Distillery"
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
        <input
          className="button form-control"
          type="submit"
          value="Add whiskey"
          onClick={onSubmit}
        />
      </form>
    </div>
  );
};

export default AddWhiskey;
