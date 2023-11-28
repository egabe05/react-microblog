import { useEffect, useRef, useState } from "react";
import Body from "../components/Body";
import Form from "react-bootstrap/Form";
import InputField from "../components/InputField";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useApi } from "../contexts/ApiProvider";
import { useFlash } from "../contexts/FlashProvider";

const RegistrationPage = () => {
  const [formErrors, setFormErrors] = useState({});
  const usernameField = useRef();
  const emailField = useRef();
  const passwordField = useRef();
  const confirmPasswordField = useRef();
  const navigate = useNavigate();
  const api = useApi();
  const flash = useFlash();

  useEffect(() => {
    usernameField.current.focus()
  }, []);

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (passwordField.current.value !== confirmPasswordField.current.value) {
      setFormErrors({ confirmPassword: "Passwords don't match" });
    }
    else {
      const data = await api.post('/users', {
        username: usernameField.current.value,
        email: emailField.current.value,
        password: passwordField.current.value,
      });
      if (!data.ok) {
        setFormErrors(data.body.errors.json);
      }
      else {
        setFormErrors({});
        flash('You have successfully registered!', 'success');
        navigate('/login');
      }
    }
  }

  return (
    <Body>
      <Form onSubmit={onSubmit}>
        <InputField
          name="username"
          label="Username"
          error={formErrors.username}
          fieldRef={usernameField}
        />
        <InputField
          name="email"
          label="Email"
          error={formErrors.email}
          fieldRef={emailField}
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          error={formErrors.password}
          fieldRef={passwordField}
        />
        <InputField
          name="confirmPassword"
          label="Confirm password"
          type="password"
          error={formErrors.confirmPassword}
          fieldRef={confirmPasswordField}
        />
        <Button variant="primary" type="submit">Register</Button>
      </Form>
    </Body>
  )
};

export default RegistrationPage;
