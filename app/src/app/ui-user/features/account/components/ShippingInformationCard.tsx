import { Button, createStyles } from "@mantine/core";
import React, { useState } from "react";
import {
  ArrowLeft,
  Checkbox,
  Triangle,
  TriangleInverted,
} from "tabler-icons-react";
import { useAppDispatch } from "../../../../common/hooks";
import http from "../../../../common/services/helpers/http";
import { IUser } from "../../user/userSlice";

const useStyles = createStyles((theme, _params, getRef) => ({
  Parent: {
    border: "2px solid grey",
    [`@media (max-width: 420px)`]: {
      // Type safe child reference in nested selectors via ref
      [`& .${getRef("mobile")}`]: {
        display: "flex",
        flexDirection: "column",
      },
    },
  },
  Card: {
    border: "2px solid grey",
    width: "100%",
    maxWidth: "250px",
  },
  Icons: {
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: "9px",
  },
  Show: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  Row: {
    display: "flex",
    alignItems: "center",
    marginTop: "9px",
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

    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid grey",

    ref: getRef("mobile"),
  },
  Name: {
    border: "1px solid gray",
    marginRight: "9px",
    minWidth: "120px",
    maxWidth: "20%",
  },
  Value: {
    width: "100%",
    minWidth: "fitContent",
    textAlign: "center",
    textShadow: "ellipsis",
  },
  Mobile: {
    ref: getRef("mobile"),
    color: "red",
  },

  Navigation: {
    maxWidth: "400px",
  },
}));

const ShowShippingInformation = (props: {
  addressData: IUser;
  onEdit: Function;
  onFavorite: Function;
  onDelete: Function;
  onSave: Function;
}) => {
  const { addressData } = props;

  const { classes } = useStyles();

  const [address, setAddress] = useState<IUser>(addressData);

  const [active, setActive] = useState(false);

  const dispatch = useAppDispatch();

  const ShowEditBar = () => {
    return (
      <div className={classes.Icons}>
        <ArrowLeft
          color="red"
          onClick={(e) => {
            setActive(!active);
            props.onDelete(e);
          }}
        />

        <Checkbox
          color="green"
          onClick={(e) => {
            //  dispatch(addressEdit(addressData!.id, address));

            http
              .post("/customer/edit", address)
              .then((res) => setActive(!active));
            props.onEdit(e);
          }}
        />
      </div>
    );
  };

  const ShowRegularBar = () => {
    return (
      <div className={classes.Icons}>
        {!active ? (
          <Button
            onClick={(e: any) => {
              setActive(!active);
              props.onEdit(e);
            }}
          >
            Edit
          </Button>
        ) : (
          ShowEditBar()
        )}
      </div>
    );
  };
  return (
    <div className={classes.Wrapper}>
      <div className={classes.Col}>
        <div className={classes.Row}>
          <div className={classes.Name}>First Name:</div>
          <input
            disabled={!active}
            className={classes.Value}
            value={address.firstName}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              const newValue = e.currentTarget.value;
              setAddress({ ...addressData, firstName: newValue });
            }}
          />
        </div>
      </div>
      <div className={classes.Col}>
        <div className={classes.Row}>
          <div className={classes.Name}>Last Name:</div>
          <input
            disabled={!active}
            className={classes.Value}
            defaultValue={addressData?.lastName}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              const newValue = e.currentTarget.value;
              setAddress({ ...addressData, lastName: newValue });
            }}
          />
        </div>
      </div>
      <div className={classes.Col}>
        <div className={classes.Row}>
          <div className={classes.Name}>Address 1:</div>
          <input
            disabled={!active}
            className={classes.Value}
            defaultValue={addressData?.addressLine1}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              const newValue = e.currentTarget.value;
              setAddress({ ...addressData, addressLine1: newValue });
            }}
          />
        </div>
      </div>
      <div className={classes.Col}>
        <div className={classes.Row}>
          <div className={classes.Name}>Address 2:</div>
          <input
            disabled={!active}
            className={classes.Value}
            defaultValue={addressData?.addressLine2}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              const newValue = e.currentTarget.value;
              setAddress({ ...addressData, addressLine2: newValue });
            }}
          />
        </div>
      </div>
      <div className={classes.Col}>
        <div className={classes.Row}>
          <div className={classes.Name}>State:</div>
          <input
            disabled={!active}
            className={classes.Value}
            defaultValue={addressData?.state}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              const newValue = e.currentTarget.value;
              setAddress({ ...addressData, state: newValue });
            }}
          />
        </div>
      </div>
      <div className={classes.Col}>
        <div className={classes.Row}>
          <div className={classes.Name}>City:</div>
          <input
            disabled={!active}
            className={classes.Value}
            defaultValue={addressData?.city}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              const newValue = e.currentTarget.value;
              setAddress({ ...addressData, city: newValue });
            }}
          />
        </div>
      </div>
      <div className={classes.Col}>
        <div className={classes.Row}>
          <div className={classes.Name}>Postal Code:</div>
          <input
            disabled={!active}
            className={classes.Value}
            defaultValue={addressData?.postalCode}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              const newValue = e.currentTarget.value;
              setAddress({ ...addressData, postalCode: newValue });
            }}
          />
        </div>
      </div>
      <div className={classes.Col}>
        <div className={classes.Row}>
          <div className={classes.Name}>Phone Number:</div>
          <input
            disabled={!active}
            className={classes.Value}
            defaultValue={addressData?.phoneNumber}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              const newValue = e.currentTarget.value;
              setAddress({ ...addressData, phoneNumber: newValue });
            }}
          />
        </div>
      </div>
      <div className={classes.Col}>
        <div className={classes.Row}>
          <div className={classes.Name}>Country:</div>
          <input
            disabled={!active}
            className={classes.Value}
            defaultValue={addressData?.country?.name}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              const newValue = e.currentTarget.value;
              setAddress({ ...addressData, country: { name: newValue } });
            }}
          />
        </div>
      </div>
      {!active ? <ShowRegularBar /> : <ShowEditBar />}
    </div>
  );
};

export const ShippingInformationCard = (props: { data: IUser }) => {
  const { classes } = useStyles();
  const { data } = props;
  const [show, setShow] = useState(false);

  const handleEdit = () => {};
  const handleFavorite = () => {};
  const handleDelete = () => {};
  const handleSave = () => {};

  if (show) {
    return (
      <div className={classes.Wrapper}>
        <ShowShippingInformation
          addressData={data}
          onEdit={() => {
            handleEdit();
          }}
          onFavorite={() => {
            handleFavorite();
          }}
          onDelete={() => {
            handleDelete();
          }}
          onSave={() => {
            handleSave();
          }}
        ></ShowShippingInformation>
        <div className={classes.Show}>
          <span>Close</span>
          <Triangle
            onClick={() => {
              setShow(!show);
            }}
            size={"14px"}
          />
        </div>
      </div>
    );
  } else
    return (
      <div className={classes.Card}>
        <div className={classes.Col}>
          <p style={{ color: "GrayText" }}> {data.addressLine1}</p>
          <div className={classes.Show}>
            <span>Open</span>
            <TriangleInverted
              onClick={() => {
                setShow(!show);
              }}
              size={"14px"}
            />
          </div>
        </div>
      </div>
    );
};
