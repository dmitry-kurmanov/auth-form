import "./Form-UX.scss";
import "./Form-UI.scss";

export default function Form() {
  const validationCheck = (): boolean => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let result = true;

    //TODO refactoring
    const emailErrorMessage = document.getElementById("email-error-message");
    if (email.checkValidity()) {
      emailErrorMessage!.innerText = "";
      email.setAttribute("aria-invalid", "false");
      email.removeAttribute("aria-describedby");

      const passwordErrorMessage = document.getElementById(
        "password-error-message"
      );
      if (password.checkValidity()) {
        passwordErrorMessage!.innerText = "";
        password.setAttribute("aria-invalid", "false");
        password.removeAttribute("aria-describedby");
      } else {
        passwordErrorMessage!.innerText =
          "Error: " + password.validationMessage;
        password.setAttribute("aria-invalid", "true");
        password.setAttribute("aria-describedby", "password-error-message");
        password.focus();
        result = false;
      }
    } else {
      emailErrorMessage!.innerText = "Error: " + email.validationMessage;
      email.setAttribute("aria-invalid", "true");
      email.setAttribute("aria-describedby", "email-error-message");
      email.focus();
      result = false;
    }
    // EO TODO refactoring

    return result;
  };

  return (
    <div className="login-form">
      <h1 className="login-form__header" aria-hidden="true">
        Login Form
      </h1>
      <form
        className="login-form__form"
        onSubmit={function (e) {
          e.preventDefault();
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
        }}
      >
        <fieldset className="login-form__fieldset">
          <legend className="login-form__legend">Login Form</legend>
          <div
            className="login-form__server-message login-form__server-message--hidden"
            role="alert"
            id="serverMessage"
          >
            Something went wrong...
          </div>
          <input id="anti-csrf-token" type="hidden" value="some-uuid"></input>

          <div className="login-form__input-wrapper">
            <label className="login-form__input-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="Please type email here..."
              className="login-form__input"
              aria-invalid="false"
              /* aria-errormessage is better than aria-describedby but unfortunatelly is not fully supported https://stackoverflow.com/a/78675883/6623551 */
              /*aria-errormessage="email-error-message"*/
            ></input>
            <span
              id="email-error-message"
              className="login-form__input-error-message"
            ></span>
          </div>

          <div className="login-form__input-wrapper">
            <label className="login-form__input-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              placeholder="Please type password here..."
              className="login-form__input"
              aria-invalid="false"
              /* aria-errormessage is better than aria-describedby but unfortunatelly is not fully supported https://stackoverflow.com/a/78675883/6623551 */
              /*aria-errormessage="password-error-message"*/
            ></input>
            <span
              id="password-error-message"
              className="login-form__input-error-message"
            ></span>
          </div>

          <button className="login-form__submit-btn">Submit</button>
        </fieldset>
      </form>
    </div>
  );
}
