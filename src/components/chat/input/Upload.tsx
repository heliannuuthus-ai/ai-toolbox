import { Button, Form } from "antd";
import type { UploadProps } from "antd/es/upload/interface";
import Icon from "@ant-design/icons";
import Link from "@/assets/images/button/link.svg?react";
import { Upload as AntdUpload } from "antd";
import { useEffect } from "react";
const Upload = ({ ...props }: UploadProps) => {
  const form = Form.useFormInstance();
  const model = Form.useWatch("model", form);
  const models = Form.useWatch("models", { form, preserve: true });

  useEffect(() => {}, [models]);

  return (
    models &&
    models[model] &&
    models[model].image_to_text_model && (
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
        {...props}
      />
    )
  );
};

export default Upload;
