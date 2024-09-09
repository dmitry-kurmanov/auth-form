interface IInputParameters {
  id: string;
  type: string;
  isRequred: boolean;
  labelText: string;
}

export default function Input({
  id,
  type,
  isRequred,
  labelText,
}: IInputParameters) {
  return (
    <div className="login-form__input-wrapper">
      <input
        id={id}
        type={type}
        required={isRequred}
        className="login-form__input"
        aria-invalid="false"
        placeholder=""
        /* aria-errormessage is better than aria-describedby but unfortunatelly is not fully supported https://stackoverflow.com/a/78675883/6623551 */
        /*aria-errormessage="email-error-message"*/
      ></input>
      <label className="login-form__input-label" htmlFor={id}>
        {labelText}
      </label>
      <span
        id={`${id}-error-message`}
        className="login-form__input-error-message"
      ></span>
    </div>
  );
}
