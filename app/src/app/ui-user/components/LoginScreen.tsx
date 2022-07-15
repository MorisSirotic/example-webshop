import { Lock } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector } from "../../common/hooks";
import { userIsLoggedIn } from "../../common/services/helpers/authHeader";
import {
  authentication,
  AuthType,
  ILoginData,
} from "../features/authentication/authenticationSlice";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [status, setStatus] = useState(0);

  const user = useAppSelector((state) => state.authentication.user);

  useEffect(() => {
    if (userIsLoggedIn()) {
      navigate("/");
    }
  }, [user]);

  const initialFormData: ILoginData = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState({
    ...initialFormData,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onLogin = () => {
    dispatch(authentication({ type: AuthType.LOGIN, data: formData }));
  };
  return (
    <>
      <Login>
        <Lock style={{ fontSize: "36px", marginBottom: "9px" }} />
        <Title>Login</Title>

        <Form
          onSubmit={(e) => {
            onLogin();
            e.preventDefault();
          }}
        >
          <InputWrapper>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" onChange={handleChange} />
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" onChange={handleChange} />
          </InputWrapper>

          <Button>Login</Button>
          <SmallText>
            Don't have an account?
            <A href="/registration">
              <Register>Register.</Register>
            </A>
          </SmallText>

          <SmallText style={{ marginTop: "16px" }}>
            <Empty />
            Forgot password?
            <A href="/forgot_password">
              <Register>Reset.</Register>
            </A>
          </SmallText>
        </Form>
      </Login>
    </>
  );
};
const Empty = styled.div`
  border: "1px solid green";
  margin-top: "2vh";
  height: "32px";
`;

const SmallText = styled.div`
  font-size: 12px;
  margin-top: 9px;
`;

const A = styled.a`
  text-decoration: none;
  color: inherit;
`;
const Register = styled.div`
  font-size: 12px;
  text-decoration: none;
  font-weight: bold;
`;
const Button = styled.button`
  width: 100%;
  height: 45px;
  margin-top: 18px;
  background: white;
  color: #1c658c;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 20px;
`;

const Input = styled.input`
  height: 4vh;
`;

const InputWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  margin-top: 8px;
  margin-bottom: 4px;

  label {
    display: inline-flex;
    justify-content: flex-start;
    margin: 4px 4px 4px 0;
  }
`;
const Label = styled.label``;

const Login = styled.section`
  min-width: 300px;

  color: #1c658c;
`;
