import { Button, UploadFile } from "antd";
import type { UploadChangeParam } from "antd/es/upload/interface";
import Icon from "@ant-design/icons";
import Link from "@/assets/images/button/link.svg?react";
import { Upload as AntdUpload } from "antd";

const Upload = ({ setImage }: { setImage: (image: File | null) => void }) => {
  const upload = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status !== "uploading") {
      setImage(info.file.originFileObj as File);
    }
  };

  return (
    <AntdUpload
      children={
        <Button
          style={{
            minWidth: "36px",
            minHeight: "36px",
            fontSize: "20px",
          }}
          shape="circle"
          icon={<Icon style={{ fontSize: "20px" }} component={Link} />}
        />
      }
      onChange={upload}
    />
  );
};

export default Upload;
