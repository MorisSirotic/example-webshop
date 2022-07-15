import { createStyles } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../common/hooks";
import { categoriesAsync } from "./categoriesSlice";
import { CategoryCard } from "./CategoryCard";

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
    flexDirection: "row",
    alignItems: "center",
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

export const Categories = () => {
  const dispatch = useDispatch();
  const categories = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(categoriesAsync());
  }, [dispatch]);
  const { classes } = useStyles();

  return (
    <div className={classes.Parent}>
      <div className={classes.Wrapper}>
        {categories.categories.map((category) => (
          <CategoryCard key={category.id} item={category}></CategoryCard>
        ))}
      </div>
    </div>
  );
};
