export default function Form() {
  return (
    <div>
      //TODO add input.validationMessage to // aria-invalid="true"
      aria-errormessage and span with id //
      https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-errormessage
      // input..checkValidity() onSubmit
      <h1>Login Form</h1>
      <div role="alert" id="server-message">
        Invalid login attempt.
      </div>
      <form>
        <input type="hidden"></input>
        <input id="anti-csrf-token" type="hidden" value="some-uuid"></input>
        <input id="email" type="email" required placeholder="email"></input>
        <input
          id="password"
          type="password"
          required
          placeholder="password"
        ></input>
        <button>Submit</button>
      </form>
    </div>
  );
}
