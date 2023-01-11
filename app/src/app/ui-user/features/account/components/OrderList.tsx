import { useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../common/hooks";
import { orderGet } from "../../order/orderSlice";
import { Order } from "./Order";

export interface IOrderItemData {
  id: number;
  name: string;
  total: number;
  items: any[];
  date: any;
  status: {};
}
const createData = (
  id: number,
  name: string,
  total: number,
  items: any[],
  date: any,
  status: {}
) => {
  return {
    id: id,
    name: name,
    total: total,
    items: items,
    date: date,
    status: status,
  };
};

export const OrderList = () => {
  const orders = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(orderGet());
  }, []);

  return (
    <Wrapper>
      {orders?.orders.map((order) => {
        return (
          <Order
            key={order.id}
            id={order.id}
            orderTime={order.orderTime}
            deliverDays={order.deliverDays}
            deliverDateOnForm={order.deliverDateOnForm}
            status={order.status}
            total={order.total}
            orderStatus={order.orderStatus}
            orderDetails={order.orderDetails}
          ></Order>
        );
      })}
    </Wrapper>
  );
};
const Wrapper = styled.section``;
