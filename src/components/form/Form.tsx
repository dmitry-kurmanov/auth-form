import { FormEvent, MutableRefObject, useRef, useState } from "react";
import Input from "../input/Input";

export default function Form() {
  const emailRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [emailValiddationMessage, setEmailValiddationMessage] =
    useState<string>("");

  const passwordRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [passwordValiddationMessage, setPasswordValiddationMessage] =
    useState<string>("");

  const [serverMessage, setServerMessage] = useState<string>("");

  const validationCheck = () => {
    console.log("validation check"); //TODO
    const email = emailRef.current;
    const password = passwordRef.current;

    if (!email || !password) return;

    setIsEmailValid(email.checkValidity());
    setEmailValiddationMessage(email.validationMessage);
    setIsPasswordValid(password.checkValidity());
    setPasswordValiddationMessage(password.validationMessage);
  };

  async function fetchMock(
    url: string,
    params: { method: string; body: FormData }
  ): Promise<{ ok: boolean; json?: Function; statusText?: string }> {
    console.log(`fetching from ${url} by method ${params.method}`); //TODO

    return new Promise((resolve, reject) => {
      // Fetch promises only reject with a TypeError when a network error occurs.
      // if ("network error occurs") {
      //   reject("network error occurs");
      //   return;
      // }

      const email = params.body.get("email");
      const password = params.body.get("password");

      setTimeout(() => {
        if (email === "test@mail.org" && password === "123") {
          resolve({
            ok: true,
            json: () => {
              return { loginToken: 123123123 };
            },
            statusText: "Successfully Logged In",
          });
        } else {
          resolve({ ok: false, statusText: "Wrong Credentials" });
        }
      }, 3000);
    });
  }

  const submitForm = (e: FormEvent) => {
    if (!isEmailValid || !isPasswordValid) return;

    console.log("submit form"); //TODO

    const form = e.target as HTMLFormElement;

    fetchMock(form.action, { method: "post", body: new FormData(form) })
      .then((response) => {
        if (response.ok) {
          if (!response.json) {
            setServerMessage(
              `Server responded the bad answer. Please cotact our support team to resolve the problem.`
            );
            return;
          }
          console.dir(response.json().loginToken);
          setServerMessage("");
        } else {
          setServerMessage(`Can't login... ${response.statusText}`);
          emailRef.current?.focus();
        }
      })
      .catch((error) => {
        setServerMessage(`Something went wrong... ${error}`);
        emailRef.current?.focus();
      });

    //TODO if server response ok
    // ... setIsLogged(true)
    // show success text + alert for a11y something like "You are successfully logged in."
  };

  return (
    <div className="login-form">
      <h1 className="login-form__header" aria-hidden="true">
        Login
      </h1>
      <form
        className="login-form__form"
        action="/login"
        onSubmit={function (e: FormEvent) {
          e.preventDefault();
          submitForm(e);
        }}
      >
        <fieldset className="login-form__fieldset">
          <legend className="login-form__legend">Login Form</legend>
          <input id="anti-csrf-token" type="hidden" value="some-uuid"></input>

          <div className="login-form__inputs-wrapper">
            <div
              className={`login-form__server-message ${
                serverMessage ? "" : "login-form__server-message--hidden"
              }`}
              role="alert"
              id="serverMessage"
            >
              {serverMessage}
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
