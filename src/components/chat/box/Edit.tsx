import { Button, ButtonProps } from "antd";
import Icon from "@ant-design/icons";
import EditIcon from "@/assets/images/button/edit.svg?react";
import { MessageProps } from "@/components/chat/box/Box";

const Edit = ({
  message,
  ...props
}: ButtonProps & { message: MessageProps }) => {
  return (
    <Button
      {...props}
      shape="circle"
      type="text"
      icon={<Icon component={EditIcon} />}
    />
  );
};

export default Edit;
