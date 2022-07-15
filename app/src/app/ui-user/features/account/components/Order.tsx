import { ArrowDropDownRounded } from "@mui/icons-material";
import { useState } from "react";
import styled from "styled-components";
import { IOrderData } from "../../order/orderSlice";
import { OrderItem } from "./OrderItem";

export const Order = (order: IOrderData) => {
  const [showItems, setShowItems] = useState(true);

  const onShowItemsClick = () => {
    setShowItems(!showItems);
  };
  return (
    <_Order>
      <Name>#{order.id}</Name>

      <Info>
        <span>Total: ${order.total}</span>
        <span>Status: {order.status}</span>
      </Info>

      <OrderDropdown>
        ({order.orderDetails.length}) items
        <ArrowDropDownRounded onClick={onShowItemsClick} />
      </OrderDropdown>
      <OrderItems hidden={showItems}>
        {order.orderDetails.map((p) => {
          const { product } = p;

          return (
            <OrderItem
              key={product.id}
              product={{
                id: product.id,
                price: product.price,
                mainImage: product.mainImage,
                shortName: product.shortName,
              }}
              quantity={p.quantity}
            />
          );
        })}
      </OrderItems>
    </_Order>
  );
};
const _Order = styled.div`
  display: inline-flex;
  flex-direction: column;
  min-width: 270px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border: 1px solid black;
  margin: 1vh;
`;

const Name = styled.div`
  display: inline-flex;
  justify-content: center;
  color: white;
  background-color: #0366ee;
  border-bottom: 2px solid black;
`;

const Info = styled.div`
  display: inline-flex;
  flex-direction: column;

  align-items: flex-start;
  width: max-content;
`;
const OrderDropdown = styled.div``;

const OrderItems = styled.div``;
