import {
  CheckBoxOutlined,
  CloseOutlined,
  Inventory2Outlined,
  LocalShippingOutlined
} from "@mui/icons-material";
import styled from "styled-components";

export const OrderStatus = ({ order }: any) => {
  const status = {
    transit: <LocalShippingOutlined />,
    completed: <CheckBoxOutlined />,
    processing: <Inventory2Outlined />,
    failed: <CloseOutlined />,
  };

  const renderedStatus = Object.entries(status)
    .filter(([status]) => status === order.status.info)
    .map(([status, icon]) => {
      return (
        <div key={status} className={status}>
          {icon}
        </div>
      );
    });
  return (
    <Wrapper>
      <div className="status">
        <div className="_statusText"> Status: {order.status.info}</div>
        <div className="_statusIcon">{renderedStatus}</div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  padding-left: 0px;
  justify-content: space-between;

  .status {
    display: flex;
  }

  ._statusText {
    min-width: 120px;
  }

  ._statusIcon {
    min-width: 10%;
  }

  ._statusIcon > div > * {
    font-size: 24px;
  }

  .failed {
    color: red;
  }

  .completed {
    color: green;
  }

  .transit {
    color: darkgray;
  }
`;

const Red = styled.section`
  color: red;
`;
