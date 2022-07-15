import { createStyles } from "@mantine/core";
import { AccountBox, Search, ShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import { cartGet } from "../features/cart/cartSlice";

const useStyles = createStyles((theme, _params, getRef) => ({
  Parent: {
    display: "flex",
    flexDirection: "column",
    minWidth: "300px",
    minHeight: "56px",
    background:
      "linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(65,144,190,1) 100%, rgba(0,212,255,1) 100%)",
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
  },

  UserIcons: {
    display: "inline-flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    minWidth: "100px",
    margin: "9px",
    [`@media (max-width: 340px)`]: {
      width: "100%",
      display: "flex",
      justifyContent: "space-evenly",
    },
  },

  Icon: {
    textDecoration: "none",
    color: "black",

    ["* > span"]: {
      fontSize: "12px",
      color: "white",
      backgroundColor: "red",
    },

    ["* > svg"]: {
      fontSize: "36px",
      color: "white",
      boxShadow:
        "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
    },

    [`@media (max-width: 340px)`]: {
      ["* > svg"]: {
        fontSize: "56px",
        color: "white",
      },
    },
  },

  Input: {
    maxWidth: " 70%",
    height: "30px",
  },

  Nav: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [`@media (max-width: 340px)`]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  Row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "9px",
    boxShadow:
      "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
    [`svg`]: {
      color: "white",
      display: "flex",
      alignItems: "bottom",
      justifyContent: "space-evenly",
    },

    [`input`]: {
      height: "20px",
    },
    [`@media (max-width: 340px)`]: {
      [`input`]: {
        fontSize: "16px",
        height: "32px",
      },

      [`svg`]: {
        fontSize: "64px",
        height: "32px",
      },
    },
  },

  Col: {
    display: "flex",
    flexDirection: "column",
  },

  Title: {
    fontSize: "64px",
    color: "white",
    textDecoration: "none",
    fontFamily: "Roboto",
    marginLeft: "9px",
    [`@media (max-width: 340px)`]: {
      display: "flex",
      justifyContent: "center",
    },
  },
}));

export const NavBar = () => {
  
  const cartProducts = useAppSelector((state) => state.cart.products);
  const totalSize = useAppSelector((state) => state.cart.totalSize);
  const [cartBadgeItems, setCardBadgeItems] = useState(0);
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  const { classes } = useStyles();

  useEffect(() => {
    dispatch(cartGet());
  }, []);

  /*To preserve the Badge UI upon page refreshes */
  useEffect(() => {
    setCardBadgeItems(cartProducts.length);
  }, [cartProducts]);

  /*To trigger the Badge UI when the product is added into the cart*/
  useEffect(() => {
    setCardBadgeItems(totalSize);
  }, [totalSize]);
  return (
    <div className={classes.Parent}>
      <span>
        <a className={classes.Title} href="/">
          Aquatic
        </a>
      </span>
      <div className={classes.Nav}>
        <div className={classes.Row}>
          <input
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              setSearchTerm(e.currentTarget.value);
            }}
          ></input>

          <a href={`/items/search/${searchTerm}`}>
            <Search onClick={() => {}} />
          </a>
        </div>

        <div className={classes.UserIcons}>
          <a className={classes.Icon} href="/user/cart">
            <Badge badgeContent={cartBadgeItems}>
              <ShoppingCart />
            </Badge>
          </a>
          <a className={classes.Icon} href="/user/account">
            <Badge badgeContent={0}>
              <AccountBox />
            </Badge>
          </a>
        </div>
      </div>
    </div>
  );
};
