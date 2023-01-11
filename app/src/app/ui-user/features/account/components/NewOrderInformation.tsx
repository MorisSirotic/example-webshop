import { Button, createStyles } from "@mantine/core";
import { MouseEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../common/hooks";
import { addressAddNew, IAddressData } from "../../address/addressSlice";
import { ICheckoutData } from "../../checkout/checkoutSlice";

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
    marginBottom: "27px",

    [`button`]: {
      height: "56px",
    },
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
    textAlign: "center",
    fontSize: "28px",
  },
  Mobile: {
    ref: getRef("mobile"),
    color: "red",
  },

  Navigation: {
    maxWidth: "400px",
  },
}));

export const NewOrderInformation = (props: {
  checkoutInformation: ICheckoutData;
  negative: Function;
  positive: Function;
  errror: Function;
}) => {
  const { classes } = useStyles();
  const { checkoutInformation } = props;

  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const [localAddress, setAddress] = useState<IAddressData>({
    id: 0,
    addressLine1: "",
    addressLine2: "",
    city: "",
    defaultForShipping: false,
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    postalCode: "",
    state: "",
    country: {
      name: "Croatia",
    },
  });

  return (
    <div className={classes.Wrapper}>
      <h1>Shippment Information New</h1>
      <div className={classes.Col}>
        <div className={classes.Row}>
          <div className={classes.Name}>First Name:</div>
          <input
            className={classes.Value}
            value={localAddress.firstName}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              const value = e.currentTarget.value;
              setAddress({ ...localAddress, firstName: value });
            }}
          />
        </div>
      </div>
      <div className={classes.Col}>
        <div className={classes.Row}>
          <div className={classes.Name}>Last Name:</div>
          <input
            className={classes.Value}
            value={localAddress.lastName}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              const value = e.currentTarget.value;
              setAddress({ ...localAddress, lastName: value });
            }}
          />
        </div>
      </div>
      <div className={classes.Col}>
        <div className={classes.Row}>
          <div className={classes.Name}>Address 1:</div>
          <input
            className={classes.Value}
            value={localAddress.addressLine1}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              const value = e.currentTarget.value;
              setAddress({ ...localAddress, addressLine1: value });
            }}
          />
        </div>
      </div>
      <div className={classes.Col}>
        <div className={classes.Row}>
          <div className={classes.Name}>Address 2:</div>
          <input
            className={classes.Value}
            value={localAddress.addressLine2}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              const value = e.currentTarget.value;
              setAddress({ ...localAddress, addressLine2: value });
            }}
          />
        </div>
      </div>
      <div className={classes.Col}>
        <div className={classes.Row}>
          <div className={classes.Name}>State:</div>
          <input
            className={classes.Value}
            value={localAddress.state}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              const value = e.currentTarget.value;
              setAddress({ ...localAddress, state: value });
            }}
          />
        </div>
      </div>
      <div className={classes.Col}>
        <div className={classes.Row}>
          <div className={classes.Name}>City:</div>
          <input
            className={classes.Value}
            value={localAddress.city}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              const value = e.currentTarget.value;
              setAddress({ ...localAddress, city: value });
            }}
          />
        </div>
      </div>
      <div className={classes.Col}>
        <div className={classes.Row}>
          <div className={classes.Name}>Postal Code:</div>
          <input
            className={classes.Value}
            value={localAddress.postalCode}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              const value = e.currentTarget.value;
              setAddress({ ...localAddress, postalCode: value });
            }}
          />
        </div>
      </div>
      <div className={classes.Col}>
        <div className={classes.Row}>
          <div className={classes.Name}>Country:</div>
          <input
            className={classes.Value}
            value={localAddress.country.name}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              const value = e.currentTarget.value;
              setAddress({ ...localAddress, country: { name: value } });
            }}
          />
        </div>
      </div>
      <div className={classes.Col}>
        <div className={classes.Row}>
          <div className={classes.Name}>Phone Number:</div>
          <input
            className={classes.Value}
            value={localAddress.phoneNumber}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              const value = e.currentTarget.value;
              setAddress({ ...localAddress, phoneNumber: value });
            }}
          />
        </div>
      </div>

      <div className={classes.Icons}>
        <Button
          color={"gray"}
          onClick={(e: any) => {
            props.negative("dd", { a: "s" });
          }}
        >
          Go Back
        </Button>
        <Button
          onClick={() => {
            //TODO you can call the props.error() here if the process results in an error
            props.positive();
            dispatch(addressAddNew(localAddress));
          }}
        >
          Save Address
        </Button>
      </div>
    </div>
  );
};
