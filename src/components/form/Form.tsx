import { FormEvent, MutableRefObject, useRef, useState } from "react";
import Input from "./Input";
import Loading from "../loading/Loading";

export default function Form() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loginToken, setLoginToken] = useState<number | null>(null);

  const emailRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [emailValiddationMessage, setEmailValiddationMessage] =
    useState<string>("");

  const passwordRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [passwordValiddationMessage, setPasswordValiddationMessage] =
    useState<string>("");

  const [serverMessage, setServerMessage] = useState<string>("");

  const checkEmailValidation = () => {
    const email = emailRef.current!;
    setIsEmailValid(email.checkValidity());
    setEmailValiddationMessage(email.validationMessage);
  };

  const checkPasswordValidation = () => {
    const password = passwordRef.current!;
    setIsPasswordValid(password.checkValidity());
    setPasswordValiddationMessage(password.validationMessage);
  };

  async function fetchMock(
    url: string,
    params: { method: string; body: FormData }
  ): Promise<{
    ok: boolean;
    json?: () => { loginToken: number };
    statusText?: string;
  }> {
    console.info(`fetching from: ${url} by method: ${params.method}`);

    return new Promise((resolve /*, reject*/) => {
      // The Real Fetch only reject with a TypeError when a network error occurs.
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
      }, 2000);
    });
  }

  const submitForm = (e: FormEvent) => {
    if (!isEmailValid || !isPasswordValid) return;
    if (isSubmitting) return;

    setIsSubmitting(true);
    setLoginToken(null);
    document.body.setAttribute("aria-busy", "true");
    setServerMessage(`Submitting form...`);

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
          setLoginToken(response.json().loginToken);
          setServerMessage("You Are Successfully Logged In!");
        } else {
          setServerMessage(`Can't login... ${response.statusText}`);
          emailRef.current?.focus();
        }
      })
      .catch((error) => {
        setServerMessage(`Something went wrong... ${error}`);
        emailRef.current?.focus();
      })
      .finally(() => {
        setIsSubmitting(false);
        document.body.removeAttribute("aria-busy");
      });
  };

  const getServerMessageClasses = () => {
    const base = "login-form__server-message";
    let modificators = "";
    if (isSubmitting) {
      modificators = `${base}--visually-hidden`;
    } else if (loginToken) {
      modificators = `${base}--success`;
    }
    return `${base} ${modificators}`;
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
            <label
              className={getServerMessageClasses()}
              aria-live="polite"
              id="serverMessage"
            >
              {serverMessage}
            </label>
            <Input
              id="email"
              type="email"
              autocomplete="email"
              isRequred={true}
              labelText="Email"
              ref={emailRef}
              isValid={isEmailValid}
              validationMessage={emailValiddationMessage}
              onInputCallback={() => {
                if (isEmailValid) return;
                checkEmailValidation();
              }}
            />
            <Input
              id="password"
              type="password"
              autocomplete="current-password"
              isRequred={true}
              labelText="Password"
              ref={passwordRef}
              isValid={isPasswordValid}
              validationMessage={passwordValiddationMessage}
              onInputCallback={() => {
                if (isPasswordValid) return;
                checkPasswordValidation();
              }}
            />
          </div>

          <button
            className="login-form__submit-btn"
            type="submit"
            onClick={function () {
              checkEmailValidation();
              checkPasswordValidation();
            }}
          >
            Submit
          </button>
        </fieldset>
      </form>

      <Loading isHidden={!isSubmitting} />
    </div>
  );
}
