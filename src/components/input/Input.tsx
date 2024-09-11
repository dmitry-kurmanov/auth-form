import {
  ForwardedRef,
  MutableRefObject,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

export interface IInputParameters {
  id: string;
  type: string;
  isRequred: boolean;
  labelText: string;
  isValid?: boolean;
}

const Input = forwardRef(function Input(
  { id, type, isRequred, labelText, isValid = true }: IInputParameters,
  forwardedRef: ForwardedRef<HTMLInputElement>
) {
  const errorMessageId = `${id}-error-message`;

  const ref: MutableRefObject<HTMLInputElement | null> = useRef(null);
  useImperativeHandle(forwardedRef, () => ref.current as HTMLInputElement);

  return (
    <div className="login-form__input-wrapper">
      <input
        id={id}
        type={type}
        required={isRequred}
        className={`login-form__input${
          isValid ? "" : " login-form__input--invalid"
        }`}
        aria-invalid={isValid}
        aria-describedby={isValid ? undefined : errorMessageId}
        placeholder=""
        /* aria-errormessage is better than aria-describedby but unfortunatelly is not fully supported https://stackoverflow.com/a/78675883/6623551 */
        /*aria-errormessage="email-error-message"*/
        ref={ref}
      ></input>
      <label className="login-form__input-label" htmlFor={id}>
        {labelText}
      </label>
      <span id={errorMessageId} className="login-form__input-error-message">
        {ref.current?.validationMessage}
      </span>
    </div>
  );
});

export default Input;
