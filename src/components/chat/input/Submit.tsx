import { Button } from "antd";
import Arrow from "@/assets/images/button/arrow.svg?react";
import Square from "@/assets/images/button/square.svg?react";
import Icon from "@ant-design/icons";
import { useEffect, useState } from "react";

interface SubmitProps {
  abortController: AbortController | null;
  onSubmit: () => void;
  onStop: () => void;
}

const Submit = ({ abortController: abort, onSubmit, onStop }: SubmitProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setIsGenerating(abort !== null);
  }, [abort]);

  return (
    <Button
      htmlType="submit"
      style={{
        minWidth: "36px",
        minHeight: "36px",
        fontSize: "20px",
      }}
      onClick={() => {
        if (isGenerating) {
          onStop();
          return;
        }
        onSubmit();
      }}
      shape="circle"
      icon={
        <Icon
          component={isGenerating ? Square : Arrow}
          style={{ fontSize: "20px" }}
        />
      }
    />
  );
};

export default Submit;
