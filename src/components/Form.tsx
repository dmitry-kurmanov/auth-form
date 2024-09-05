import "./Form.scss";

export default function Form() {
  const validationCheck = (): boolean => {
    //TODO add input.validationMessage to // aria-invalid="true"
    // aria-errormessage and span with id //
    //   https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-errormessage
    // input..checkValidity() onSubmit
    return true;
  };

  return (
    <div className="login-form">
      <h1 aria-hidden="true">Login Form</h1>
      <form className="login-form__form">
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
              aria-describedby="email-error-message-1"
            ></input>
            <span
              id="email-error-message"
              className="login-form__input-error-message"
            >
              Error: Enter a valid email address
            </span>
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
              aria-describedby="password-error-message-1"
            ></input>
            <span
              id="password-error-message"
              className="login-form__input-error-message"
            >
              Error: Enter a valid password
            </span>
          </div>

          <button
            onClick={function (e) {
              e.preventDefault();
              const isValid = validationCheck();
              if (isValid) {
                //sendToserver();
                //TODO if server response error
                (
                  document.getElementById("password") as HTMLInputElement
                ).value = "";
                (document.getElementById("email") as HTMLInputElement).focus();
                document
                  .getElementById("serverMessage")
                  ?.classList.toggle("login-form__server-message--hidden");
                //TODO if server response ok
                // ... setState(loggedUser), setState("show success block")
              }
            }}
          >
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
}
