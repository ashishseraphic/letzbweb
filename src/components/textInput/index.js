import React from "react";
import { Col, FormGroup, Label } from "reactstrap";
import { AvField } from "availity-reactstrap-validation";

const TextInput = props => {
  const {
    name,
    value,
    type,
    onChange,
    placeholder,
    vertical,
    label,
    required,
    disabled
  } = props;
  return (
    <FormGroup row>
      <Col md="3">
        <Label htmlFor="name" style={{ display: vertical ? "none" : "block" }}>
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </Label>
      </Col>
      <Col xs="12" md="9">
        {vertical ? (
          <Label htmlFor="name">
            {label} <span style={{ color: "red" }}>*</span>
          </Label>
        ) : null}
        <AvField
          required={required ? required : true}
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled ? disabled : false}
        />
      </Col>
    </FormGroup>
  );
};

export default TextInput;
