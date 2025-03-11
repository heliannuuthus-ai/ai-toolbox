import { useEffect, useState } from "react";
import { Select as AntdSelect, Form, SelectProps } from "antd";

const Select = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const [options, setOptions] = useState<SelectProps["options"]>([]);

  const form = Form.useFormInstance();
  const models = Form.useWatch("models", { form, preserve: true });

  useEffect(() => {
    setOptions(
      Object.keys(models || {}).map((key) => ({
        label: key,
        value: key,
      })),
    );
  }, [models]);

  return (
    <AntdSelect
      style={{
        minWidth: "200px",
        height: "36px",
        maxWidth: "300px",
        borderRadius: "9999px",
      }}
      options={options}
      value={value}
      onChange={onChange}
    />
  );
};

export default Select;
