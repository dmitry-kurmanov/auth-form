import { ForwardedRef, forwardRef } from "react";

export interface IInputParameters {
  id: string;
  type: string;
  autocomplete: string;
  isRequred: boolean;
  labelText: string;
  isValid: boolean;
  validationMessage: string;
  onInputCallback: () => void;
}

const Input = forwardRef(function Input(
  {
    id,
    type,
    autocomplete,
    isRequred,
    labelText,
    isValid,
    validationMessage,
    onInputCallback,
  }: IInputParameters,
  forwardedRef: ForwardedRef<HTMLInputElement>
) {
  const errorMessageId = `${id}-error-message`;

  return (
    <div className="login-form__input-wrapper">
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autocomplete}
        required={isRequred}
        className={`login-form__input ${
          isValid ? "" : "login-form__input--invalid"
        }`}
        aria-invalid={!isValid}
        aria-describedby={isValid ? undefined : errorMessageId}
        placeholder=""
        /* aria-errormessage is better than aria-describedby but unfortunatelly is not fully supported https://stackoverflow.com/a/78675883/6623551 */
        /*aria-errormessage="email-error-message"*/
        ref={forwardedRef}
        onInput={onInputCallback}
      ></input>
      <label className="login-form__input-label" htmlFor={id}>
        {labelText}
      </label>
      <span id={errorMessageId} className="login-form__input-error-message">
        {validationMessage}
      </span>
    </div>
  );
});

export default Input;
