import { createStyles } from "@mantine/core";
import styled from "styled-components";
const useStyles = createStyles((theme, _params, getRef) => ({
  Parent: {
    width: "100%",
  },

  Card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "300px",
    margin: "1vh",
    height: "fitContent",
    width: "300px",
    boxShadow:
      "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
    [`@media (max-width: 420px)`]: {
      // Type safe child reference in nested selectors via ref
      width: "100%",
      margin: "2vh 2vh 2vh 2vh",
    },
  },

  Mobile: {
    ref: getRef("mobile"),
    color: "red",
  },

  Description: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    height: "fitContent",
    minHeight: "240px",
    padding: "9px",
  },
  Picture: {
    [`img`]: {
      width: "100%",
      height: "240px",
    },
  },
  Navigation: {
    maxWidth: "400px",
  },
}));

const Image = styled.img`
  width: 100%;
  height: "320px";
  max-width: "320px";
`;
const NoTextOverflow = styled.div`
  white-space: wrap;
  max-width: "200px";
  overflow: hidden;
  text-overflow: ellipsis;
`;
export interface IItemCardProps {
  id: number;
  name: string;
  price: number;
  mainImage: string;
  shortDescription: string;
}

export const ItemCard = (props: any) => {
  const { classes } = useStyles();

  const { item } = props;
  const { id, name, price, mainImage, shortDescription } = item;
  return (
    <div className={classes.Card}>
      <a href={`/item/${id}`} style={{ textDecoration: "none" }}>
        <div className={classes.Picture} style={{ maxWidth: "320px" }}>
          <Image src={mainImage} alt={"ga"}></Image>
        </div>

        <div className={classes.Description}>
          <p>{name}</p>
          <p>{price} HRK</p>
          <NoTextOverflow>{shortDescription}</NoTextOverflow>
        </div>
      </a>
    </div>
  );
};
