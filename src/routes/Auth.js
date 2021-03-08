import { authService, firebaseInstance } from "fbase";
import AuthForm from "components/AuthForm";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Logo = styled.div`
  color: #289ae2;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  font-size: 30px;
`;
const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;
const Button = styled.button`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 75%;
  padding: 5px 0px;
  border-radius: 20px;
  color: rgb(20, 20, 20);
  background: rgb(220, 220, 220);
  margin-bottom: 15px;
`;

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;

    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };
  return (
    <Container>
      <Logo>
        <FontAwesomeIcon icon={faTwitter} size="4x" />
      </Logo>
      <AuthForm />
      <Buttons>
        <Button onClick={onSocialClick} name="google">
          Continue with Google
          <FontAwesomeIcon icon={faGoogle} size="2x" />
        </Button>
        <Button onClick={onSocialClick} name="github">
          Continue with Github
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </Button>
      </Buttons>
    </Container>
  );
};

export default Auth;
