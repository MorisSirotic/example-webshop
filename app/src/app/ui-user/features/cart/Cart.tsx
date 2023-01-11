//TODO:
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Trash } from "tabler-icons-react";
import { useAppDispatch, useAppSelector } from "../../../common/hooks";
import { userIsLoggedIn } from "../../../common/services/helpers/authHeader";
import { OrderInformation } from "../account/components/OrderInformation";
import { getCheckoutInfo } from "../checkout/checkoutSlice";
import { userGet } from "../user/userSlice";
import { cartDeleteProduct, cartGet } from "./cartSlice";

export const Cart = () => {
  //TODO: implement error notifications here
  const cart = useAppSelector((state) => state.cart);

  const [total, setTotal] = useState(0);
  const checkout = useAppSelector((state) => state.checkout);

  const userData = useAppSelector((state) => state.user);
  const { user } = userData;

  const { checkoutInfo } = checkout;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);

  const [showSuccess, setshowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const checkoutClicked = (e: any) => {
    setShowCheckout(!showCheckout);
  };
  const checkoutSuccess = (e: any) => {
    setShowCheckout(!showCheckout);
  };

  useEffect(() => {
    if (!userIsLoggedIn()) {
      navigate("/login");
    }
    dispatch(cartGet());
    dispatch(userGet());
    dispatch(getCheckoutInfo());
  }, []);

  useEffect(() => {
    let netTotal = 0;
    cart.products.map((prod) => {
      netTotal += prod.subtotal;

      setTotal(netTotal);
    });
  }, [cart]);
  const CheckoutButton = () => {
    return (
      <>
        <Total>
          <TotalTitle>Total:</TotalTitle>${total}
        </Total>
        <Button onClick={(e: any) => checkoutClicked(e)}>Checkout</Button>
      </>
    );
  };
  const CartNewOrder = () => {
    if (showCheckout) {
      return (
        <Center>
          <Backdrop />
          <OrderInformation
            clickNegative={() => {
              setShowCheckout(false);
            }}
            checkoutInformation={{
              checkoutInfo: checkoutInfo,
              status: "idle",
            }}
          />
        </Center>
      );
    } else return <></>;
  };

  return (
    <>
      <CartNewOrder />

      {cart.products.map((item) => {
        return (
          <CartItem key={item.product.id}>
            <Image src={item.product.mainImage} />
            <Title>{item.product.name}</Title>
            <Amount>{item.quantity}</Amount>
            <Price>${item.product.price}</Price>
            <Trash
              onClick={() => {
                dispatch(cartDeleteProduct(item.product.id));
              }}
            />
          </CartItem>
        );
      })}
      {cart.products.length > 0 ? CheckoutButton() : "Cart is empty"}
    </>
  );
};
const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Backdrop = styled.div`
  height: 100%;
  min-height: 200vh;
  width: 100%;
  position: absolute;

  background-color: rgba(0, 0, 0, 0.4);
`;
const Max = styled.div`
  width: 100%;
  border: "6px solid black";
`;
const TotalTitle = styled.h1`
  font-size: larger;
`;
const Total = styled.section`
  margin-top: 2vh;
`;
const Title = styled.p`
  width: 100px;
  word-break: break-all;
`;
const Amount = styled.p`
  max-width: 20%;
`;

const Price = styled.p`
  max-width: 20%;
`;
const Image = styled.img`
  min-width: 80px;
  width: 20%;
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 2vh;
  max-width: 450px;
`;

const CartItem = styled.div`
  width: 100%;
  margin: 9px;
  min-width: 320px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  max-width: 900px;
  border: 1px solid gray;
  * {
    margin: 1vh;
  }
`;
