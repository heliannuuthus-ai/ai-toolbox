import { Button } from "antd";
import Arrow from "@/assets/images/button/arrow.svg?react";
import Icon from "@ant-design/icons";

const Submit = () => {
  return (
    <Button
      style={{
        minWidth: "36px",
        minHeight: "36px",
        fontSize: "20px",
      }}
      shape="circle"
      icon={<Icon component={Arrow} />}
    />
  );
};

export default Submit;
