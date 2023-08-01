import { ReactNode } from "react";
import { Field, ErrorMessage } from "formik";
import Form from "react-bootstrap/Form";
import TextError from "../TextError/TextError";
import "./Input.scss";

interface IProps {
  label?: string;
  name?: any;
  formik?: any;
  children?: ReactNode;
  className?: string;
  type?: string;
  onChange?: () => void;
}

const Input: React.FC<IProps> = (props) => {
  const { ...rest } = props;

  return (
    <Form.Group
      className={`common_input ${props.className ? props.className : ""} ${
        props.formik.values[props.name] ? "hasFilled" : ""
      } ${
        props.formik.touched[props.name] && props.formik.errors[props.name]
          ? "common_input--error"
          : ""
      }`}
      controlId={props.name}
    >
      {props.label && <Form.Label>{props.label}</Form.Label>}
      <Field className="form-control" name={props.name} {...rest} />
      {props.name && <ErrorMessage name={props.name} component={TextError} />}
    </Form.Group>
  );
};

export default Input;
