import Container from '../components/Container';
import Form from '../components/Form';
import Button from '../components/Button';
import PasswordInput from '../components/PasswordInput';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { schemaSignUp } from '../validation';

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await axios.post("/resetpassword/" + token, {
        password
      })
      if (data.status) {
        navigate("/");
      }
      await schemaSignUp.validate(password, { abortEarly: false });
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      })

      setErrors(newErrors);
      return error;
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} title="Reset Password">
        <div>
          <PasswordInput
            label="Password"
            placeholder="Password"
            password={password}
            passwordChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}
          <PasswordInput
            label="Confirm Password"
            placeholder="Password"
            password={confirmPassword}
            passwordChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>
        <Button
          largeBlueBtn
          type="submit"
          text="Reset Password"
        />
      </Form>
    </Container>
  );
}