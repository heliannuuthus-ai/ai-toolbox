import { Button, ButtonProps } from "antd";
import { useCallback } from "react";

type ToggleChangeHandler =
  | ((value: boolean) => void | Promise<void>)
  | React.Dispatch<React.SetStateAction<boolean>>;

interface ToggleProps extends Omit<ButtonProps, "value" | "onChange"> {
  value?: boolean;
  onChange?: ToggleChangeHandler;
}

const Toggle: React.FC<ToggleProps> = ({ value, onChange, ...props }) => {
  const handleClick = useCallback(async () => {
    if (!onChange) return;

    try {
      const result = onChange(!value);
      // 处理异步情况
      if (result instanceof Promise) {
        await result;
      }
    } catch (error) {
      console.error("Toggle change failed:", error);
    }
  }, [value]);

  return <Button shape="circle" type="text" onClick={handleClick} {...props} />;
};

export default Toggle;
