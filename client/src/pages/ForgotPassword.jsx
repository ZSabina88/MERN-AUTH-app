import Container from '../components/Container';
import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";
import { schemaSignUp } from '../validation';


export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  // const [errors, setErrors] = useState({});

  function handleCancel() {
    navigate("/");
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // await schemaSignUp.validate(password, { abortEarly: false });
      const { data } = await axios.post("/forgotpassword", {
        email
      })
      if (data) {
        alert("Check your email for reset link");
        navigate("/");
      } else {
        console.log(data.error);
      }
    } catch (error) {
      // const newErrors = {};

      // error.inner.forEach((err) => {
      //   newErrors[err.path] = err.message;
      // })

      // setErrors(newErrors);
      return error.message;
    }
  };

  return (<Container>
    <Form onSubmit={handleSubmit} title="Forgot Password?">
      <div>
        <Input
          name="email"
          type="email"
          placeholder="Work mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* {errors.email && <p className="error">{errors.email}</p>} */}
      </div>
      <Button
        largeBlueBtn
        text="Send"
      />
      <Button
        largeBtn
        type="button"
        text="Cancel"
        onClick={handleCancel}
      />
    </Form>
  </Container>)
}
