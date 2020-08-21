import React from "react";
import { Col, FormGroup, Label } from "reactstrap";
import Select from "react-select";

const MultipleSelect = props => {
  const { value, options, vertical, onChange, label } = props;
  return (
    <FormGroup row>
      <Col md="3">
        <Label style={{ display: vertical ? "none" : "block" }}>
          {label} <span style={{ color: "red" }}>*</span>
        </Label>
      </Col>
      <Col xs="12" md="9">
        {vertical ? (
          <Label>
            {label} <span style={{ color: "red" }}>*</span>
          </Label>
        ) : null}
        <Select
          value={value}
          options={options}
          isMulti={true}
          onChange={onChange}
          styles={{
            control: (base, state) => ({
              ...base,
              "&:hover": {
                borderColor: "#8ad4ee",
                boxShadow: "0 0 0 0.2rem rgba(32, 168, 216, 0.25)"
              },
              border: "1px solid lightgray",
              boxShadow: state.isFocused
                ? "0 0 0 0.2rem rgba(32, 168, 216, 0.25)"
                : 0
            }),
            menuPortal: base => ({ ...base, zIndex: 9999 })
          }}
          menuPortalTarget={document.body}
        />
      </Col>
    </FormGroup>
  );
};

export default MultipleSelect;
