import { MutableRefObject, useRef, useState } from "react";
import Input from "../input/Input";

export default function Form() {
  const emailRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const passwordRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [emailValiddationMessage, setEmailValiddationMessage] =
    useState<string>("");
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [passwordValiddationMessage, setPasswordValiddationMessage] =
    useState<string>("");

  const validationCheck = () => {
    console.log("validation check");
    const email = emailRef.current;
    const password = passwordRef.current;

    if (!email || !password) return;

    setIsEmailValid(email.checkValidity());
    setEmailValiddationMessage(email.validationMessage);
    setIsPasswordValid(password.checkValidity());
    setPasswordValiddationMessage(password.validationMessage);
  };

  const submitForm = () => {
    if (!isEmailValid || !isPasswordValid) return;
    console.log("go to server bro!");
    //sendToserver();
    //TODO if server response error
    // document
    //   .getElementById("serverMessage")
    //   ?.classList.toggle("login-form__server-message--hidden");
    // (document.getElementById("email") as HTMLInputElement).focus();
    //TODO if server response ok
    // ... setState(loggedUser), setState("show success block")
  };

  return (
    <div className="login-form">
      <h1 className="login-form__header" aria-hidden="true">
        Login
      </h1>
      <form
        className="login-form__form"
        onSubmit={function (e) {
          e.preventDefault();
          submitForm();
        }}
      >
        <fieldset className="login-form__fieldset">
          <legend className="login-form__legend">Login Form</legend>
          <input id="anti-csrf-token" type="hidden" value="some-uuid"></input>

          <div className="login-form__inputs-wrapper">
            <div
              className="login-form__server-message login-form__server-message--hidden"
              role="alert"
              id="serverMessage"
            >
              Something went wrong...
            </div>
            <Input
              id="email"
              type="email"
              isRequred={true}
              labelText="Email"
              ref={emailRef}
              isValid={isEmailValid}
              validationMessage={emailValiddationMessage}
            />
            <Input
              id="password"
              type="password"
              isRequred={true}
              labelText="Password"
              ref={passwordRef}
              isValid={isPasswordValid}
              validationMessage={passwordValiddationMessage}
            />
          </div>

          <button
            className="login-form__submit-btn"
            type="submit"
            onClick={function (e) {
              validationCheck();
            }}
          >
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
}
