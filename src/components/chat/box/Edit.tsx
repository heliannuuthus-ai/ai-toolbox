import { Button, ButtonProps } from "antd";
import Icon from "@ant-design/icons";
import EditIcon from "@/assets/images/button/edit.svg?react";
import { ChatMessage } from "@/apis/types";
const Edit = ({
  message,
  ...props
}: ButtonProps & { message: ChatMessage }) => {
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
