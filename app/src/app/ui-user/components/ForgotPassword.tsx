import { AxiosError } from "axios";
import { useState } from "react";
import styled from "styled-components";
import { QuestionMark } from "tabler-icons-react";
import { useAppDispatch } from "../../common/hooks";
import http from "../../common/services/helpers/http";
import {
  alertCustom,
  alertError,
  alertSuccess
} from "../features/alert/alertSlice";

interface ResetProps {
  password1: string;
  password2: string;
}
export const ForgotPassword = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (email.length > 0) {
      http.post(`/api/auth/forgot_password?email=${email}`).then(
        (res) => {
          if (res.status == 200) {
            dispatch(
              alertSuccess({
                message:
                  "You will get a password reset link. Please check your email.",
              })
            );
          }
        },
        (err: AxiosError) => {
          dispatch(
            alertError({
              message: err.response?.data,
            })
          );
        }
      );
    } else {
      dispatch(alertCustom({ message: "Email field must not be empty" }));
    }
  };
  return (
    <>
      <Login>
        <QuestionMark style={{ width: "64px", height: "64px" }} />
        <Title>Forgot Password</Title>

        <Form
          onSubmit={(e) => {
            handleSubmit();
            e.preventDefault();
          }}
        >
          <InputWrapper>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onInput={(e) => {
                setEmail(e.currentTarget.value);
              }}
            />
          </InputWrapper>

          <Button>Reset Password</Button>
        </Form>
      </Login>
    </>
  );
};
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
  font-size: 32px;
`;

const Input = styled.input`
  height: 4vh;
`;

const InputWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;

  margin-top: 1vh;
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
