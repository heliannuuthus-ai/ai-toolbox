import { Button, ButtonProps } from "antd";
import Icon from "@ant-design/icons";
import EditIcon from "@/assets/images/button/edit.svg?react";

const Edit = ({ content, ...props }: ButtonProps & { content: string }) => {
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
