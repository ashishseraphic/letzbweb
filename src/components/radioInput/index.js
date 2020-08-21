import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const RadioInput = props => {
  const { name, value, label, onChange, checked, disabled } = props;
  return (
    <FormGroup check inline>
      <Label check>
        <Input
          className="form-check-input"
          type="radio"
          id={label}
          name={name}
          value={value}
          onChange={onChange}
          checked={checked}
          disabled={disabled ? disabled : false}
        />
        {/* <AvRadioGroup name={name} label="" required errorMessage="Pick one!">
          <AvRadio label={label} value={value} />
          <AvRadio label={label} value="Squirtle" />
          <AvRadio label={label} value="Charmander" />
          <AvRadio label="Pikachu" value="Pikachu" disabled />
        </AvRadioGroup> */}
        {label}
      </Label>
    </FormGroup>
  );
};

export default RadioInput;
