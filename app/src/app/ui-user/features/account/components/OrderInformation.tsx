import { Button, createStyles } from "@mantine/core";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../common/hooks";
import { ICheckoutData } from "../../checkout/checkoutSlice";
import { orderPlace } from "../../order/orderSlice";

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

  Icons: {
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: "27px",
  },
  Show: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  Row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "9px",
    border: "2px solid gray",
  },
  Col: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  Wrapper: {
    zIndex: 22,
    padding: "9px",
    display: "flex",
    width: "100%",
    maxWidth: "560px",
    backgroundColor: "rgba(255, 255, 255)",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
    border: "2px solid black",
    ref: getRef("mobile"),
  },
  Name: {
    minWidth: "100px",
    maxWidth: "20%",
  },
  Value: {
    width: "80%",
    border: "1px solid black",
  },
  Mobile: {
    ref: getRef("mobile"),
    color: "red",
  },

  Navigation: {
    maxWidth: "400px",
  },
}));

export const OrderInformation = (props: {
  checkoutInformation: ICheckoutData;
  clickNegative: Function;
}) => {
  const { classes } = useStyles();
  const { checkoutInformation } = props;
  const { checkoutInfo } = checkoutInformation;

  const [disable, setDisable] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const order = useAppSelector((state) => state.order.orders);


  return (
    <div className={classes.Wrapper}>
      <h1>Shippment Information</h1>

      <div className={classes.Col}>
        <div className={classes.Row}>
          <div className={classes.Name}>First Name:</div>
          <div className={classes.Value}>{user?.firstName} 3333</div>
        </div>
      </div>
      <div className={classes.Col}>
        <div className={classes.Row}>
          <div className={classes.Name}>Last Name:</div>
          <div className={classes.Value}>{user?.lastName}</div>
        </div>
      </div>
      <div className={classes.Col}>
        <div className={classes.Row}>
          <div className={classes.Name}>Address 1:</div>
          <div className={classes.Value}>{user?.addressLine1}</div>
        </div>
      </div>
      <div className={classes.Col}>
        <div className={classes.Row}>
          <div className={classes.Name}>Address 2:</div>
          <div className={classes.Value}>{user?.addressLine2}</div>
        </div>
      </div>
      <div className={classes.Col}>
        <div className={classes.Row}>
          <div className={classes.Name}>State:</div>
          <div className={classes.Value}>{user?.state}</div>
        </div>
      </div>
      <div className={classes.Col}>
        <div className={classes.Row}>
          <div className={classes.Name}>City:</div>
          <div className={classes.Value}>{user?.city}</div>
        </div>
      </div>
      <div className={classes.Col}>
        <div className={classes.Row}>
          <div className={classes.Name}>Postal Code:</div>
          <div className={classes.Value}>{user?.postalCode}</div>
        </div>
      </div>
      <div className={classes.Col}>
        <div className={classes.Row}>
          <div className={classes.Name}>Country:</div>
          <div className={classes.Value}>{user?.country?.name}</div>
        </div>
      </div>
      <div className={classes.Col}>
        <div className={classes.Row}>
          <div className={classes.Name}>Phone Number:</div>
          <div className={classes.Value}>{user?.phoneNumber}</div>
        </div>
      </div>

      <h2>Order</h2>
      <div className={classes.Col}>
        <div className={classes.Row}>
          <div className={classes.Name}>Days:</div>
          <div className={classes.Value}>{checkoutInfo.deliverDays}</div>
        </div>

        <div className={classes.Col}>
          <div className={classes.Row}>
            <div className={classes.Name}>Shipping:</div>
            <div className={classes.Value}>
              {checkoutInfo.shippingCostTotal}
            </div>
          </div>

          <div className={classes.Col}>
            <div className={classes.Row}>
              <div
                className={classes.Name}
                style={{ fontWeight: "bold", fontSize: "20px" }}
              >
                Total:
              </div>
              <div className={classes.Value} style={{ fontSize: "20px" }}>
                {checkoutInfo.paymentTotal}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.Icons}>
        <Button
          color={"gray"}
          onClick={(e: any) => {
            props.clickNegative();
          }}
        >
          Go Back
        </Button>
        <Button disabled={disable}
          onClick={() => {

            setDisable(!disable)
            dispatch(orderPlace());
          }}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
};
