import { Button } from "@mantine/core";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../common/hooks";
import { userIsLoggedIn } from "../../../common/services/helpers/authHeader";
import { logout } from "../authentication/authenticationSlice";
import { mobile } from "../responsive";
import { userGet } from "../user/userSlice";
import { OrderList } from "./components/OrderList";
import { ShippingInformationCard } from "./components/ShippingInformationCard";

export const Account = () => {
  const navigate = useNavigate();

  const userData = useAppSelector((state) => state.user);
  const { user } = userData;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!userIsLoggedIn()) {
      navigate("/login");
    }
    dispatch(userGet());
  }, []);

  return (
    <>
      {user !== undefined ? (
        <AccountWrapper>
          <h1>Your Account</h1>
          <Button
            onClick={() => {
              dispatch(logout());
            }}
          >
            Logout
          </Button>
          <h2>Shipping Information</h2>

          <ShippingInformationCard data={user!} />

          <h2>Your Orders</h2>

          <OrderList />
        </AccountWrapper>
      ) : (
        ""
      )}
    </>
  );
};

const AccountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 12vh;
  width: 100%;

  ${mobile({ padding: "5px" })}
`;
