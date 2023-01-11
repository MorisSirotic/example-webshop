import { useAppDispatch, useAppSelector } from "../../../common/hooks";
import { authentication, AuthType } from "./authenticationSlice";

export const Authentication = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.authentication);
  return (
    <>
      <button
        onClick={() =>
          dispatch(
            authentication({
              type: AuthType.LOGIN,
              data: { email: "123@corp.com", password: "12345678" },
            })
          )
        }
      >
        Login
      </button>
    </>
  );
};
