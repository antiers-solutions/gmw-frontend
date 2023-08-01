import { ReactNode } from "react";

const TextError = (props: { children?: ReactNode }) => {
  return <div className="text-error">{props.children}</div>;
};

export default TextError;
