import React from "react";
import Select from "react-select";

const selectStyles = {
  menu: (provided) => ({
    ...provided,
  }),

  control: (provided, { isSelected, isFocused }) => ({
    ...provided,
    outline: "none",
    border: "1px solid orange",
    borderRadius: "1em",
    boxShadow: "none",
    backgroundColor: "trasparent",
    "&:hover": {
      borderColor: "orange",
      color: "red",
    },
  }),

  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? "orange"
        : isFocused
        ? " #dd8023"
        : undefined,

      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? "blue"
            : "green"
          : undefined,
      },
    };
  },

  input: (styles) => ({ ...styles }),
  placeholder: (styles) => ({ ...styles }),

  singleValue: (styles, { isFocused }) => ({
    ...styles,
    color: isFocused ? "" : "white",
  }),
};

const SelectComponent = (props) => {
  return (
    <Select
      className="selectComponent"
      options={props.options}
      onChange={props.onChange}
      styles={selectStyles}
      placeholder={
        <div style={{ color: "rgb(158, 154, 154)" }}>Select distillery</div>
      }
    />
  );
};

export default SelectComponent;
