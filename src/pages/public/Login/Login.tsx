import { CommonButton, Loader } from "../../../components/ui";
import logo from "../../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../api/api";
import { Col, Row } from "react-bootstrap";
import loginImg from "../../../assets/images/login-img.png";
import "./Login.scss";
import BackIcon from "../../../assets/svg/BackIcon.svg";

const Login = () => {
  // state
  const [gitLoginSuccess, setGitLoginSuccess] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // React Router hook for changing routes
  const { login } = api; // API endpoint URLs

  // This effect runs whenever gitLoginSuccess changes its value
  useEffect(() => {
    // For now, it's just setting gitLoginSuccess to true, which triggers this effect again.
    // This effect seems redundant, and you might want to remove it or add more logic here.
    setGitLoginSuccess(true);
  }, [gitLoginSuccess]);

  useEffect(() => {
    setError("");
    setToken("");
  }, [showInput]);

  // This effect runs whenever the value of localStorage.getItem("isLogged") changes
  useEffect(() => {
    // If a token is found in the local storage, redirect to the dashboard
    if (localStorage.getItem("isLogged")) navigate("/auth/projects");
  }, [localStorage.getItem("isLogged")]);

  const onSubmit = (e: any, response: any) => {
    e.preventDefault();
    onSuccess(response);
  };
  // Function to handle the success response after GitHub login
  const onSuccess = async (response: any) => {
    setLoader(true);
    // Check if the response contains a code
    if (response.code) {
      // Check if gitLoginSuccess state is true (it always is based on the previous useEffect)
      if (gitLoginSuccess) {
        try {
          // Send a request to the server with the received code
          const gitCode = await axios.post(login(), {
            access_token: response?.code,
          });
          // Check if the server response contains a data
          if (gitCode?.data?.data?.gitId) {
            // Store the data in local storage
            localStorage.setItem("isLogged", JSON.stringify(gitCode.data.data));
            // Reload the window (this might not be necessary, depending on your use case)
            window.location.reload();
            // Redirect to the dashboard
          } else {
            setError("Please enter valid token");
          }
        } catch (e) {
          setError("Please enter valid token");
        }
      }
    }

    setLoader(false);
  };

  // Function to handle the failure response after GitHub login
  const onFailure = (response: any) => console.error(response, "error");

  return (
    <div className="login-page">
      {loader ? <Loader /> : null}
      <Row className="mx-0">
        <Col className="login-page-left d-md-flex d-none" xl={8} md={7}>
          <div className="text-center login-page-left-img">
            <img src={loginImg} alt="login-img" />
          </div>
        </Col>

        <Col className="login-page-right" xl={4} md={5}>
          <div className="login-card">
            <div className="mb-4 mb-md-5">
              <img src={logo} alt="logo" />
            </div>
            <h4>Login via github account </h4>
            {showInput ? (
              <button
                className="backButton"
                onClick={() => setShowInput(false)}
              >
                <img src={BackIcon} alt="Back" />
              </button>
            ) : null}
            <div className="login-card-btns">
              <CommonButton
                title="GitHub Access Token"
                className={showInput ? "simpleText" : "primary"}
                onClick={() => setShowInput(true)}
              />

              {showInput ? (
                <div className={`common_input`}>
                  <form onSubmit={(e) => onSubmit(e, { code: token })}>
                    <input
                      className="form-control"
                      type="password"
                      onChange={(e) => {
                        setToken(e.target.value);
                        setError("");
                      }}
                      placeholder="Enter Token"
                    />
                    <span className="text-danger">{error ? error : null}</span>
                    <CommonButton
                      className=" primary my-4 w-100"
                      title="Submit"
                      disabled={!token || Boolean(error)}
                      onClick={() => onSuccess({ code: token })}
                    />
                  </form>
                </div>
              ) : (
                <CommonButton
                  title="SignIn with GitHub"
                  className=""
                  functionType="gitlogin"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  redirectUri={process.env.REACT_APP_REDIRECT_URI}
                  clientId={process.env.REACT_APP_CLIENT_ID}
                />
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
