import { createStyles, Paper, Transition } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "tabler-icons-react";
import { useAppDispatch } from "../../common/hooks";

const useStyles = createStyles((theme, _params, getRef) => ({
  Wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    minWidth: "300px",
    minHeight: "500px",
    marginBottom: "2vh",
    ref: getRef("mobile"),
  },

  Mobile: {
    ref: getRef("mobile"),
    color: "red",
  },
  ImageWrapper: {
    maxWidth: "780px",

    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },

  ImagePlaceholder: {
    width: "100%",
    height: "100%",
  },
  Image: {
    width: "100%",
    maxHeight: "800px",
  },

  Arrow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "black",
    borderRadius: "32px",
    width: "32px",
    height: "32px",
    position: "absolute",
    zIndex: 999,
    [`svg`]: {
      color: "white",
    },
  },

  ArrowWrapper: {
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

export const Carousel = () => {
  //const items = useAppSelector((state) => state.items.items);
  const scaleY = {
    in: { opacity: 1, transform: "slide-right" },
    out: { opacity: 0, transform: "slide-left" },
    common: { transformOrigin: "left" },
    transitionProperty: "transform, opacity",
  };

  const items: any = [
    { mainImage: "https://i.imgur.com/aZl82qh.jpg" },
    { mainImage: "https://i.imgur.com/32yp4zr.jpg" },
    { mainImage: "https://i.imgur.com/39RWrWu.jpg" },
  ];

  const dispatch = useAppDispatch();

  const { classes } = useStyles();

  const animationStartRef = useRef<null | NodeJS.Timeout>(null);
  const animationStopRef = useRef<null | NodeJS.Timeout>(null);
  const animationTimer = 3000;

  const [runOnce, setRunOnce] = useState(true);

  const [load, setLoad] = useState(false);
  const [currentImage, setCurrentImage] = useState(1);

  const nextImage = () => {
    if (currentImage + 1 < items.length) {
      setCurrentImage(currentImage + 1);
    } else {
      setCurrentImage(0);
    }
  };

  const previousImage = () => {
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1);
    } else {
      setCurrentImage(0);
    }
  };
  const stopScrolling = () => {
    if (animationStartRef.current) {
      clearTimeout(animationStartRef.current);
    }
  };

  const startScrolling = () => {
    animationStartRef.current = setTimeout(() => {
      setRunOnce(false);
      setLoad(true);
      nextImage();
      animationStopRef.current = setTimeout(() => {
        setLoad(false);
      }, animationTimer);
    }, animationTimer);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    stopScrolling();
    startScrolling();
  }, [items, currentImage]);

  const Image = (props: { image: string }) => {
    const { image } = props;
    return <img className={classes.Image} src={image}></img>;
  };

  return (
    <div>
      <div className={classes.Wrapper}>
        <div className={classes.ImageWrapper}>
          {runOnce ? (
            <div className={classes.ImagePlaceholder}>
              <Image image={items[currentImage].mainImage} />
            </div>
          ) : (
            <div className={classes.ImagePlaceholder}>
              {items.length > 0 ? (
                <Transition
                  mounted={load}
                  transition={scaleY}
                  duration={3150}
                  timingFunction="ease"
                >
                  {(styles) => (
                    <Paper
                      style={{
                        ...styles,
                      }}
                    >
                      <Image image={items[currentImage].mainImage} />
                    </Paper>
                  )}
                </Transition>
              ) : (
                <p>ASDA</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
//  <div className={classes.ArrowWrapper}>
// <div className={classes.Arrow}>
//   <ArrowLeft
//     onClick={() => {
//       previousImage();
//     }}
//   />
// </div>

{
  /* <div className={classes.Arrow}>
  <ArrowRight
    onClick={() => {
      nextImage();
    }}
  /> */
}
// </div>
// </div>
