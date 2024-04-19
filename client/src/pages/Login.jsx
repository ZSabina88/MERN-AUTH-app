import Container from "../components/Container";
import Form from "../components/Form";
import Break from "../components/Break";
import SmallButton from "../components/SmallButton";
import Button from "../components/Button";
import Linking from "../components/Linking";
import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";
import { useState, useEffect } from "react";
import schema from "../validation";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../features/AuthActions";
import { useNavigate } from "react-router-dom";



export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, error, userInfo, success } = useSelector((state) => state.authLogin);

  useEffect(() => {
    if (success) {
      console.log("loginsuccess");
      navigate('/userprofile')
    };
  }, [navigate, success]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await schema.validate(credentials, { abortEarly: false })
      dispatch(userLogin(credentials));
      setCredentials({
        email: "",
        password: "",
      });
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      })

      setErrors(newErrors);
      console.log(errors);
    }
  };





  function handleChange(e) {
    const { name, value } = e.target;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  }


  return (
    <Container>
      <Form onSubmit={handleSubmit} title="Log in to your account">
        <SmallButton />
        <Break />
        <div>
          <Input
            name="email"
            type="email"
            placeholder="Work mail"
            value={credentials.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        {credentials.email !== "" &&
          <div>
            <PasswordInput
              passwordName="password"
              placeholder="Password"
              passwordValue={credentials.password}
              passwordChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
            <p className="link"><Link to="/forgotpassword">Forgot your password?</Link></p>
          </div>
        }
        <Button
          largeBlueBtn
          disabled={!credentials.email || !credentials.password || loading}
          text={loading ? "Loading..." : "Log in to Qencode"}
        />
        {error && <p style={{color: "red"}}>{error}</p>}
      </Form>
      <Linking
        question="Is your company new to Qencode?"
        linkTitle="Sign Up"
        link="/signup" />
    </Container>
  );
}
