import { useState } from "react";
import { authService } from "fbase";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 320px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  background-color: rgb(255, 255, 255);
  width: 100%;
  padding: 5px 10px;
  margin-bottom: 5px;
  border-radius: 20px;
  box-sizing: border-box;
  cursor: text;
  color: rgb(20, 20, 20);
`;

const Submit = styled.input`
  width: 100%;
  padding: 10px 0px;
  border-radius: 20px;
  margin-top: 10px;
  box-sizing: border-box;
  background-color: #289ae2;
  display: flex;
  justify-content: center;
`;

const SignOrCreate = styled.span`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  color: #289ae2;
  text-decoration: underline;
`;

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          required
        />
        <Submit
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error}
      </Form>
      <SignOrCreate onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </SignOrCreate>
    </Container>
  );
};

export default AuthForm;
