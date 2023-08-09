import React from "react";
import "./CommonButton.scss";
import GitHubLogin from "react-github-login";

const CommonButton = ({
  type,
  title,
  className,
  onClick,
  onSuccess,
  onFailure,
  functionType,
  clientId,
  redirectUri,
  disabled,
}: {
  type?: "button" | "submit" | "reset" | undefined;
  title?: any;
  className?: any;
  onClick?: any;
  onSuccess?: any;
  onFailure?: any;
  functionType?: string;
  clientId?: string;
  redirectUri?: string;
  disabled?: boolean;
}) => {
  return (
    <>
      {functionType === "gitlogin" ? (
        <GitHubLogin
          type={type}
          onClick={onClick}
          clientId={clientId}
          onSuccess={onSuccess}
          onFailure={onFailure}
          redirectUri={redirectUri}
          className={`btn-style ${className}`}
        >
          {title}
        </GitHubLogin>
      ) : (
        <button
          type={type}
          onClick={onClick}
          className={`btn-style ${className}`}
          disabled={disabled}
        >
          {title}
        </button>
      )}
    </>
  );
};

export default CommonButton;
