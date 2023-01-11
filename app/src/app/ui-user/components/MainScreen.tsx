import { createStyles } from "@mantine/core";
import { Categories } from "../features/category/Categories";
import { Carousel } from "./Carousel";

const useStyles = createStyles((theme, _params, getRef) => ({
  Parent: {
    width: "100%",

    [`@media (max-width: 550px)`]: {
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
    justifyContent: "center",
    width: "100%",
    ref: getRef("mobile"),
  },

  Mobile: {
    ref: getRef("mobile"),
    color: "red",
  },

  Carousel: {
    maxWidth: "780px",
  },

  Categories: {
    marginTop: "18px",
  },
  Navigation: {
    maxWidth: "400px",
  },
}));
export const MainScreen = () => {
  const { classes } = useStyles();

  return (
    <>
      <div className={classes.Wrapper}>
        <div className={classes.Categories}>
          <Categories />
        </div>
      </div>
    </>
  );
};
