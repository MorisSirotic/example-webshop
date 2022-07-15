import { createStyles } from "@mantine/core";
import { AccountBox } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useAppDispatch } from "../../../../common/hooks";
import { IAddressData } from "../../address/addressSlice";
import { alertCustom } from "../../alert/alertSlice";
import {
  authentication,
  AuthType
} from "../../authentication/authenticationSlice";
import { userGet } from "../../user/userSlice";

const useStyles = createStyles((theme, _params, getRef) => ({
  Parent: {
    width: "100%",

    [`@media (max-width: 420px)`]: {
      // Type safe child reference in nested selectors via ref
      [`& .${getRef("mobile")}`]: {
        display: "flex",
        flexDirection: "column",
      },
    },
  },

  Icons: {
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: "27px",
  },
  Show: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  Row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "9px",
    border: "2px solid gray",
  },
  Col: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  Wrapper: {
    display: "flex",
    width: "100%",
    maxWidth: "560px",
    backgroundColor: "rgba(255, 255, 255)",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
    border: "2px solid black",
    ref: getRef("mobile"),
  },
  Name: {
    minWidth: "100px",
    maxWidth: "20%",
  },
  Value: {
    width: "80%",
    border: "1px solid black",
  },
  Mobile: {
    ref: getRef("mobile"),
    color: "red",
  },

  Navigation: {
    maxWidth: "400px",
  },
}));

export const NewRegistrationScreen = () => {
  const { classes } = useStyles();
  const [status, setStatus] = useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState<IAddressData>({
    id: 0,
    addressLine1: "",
    addressLine2: "",
    city: "",
    defaultForShipping: false,
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    postalCode: "",
    state: "",
    country: {
      id: 1,
      code: "365",
      name: "Croatia",
    },
  });

  const onRegister = () => {
    const isValid =
      user.addressLine1 !== "" &&
      user.city !== "" &&
      user.email !== "" &&
      user.password !== "" &&
      user.firstName !== "" &&
      user.lastName !== "" &&
      user.phoneNumber !== "" &&
      user.postalCode !== "" &&
      user.state !== "";

    if (!isValid) {
      dispatch(
        alertCustom({
          message:
            "Some fields are empty. Please check carefully and try again.",
        })
      );
    } else {
      dispatch(authentication({ type: AuthType.REGISTRATION, data: user }));
    }
  };

  useEffect(() => {
    dispatch(userGet());
  }, []);
  return (
    <Login>
      <AccountBox style={{ fontSize: "36px" }} />
      <Title>Register</Title>

      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onRegister();
        }}
      >
        <div className={classes.Row}>
          <div className={classes.Name}>Email:</div>
          <input
            type={"email"}
            className={classes.Value}
            value={user?.email}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              const value = e.currentTarget.value;
              setUser({ ...user, email: value });
            }}
          />
        </div>

        <div className={classes.Row}>
          <div className={classes.Name}>Password:</div>
          <input
            type={"password"}
            className={classes.Value}
            value={user?.password}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              const value = e.currentTarget.value;
              setUser({ ...user, password: value });
            }}
          />
        </div>

        <div className={classes.Col}>
          <div className={classes.Row}>
            <div className={classes.Name}>First Name:</div>
            <input
              type={"text"}
              className={classes.Value}
              value={user?.firstName}
              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                const value = e.currentTarget.value;
                setUser({ ...user, firstName: value });
              }}
            />
          </div>
        </div>

        <div className={classes.Row}>
          <div className={classes.Name}>Last Name:</div>
          <input
            type={"text"}
            className={classes.Value}
            value={user?.lastName}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              const value = e.currentTarget.value;
              setUser({ ...user, lastName: value });
            }}
          />
        </div>

        <div className={classes.Col}>
          <div className={classes.Row}>
            <div className={classes.Name}>Address 1:</div>
            <input
              type={"text"}
              className={classes.Value}
              value={user?.addressLine1}
              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                const value = e.currentTarget.value;
                setUser({ ...user, addressLine1: value });
              }}
            />
          </div>
        </div>
        <div className={classes.Col}>
          <div className={classes.Row}>
            <div className={classes.Name}>Address 2:</div>
            <input
              className={classes.Value}
              value={user?.addressLine2}
              placeholder={"Optional"}
              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                const value = e.currentTarget.value;
                setUser({ ...user, addressLine2: value });
              }}
            />
          </div>
        </div>
        <div className={classes.Col}>
          <div className={classes.Row}>
            <div className={classes.Name}>State:</div>
            <input
              type={"text"}
              className={classes.Value}
              value={user?.state}
              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                const value = e.currentTarget.value;
                setUser({ ...user, state: value });
              }}
            />
          </div>
        </div>
        <div className={classes.Col}>
          <div className={classes.Row}>
            <div className={classes.Name}>City:</div>
            <input
              type={"text"}
              className={classes.Value}
              value={user?.city}
              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                const value = e.currentTarget.value;
                setUser({ ...user, city: value });
              }}
            />
          </div>
        </div>
        <div className={classes.Col}>
          <div className={classes.Row}>
            <div className={classes.Name}>Postal Code:</div>
            <input
              type={"number"}
              className={classes.Value}
              value={user?.postalCode}
              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                const value = e.currentTarget.value;
                setUser({ ...user, postalCode: value });
              }}
            />
          </div>
        </div>
        <div className={classes.Col}>
          <div className={classes.Row}>
            <div className={classes.Name}>Country:</div>
            <input
              type={"text"}
              disabled={true}
              className={classes.Value}
              value={user?.country.name}
              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                const value = e.currentTarget.value;
                //setUser({ ...user, country: { name: value } });
              }}
            />
          </div>
        </div>
        <div className={classes.Col}>
          <div className={classes.Row}>
            <div className={classes.Name}>Phone Number: </div>
            <input
              type={"number"}
              className={classes.Value}
              value={user?.phoneNumber}
              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                const value = e.currentTarget.value;
                setUser({ ...user, phoneNumber: value });
              }}
            />
          </div>
        </div>

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
