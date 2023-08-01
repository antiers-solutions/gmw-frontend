import Input from "./Input/Input";

function FormikControls(props: any) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    // case "checkbox":
    //   return <Checkbox {...rest} />;
    default:
      return null;
  }
}

export default FormikControls;
