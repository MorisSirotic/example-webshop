import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { Key } from "tabler-icons-react";
import { useAppDispatch } from "../../common/hooks";
import http from "../../common/services/helpers/http";
import { alertCustom, alertError } from "../features/alert/alertSlice";

interface ResetProps {
  password1: string;
  password2: string;
}
export const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [status, setStatus] = useState(0);

  let [searchParams, setSearchParams] = useSearchParams();

  const [resetData, setResetData] = useState<ResetProps>({
    password1: "",
    password2: "",
  });

  const { password1, password2 } = resetData;

  useEffect(() => {
    if (status == 404 || status == 226) {
      dispatch(alertError({ message: "Invalid Token" }));
      setStatus(0);
    }
  }, [status]);

  const handleSubmit = () => {
    if (password1.length <= 5) {
      dispatch(
        alertError({ message: "Password must be more than 5 characters long" })
      );
    } else {
      if (password1 === password2) {
        http
          .post(
            `/api/auth/reset_password?token=${searchParams}&password=${password1}`
          )
          .then(
            (res) => {
              if (res.status == 200) {
                navigate("/login");
              }
              if (res.status == 226) {
                setStatus(226);
              }
            },
            (err: AxiosError) => {
              dispatch(alertCustom({ message: "Something went wrong" }));
            }
          );
      } else {
        dispatch(alertError({ message: "Passwords are not the same!" }));
      }
    }
  };
  return (
    <>
      <Login>
        <Key style={{ width: "64px", height: "64px" }} />
        <Title>Reset Password</Title>

        <Form
          onSubmit={(e) => {
            handleSubmit();
            e.preventDefault();
          }}
        >
          <InputWrapper>
            <Label htmlFor="password1">New Password</Label>
            <Input
              id="password1"
              type="password"
              onInput={(e) => {
                setResetData({
                  ...resetData,
                  password1: e.currentTarget.value,
                });
              }}
            />
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor="password2">Confirm Password</Label>
            <Input
              id="password2"
              type="password"
              onInput={(e) => {
                setResetData({
                  ...resetData,
                  password2: e.currentTarget.value,
                });
              }}
            />
          </InputWrapper>

          <Button>Reset</Button>
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
