import React, { ReactNode } from "react";
import "./Select.scss";
import Select from "react-select";

type valueType = { value: string | number; label: string | ReactNode };
type propsType = {
  defaultValue?: valueType;
  onChange?: any;
  options?: valueType[];
  menuIsOpen?: boolean;
  className?: string;
  name?: string;
  label?: string;
  value?: any;
};

const CustomSelect = ({
  className,
  menuIsOpen,
  defaultValue,
  onChange,
  options,
  name,
  value,
  label,
}: propsType) => {
  return (
    <>
      {label && <label className="form-label">{label}</label>}
      <Select
        defaultValue={defaultValue}
        onChange={onChange}
        options={options}
        className={`common_select ${className}`}
        classNamePrefix={"select"}
        menuIsOpen={menuIsOpen}
        name={name}
        isSearchable={false}
        value={value}
      />
    </>
  );
};

export default CustomSelect;
