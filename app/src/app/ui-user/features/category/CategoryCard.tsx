import { createStyles, Image } from "@mantine/core";
import { ICategoryData } from "./categoriesSlice";

interface Props {
  item: ICategoryData;
}
const useStyles = createStyles((theme, _params, getRef) => ({
  Parent: {
    width: "100%",
  },

  Wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",

    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    margin: "3vh 2vh 2vh 3vh",

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

export const CategoryCard = ({ item }: Props) => {
  const { classes } = useStyles();

  return (
    <div className={classes.Wrapper}>
      <a style={{ textDecoration: "none" }} href={`/categories/${item.id}`}>
        <Image
          sx={{ maxWidth: "450px", maxHeight: "450px" }}
          src={item.image}
          alt="image"
        ></Image>
        <p style={{ fontSize: "24px" }}>{item.name}</p>
      </a>
    </div>
  );
};
