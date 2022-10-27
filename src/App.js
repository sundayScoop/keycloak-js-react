import React from "react";
import "./styles.css";
import Keycloak from "keycloak-js";

export default function App() {
  // function initKeycloak() {
  var keycloak = new Keycloak({
    url: "http://192.168.100.102/auth/",
    realm: "Jobseeker",
    clientId: "job-seekers-webapp-local"
  });

  keycloak
    .init()
    .then(function (authenticated) {
      alert(authenticated ? "authenticated" : "not authenticated");
    })
    .catch(function () {
      alert("failed to initialize");
    });

  const loginUrl = keycloak.createLoginUrl({
    scope: "openid",
    redirectUri: "http://192.168.100.205:30300/?callback=1",
    locale: "en"
  });

  const registerUrl = keycloak.createRegisterUrl({
    scope: "openid email",
    redirectUri: "http://localhost:3020/code",
    locale: "en",
    action: "register",
    prompt: "login"
  });

  console.log('registerUrl', registerUrl)
  console.log('loginUrl', loginUrl)

  const handleRegisterClick = () => {
    keycloak
      .register({
        scope: "openid",
        redirectUri: "http://localhost:3020/code",
        locale: "en",
        action: "register",
        prompt: "login"
      })
      .then((result) => {
        console.log("result", result);
      });
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <a href={loginUrl} rel="noreferrer" target="_blank">
        loginUrl
      </a>
      <h2>Start editing to see some magic happen!</h2>
      <a href={registerUrl} rel="noreferrer" target="_blank">
        registerUrl
      </a>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={handleRegisterClick}>registerButton</button>
    </div>
  );
}
