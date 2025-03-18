import { Button, ButtonProps, UploadProps } from "antd";
import Icon from "@ant-design/icons";
import Link from "@/assets/images/button/link.svg?react";
import { Upload as AntdUpload } from "antd";

const Upload = ({
  button,
  fileList,
  onChange,
  onFilesChange,
  ...props
}: UploadProps & {
  button?: ButtonProps;
  onFilesChange: (files: File[]) => Promise<void>;
}) => {
  return (
    <AntdUpload
      children={
        <Button
          style={{
            minWidth: "36px",
            minHeight: "36px",
            fontSize: "14px",
            borderRadius: "9999px",
          }}
          icon={
            <Icon
              style={{
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              component={Link}
            />
          }
          {...button}
        />
      }
      {...props}
      fileList={fileList}
      onChange={async (info) => {
        onChange?.(info);
        try {
          await onFilesChange(
            info.fileList.map((file) => file.originFileObj as File),
          );
        } catch (error) {
          console.error(error);
        }
      }}
    />
  );
};

export default Upload;
