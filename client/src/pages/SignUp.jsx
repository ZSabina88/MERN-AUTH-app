import Container from "../components/Container";
import Form from "../components/Form";
import Break from "../components/Break";
import SmallButton from "../components/SmallButton";
import Button from "../components/Button";
import Linking from "../components/Linking";
import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { schemaSignUp } from "../validation";
import { userSignup } from "../features/AuthActions";

export default function SignUpPage() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  // const [inputDirty, setInputDirty] = useState({
  //   name: false,
  //   email: false,
  //   password: false,
  //   confirmPassword: false
  // });
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success, userInfo } = useSelector((state) => state.authSignup);



  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await schemaSignUp.validate(credentials, { abortEarly: false });
      dispatch(userSignup(credentials));
      setCredentials({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
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

  useEffect(() => {
    if (success) {
      console.log("success");
      navigate('/')
    };
    if (userInfo) {
      console.log("usersuccess");
      navigate('/')
    };
  }, [navigate, userInfo, success]);


  function handleChange(e) {
    const { name, value } = e.target;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };


  return (
    <Container>
      <Form onSubmit={handleSubmit} title="Create an account">
        <SmallButton />
        <Break />
        <div>
          <Input
            name="name"
            type="text"
            placeholder="Name"
            value={credentials.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
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
          <>
            <div>
              <PasswordInput
                label="Password"
                passwordName="password"
                placeholder="Password"
                password={credentials.password}
                passwordChange={handleChange}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div>
              <PasswordInput
                label="Confirm Password"
                passwordName="confirmPassword"
                placeholder="Password"
                passwordValue={credentials.confirmPassword}
                passwordChange={handleChange}
              />
              {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            </div>
          </>
        }
        {error && <p>{error}</p>}
        <Button
          largeBlueBtn
          disabled={
            !credentials.email || !credentials.password || loading}
          text={loading ? "Loading..." : "Log in to Qencode"}
        />
      </Form>
      <Linking
        question="Do you already have an account?"
        linkTitle="Log in"
        link="/" />
    </Container>
  );
}
