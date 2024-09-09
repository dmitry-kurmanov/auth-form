import Input from "../input/Input";

export default function Form() {
  const validationCheck = (): boolean => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    email.classList.remove("login-form__input--invalid");
    password.classList.remove("login-form__input--invalid");

    let result = true;

    //TODO refactoring
    const emailErrorMessage = document.getElementById("email-error-message");
    if (email.checkValidity()) {
      emailErrorMessage!.innerText = "";
      email.setAttribute("aria-invalid", "false");
      email.removeAttribute("aria-describedby");
      email.classList.remove("login-form__input--invalid");
      const passwordErrorMessage = document.getElementById(
        "password-error-message"
      );
      if (password.checkValidity()) {
        passwordErrorMessage!.innerText = "";
        password.setAttribute("aria-invalid", "false");
        password.removeAttribute("aria-describedby");
        password.classList.remove("login-form__input--invalid");
      } else {
        passwordErrorMessage!.innerText =
          "Error in Password Field: " + password.validationMessage;
        password.setAttribute("aria-invalid", "true");
        password.setAttribute("aria-describedby", "password-error-message");
        password.classList.add("login-form__input--invalid");
        password.focus();
        result = false;
      }
    } else {
      emailErrorMessage!.innerText =
        "Error in Email Field: " + email.validationMessage;
      email.setAttribute("aria-invalid", "true");
      email.setAttribute("aria-describedby", "email-error-message");
      email.classList.add("login-form__input--invalid");
      email.focus();
      result = false;
    }
    // EO TODO refactoring

    return result;
  };

  const handleValidation = () => {
    const isValid = validationCheck(); // return invalid field ID instead of boolean
    (document.getElementById("password") as HTMLInputElement).value = "";
    if (isValid) {
      //sendToserver();
      //TODO if server response error
      document
        .getElementById("serverMessage")
        ?.classList.toggle("login-form__server-message--hidden");
      (document.getElementById("email") as HTMLInputElement).focus();
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
        }}
      >
        <fieldset className="login-form__fieldset">
          <legend className="login-form__legend">Login Form</legend>
          <input id="anti-csrf-token" type="hidden" value="some-uuid"></input>

          <div
            className="login-form__inputs-wrapper"
            onKeyDown={function (e) {
              if (e.key !== "Enter") return;
              handleValidation();
            }}
          >
            <div
              className="login-form__server-message login-form__server-message--hidden"
              role="alert"
              id="serverMessage"
            >
              Something went wrong...
            </div>
            <Input id="email" type="email" isRequred={true} labelText="Email" />
            <Input
              id="password"
              type="password"
              isRequred={true}
              labelText="Password"
            />
          </div>

          <button
            className="login-form__submit-btn"
            onClick={function (e) {
              handleValidation();
            }}
          >
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
}
