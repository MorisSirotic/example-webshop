import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../common/hooks";
import { cartAddProduct, cartGet } from "../cart/cartSlice";
import { mobile } from "../responsive";
import { itemAsync, itemChangeAmount, itemChangeSize } from "./itemSlice";

export const NewItem = () => {
  const { productId } = useParams();

  const data = useAppSelector((state) => state.item);
  const [amount, setAmount] = useState(1);
  const { item } = data;

  const dispatch = useAppDispatch();

  const colorChanged = (e: any) => {
    //
    const sp: HTMLSpanElement = e.target;
    const test = sp.parentNode?.children!;

    for (let item of test) {
      if (item.classList.contains("active")) {
        item.classList.remove("active");
      }
    }
    sp.classList.add("active");
  };

  useEffect(() => {
    dispatch(itemAsync(productId));
  }, [dispatch]);
  return (
    <Container>
      <ImageContainer>
        <Image
          style={{ width: "320px", height: "420px" }}
          src={item.mainImage}
        />
      </ImageContainer>

      <Item>
        <Title>{item.name}</Title>
        <Description>{item.fullDescription}</Description>
        <Price>${item.price}</Price>

        <InformationBox>
          <Row>
            <Colors>
              <Color onClick={colorChanged} color="red" />
              <Color onClick={colorChanged} color="blue" />
              <Color onClick={colorChanged} color="green" />
              <Color onClick={colorChanged} color="yellow" />
              <Color onClick={colorChanged} color="purple" />
            </Colors>

            <Size onChange={(e) => dispatch(itemChangeSize(e.target.value))}>
              <SizeOption>XS</SizeOption>
              <SizeOption>S</SizeOption>
              <SizeOption>M</SizeOption>
              <SizeOption>L</SizeOption>
              <SizeOption>XL</SizeOption>
            </Size>
          </Row>

          <Column>
            <Amount>
              <AmountButton>
                <RemoveCircle
                  onClick={() => {
                    if (amount > 1) {
                      setAmount(amount - 1);
                    }
                  }}
                />
              </AmountButton>
              <AmountValue>{amount}</AmountValue>
              <AddCircle onClick={() => setAmount(amount + 1)} />
            </Amount>

            <Button
              onClick={() => {
                dispatch(cartAddProduct(item.id, amount));
              }}
            >
              Add To Cart
            </Button>
          </Column>
        </InformationBox>
      </Item>
    </Container>
  );
};

const Item = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 500px;
  margin: 1vh;
`;

const ImageContainer = styled.div`
  flex: 1;
`;

const AmountValue = styled.div`
  width: fit-content;
`;
const Amount = styled.div`
  display: inline-flex;
  justify-content: space-evenly;
  align-items: center;
  width: 40%;
  margin-bottom: 2vh;
`;
const AmountButton = styled.div`
  display: inline-flex;
`;

const Size = styled.select`
  padding: 5px;
`;

const SizeOption = styled.option``;

const Row = styled.div`
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 1vh;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Colors = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;

  max-width: 75%;
  height: max-content;
`;

const Color = styled.span`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0.3vh;
  flex-shrink: 2;
`;

const Button = styled.button`
  padding: 15px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const InformationBox = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  width: 80%;
`;

const Price = styled.div``;

const Description = styled.div``;

const Title = styled.div``;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;
