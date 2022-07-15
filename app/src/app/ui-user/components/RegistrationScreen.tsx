import { AccountBox } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import {
  redirect,
  userIsLoggedIn
} from "../../common/services/helpers/authHeader";
import {
  authentication,
  AuthType
} from "../features/authentication/authenticationSlice";

export const RegistrationScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (redirect() && !userIsLoggedIn()) {
      navigate("/login");
    }
  }, [user]);

  const initialFormData: any = {
    email: "",
    password: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    defaultForShipping: false,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    postalCode: "",
    state: "",
    country: {
      name: "Croatia",
    },
  };
  const [formData, setFormData] = useState({
    ...initialFormData,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onRegister = () => {
    console.log("Register clicked");
    console.log(formData);

    dispatch(authentication({ type: AuthType.REGISTRATION, data: formData }));
  };

  return (
    <>
      <Login>
        <AccountBox style={{ fontSize: "36px" }} />
        <Title>Register</Title>

        <Form
          onSubmit={(e) => {
            onRegister();
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

          <InputWrapper>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" type="text" onChange={handleChange} />
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" type="text" onChange={handleChange} />
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor="addressLine1">Address Line 1</Label>
            <Input id="addressLine1" type="text" onChange={handleChange} />
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor="addressLine2">Address Line 2</Label>
            <Input id="addressLine2" type="text" onChange={handleChange} />
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor="state">State</Label>
            <Input id="state" type="text" onChange={handleChange} />
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor="email">Postal Code</Label>
            <Input id="postalCode" type="text" onChange={handleChange} />
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor="email">Country</Label>
            <Input id="email" type="text" onChange={handleChange} />
          </InputWrapper>

          <Button type="submit">Register</Button>

          <Bottom>
            <SmallText>
              Already have an account?
              <A href="/login">
                <Register>Login.</Register>
              </A>
            </SmallText>
          </Bottom>
        </Form>
      </Login>
    </>
  );
};

const Bottom = styled.div`
  margin-top: 1vh;
`;
const SmallText = styled.div`
  font-size: 12px;
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
  margin-top: 3vh;
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

  margin-top: 2vh;
  label {
    display: inline-flex;
    justify-content: flex-start;
  }
`;
const Label = styled.label``;

const Login = styled.section`
  min-width: 300px;

  color: #1c658c;
`;
