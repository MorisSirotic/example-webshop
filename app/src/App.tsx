import { createStyles, MantineProvider } from "@mantine/core";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/common/hooks";
import { ForgotPassword } from "./app/ui-user/components/ForgotPassword";
import { LoginScreen } from "./app/ui-user/components/LoginScreen";
import { MainScreen } from "./app/ui-user/components/MainScreen";
import { NavBar } from "./app/ui-user/components/NavBar";
import { NotFoundScreen } from "./app/ui-user/components/NotFound";
import { ResetPassword } from "./app/ui-user/components/ResetPassword";
import { Account } from "./app/ui-user/features/account/Account";
import { NewRegistrationScreen } from "./app/ui-user/features/account/components/NewRegistrationScreen";
import { alertClear } from "./app/ui-user/features/alert/alertSlice";
import { Cart } from "./app/ui-user/features/cart/Cart";
import { NewItem } from "./app/ui-user/features/item/NewItem";
import { Items } from "./app/ui-user/features/items/Items";

function App() {
  const alert = useAppSelector((state) => state.alerts);
  const cart = useAppSelector((state) => state.cart.products);
  const dispatch = useAppDispatch();
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();
  const { classes } = useStyles();

  useEffect(() => {
    setShowNotification(!showNotification);
  }, [alert]);

  const Notification = (props: { message: string | undefined }) => {
    const [hide, setHide] = useState(showNotification);

    const handleCloseClick = () => {
      setHide(true);
      dispatch(alertClear());
    };
    return (
      <>
        {hide ? (
          ""
        ) : (
          <div className={classes.Wrapper}>
            <div
              className={classes.Backdrop}
              onClick={() => handleCloseClick()}
            />

            <div className={classes.Content}>
              <div className={classes.Close}>
                <span onClick={() => handleCloseClick()}>X</span>
              </div>

              <p>{props.message}</p>
              {/* So it looks even (empty row where the close button is takes space)*/}
              <div style={{ height: "30px" }}></div>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div>
      <NavBar />
      <Notification message={alert.message} />
      <div className={classes.App}>
        <MantineProvider
          theme={{
            // Override any other properties from default theme
            fontFamily: "Open Sans, sans serif",
            colorScheme: "dark",
            colors: {
              dark: ["#666980"],
            },
            spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
          }}
        >
          <Routes>
            <Route path="/" element={<MainScreen />} />
            <Route path="/item/:productId" element={<NewItem />} />
            <Route path="/categories/:categoryId" element={<Items />} />
            <Route path="/items/search/" element={<Items />} />
            <Route path="/items/search/:searchTerm" element={<Items />} />
            <Route path="/registration" element={<NewRegistrationScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/user/cart" element={<Cart />} />
            <Route path="/user/account" element={<Account />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route path="/reset_password" element={<ResetPassword />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </MantineProvider>
      </div>
    </div>
  );
}
const useStyles = createStyles((theme, _params, getRef) => ({
  App: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: "100%",
    marginTop: " 5vh",
    width: "100%",
  },
  Wrapper: {
    width: "100%",
    minWidth: "320px",
    minHeight: "750px",
    height: "100%",
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  Backdrop: {
    height: "100%",
    width: "100%",
    position: "absolute",
    minHeight: "100vh",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  Content: {
    display: "flex",
    position: "relative",
    width: "80%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    minHeight: "100px",
    height: "fitContent",

    backgroundColor: "white",
    [`@media (min-width: 520px)`]: {
      maxWidth: "520px",
    },
    [`p`]: {
      textAlign: "center",
      padding: "9px",
    },
  },

  Close: {
    width: "100%",
    height: "20px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: "26px",
    fontSize: "20px",
    padding: "9px",
    [`span`]: {
      color: "gray",

      ":hover": {
        color: "black",
      },
    },
  },

  Hide: {
    display: "none",
  },
}));
export default App;
