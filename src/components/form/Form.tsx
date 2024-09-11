import { MutableRefObject, useRef, useState } from "react";
import Input from "../input/Input";

export default function Form() {
  const emailRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const passwordRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);

  const validationCheck = () => {
    const email = emailRef.current;
    const password = passwordRef.current;

    if (!email || !password) return;

    setIsEmailValid(email.checkValidity());
    setIsPasswordValid(password.checkValidity());

    // //

    // email.classList.remove("login-form__input--invalid");
    // password.classList.remove("login-form__input--invalid");

    // let result = true;

    // //TODO refactoring
    // const emailErrorMessage = document.getElementById("email-error-message");
    // if (email.checkValidity()) {
    //   emailErrorMessage!.innerText = "";
    //   email.setAttribute("aria-invalid", "false");
    //   email.removeAttribute("aria-describedby");
    //   email.classList.remove("login-form__input--invalid");
    //   const passwordErrorMessage = document.getElementById(
    //     "password-error-message"
    //   );
    //   if (password.checkValidity()) {
    //     passwordErrorMessage!.innerText = "";
    //     password.setAttribute("aria-invalid", "false");
    //     password.removeAttribute("aria-describedby");
    //     password.classList.remove("login-form__input--invalid");
    //   } else {
    //     passwordErrorMessage!.innerText =
    //       "Error in Password Field: " + password.validationMessage;
    //     password.setAttribute("aria-invalid", "true");
    //     password.setAttribute("aria-describedby", "password-error-message");
    //     password.classList.add("login-form__input--invalid");
    //     password.focus();
    //     result = false;
    //   }
    // } else {
    //   emailErrorMessage!.innerText =
    //     "Error in Email Field: " + email.validationMessage;
    //   email.setAttribute("aria-invalid", "true");
    //   email.setAttribute("aria-describedby", "email-error-message");
    //   email.classList.add("login-form__input--invalid");
    //   email.focus();
    //   result = false;
    // }
    // // EO TODO refactoring

    // return result;
  };

  const handleValidation = () => {
    validationCheck(); // return invalid field ID instead of boolean

    // (document.getElementById("password") as HTMLInputElement).value = "";
    if (isEmailValid && isPasswordValid) {
      //sendToserver();
      //TODO if server response error
      // document
      //   .getElementById("serverMessage")
      //   ?.classList.toggle("login-form__server-message--hidden");
      // (document.getElementById("email") as HTMLInputElement).focus();
      //TODO if server response ok
      // ... setState(loggedUser), setState("show success block")
    }
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
          handleValidation();
          console.log("post to server + server validation");
        }}
      >
        <fieldset className="login-form__fieldset">
          <legend className="login-form__legend">Login Form</legend>
          <input id="anti-csrf-token" type="hidden" value="some-uuid"></input>

          <div
            className="login-form__inputs-wrapper"
            // onKeyDown={function (e) {
            //   if (e.key !== "Enter") return;
            //   handleValidation();
            //   console.log("client validation 1");
            // }}
          >
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
            />
            <Input
              id="password"
              type="password"
              isRequred={true}
              labelText="Password"
              ref={passwordRef}
              isValid={isPasswordValid}
            />
          </div>

          <button
            className="login-form__submit-btn"
            type="submit"
            onClick={function (e) {
              handleValidation();
              console.log("client validation 2");
            }}
          >
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
}
