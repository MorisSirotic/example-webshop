import { useAppDispatch, useAppSelector } from "../../../common/hooks";
import { Alert_Type } from "./types/AlertTypes";

export const Alert = () => {
  const alerts = useAppSelector((state) => state.alerts);

  if (alerts.type !== Alert_Type.CLEAR) {
    return (
      <>
        <p>Alert Message</p>
        <div style={{ backgroundColor: "red" }}>{alerts.message}</div>
      </>
    );
  }

  return <></>;
};
