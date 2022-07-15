import { createStyles } from "@mantine/core";
import { Checkbox } from "tabler-icons-react";

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

  Wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "4px solid red",
    width: "100%",

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

export const CheckoutSuccess = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.Wrapper}>
      <div style={{ fontSize: "32px", fontWeight: "bold" }}>
        Order Successful
      </div>
      <Checkbox size={"128px"} color="green"></Checkbox>
    </div>
  );
};
