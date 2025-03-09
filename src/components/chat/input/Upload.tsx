import { Button } from "antd";
import Icon from "@ant-design/icons";
import Link from "@/assets/images/button/link.svg?react";

const Upload = () => {
  return (
    <Button
      style={{
        minWidth: "36px",
        minHeight: "36px",
        fontSize: "20px",
      }}
      shape="circle"
      icon={<Icon style={{ fontSize: "20px" }} component={Link} />}
    />
  );
};

export default Upload;
