import { createStyles } from "@mantine/core";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import { addressAsync } from "../features/address/addressSlice";

const useStyles = createStyles((theme, _params, getRef) => ({
  Parent: {
    width: "100%",

    [`@media (max-width: 420px)`]: {
      [`& .${getRef("mobile")}`]: {
        display: "flex",
        flexDirection: "column",
      },
    },
  },
  Card: {
    marginTop: "1vh",
  },
  Wrapper: {
    display: "grid",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1vh",

    ref: getRef("mobile"),
  },

  Mobile: {
    ref: getRef("mobile"),
    color: "red",
  },

  Navigation: {
    maxWidth: "400px",
  },
}));

export const ShippingInformationScreen = () => {
  const { classes } = useStyles();

  const addressData = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addressAsync());
  }, []);

  return (
    <div className={classes.Wrapper}>
      {/* {addressData.map((address) => {
        return <div className={classes.Card}>
          <ShippingInformationCard  data={address} />
          </div>
      })} */}
      <p>It's the address card thjing you can change</p>
    </div>
  );
};
