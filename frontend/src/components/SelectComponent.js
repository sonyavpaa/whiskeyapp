import React from "react";
import Select from "react-select";

const selectStyles = {
  menu: (provided) => ({
    ...provided,
  }),

  control: (provided) => ({
    ...provided,
    border: "none",
    boxShadow: "none",
  }),

  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? "rgba(15, 19, 15, 0.891)"
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

  singleValue: (styles) => ({ ...styles }),
};

const SelectComponent = (props) => {
  return (
    <Select
      className="selectComponent"
      options={props.options}
      onChange={props.onChange}
      styles={selectStyles}
      placeholder="Select distillery"
    />
  );
};

export default SelectComponent;
