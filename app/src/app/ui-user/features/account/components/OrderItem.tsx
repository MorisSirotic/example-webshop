import styled from "styled-components";
import { OrderProduct } from "../../order/orderSlice";

export const OrderItem = (params: OrderProduct) => {
  const { product } = params;
  const { quantity } = params;

  return (
    <Wrapper>
      <Image src={product.mainImage} />

      <ItemInformation>
        <Title>{product.shortName}</Title>
        <Quantity>x{quantity}</Quantity>
        <Amount>${product.price}</Amount>
      </ItemInformation>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  display: flex;
  flex-direction: row;
  flex-shrink: 1;
  border: 1px solid black;
  margin-top: 2vh;
  background-color: white;
  max-width: 250px;
`;
const Image = styled.img`
  padding: 1vh;
  max-width: 50%;
`;

const ItemInformation = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
`;
const Title = styled.div`
  margin-bottom: 1vh;
`;
const Quantity = styled.div`
  margin-top: 1vh;
`;
const Amount = styled.div`
  margin-top: 1vh;
`;
