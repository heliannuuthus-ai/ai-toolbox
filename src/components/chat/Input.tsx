import { Input as AntdInput, Button, ConfigProvider, Flex, Space } from "antd";
import Icon, {
  UploadOutlined,
  SearchOutlined,
  BulbOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import LightOn from "@/assets/images/button/light-on.svg?react";
import LightOff from "@/assets/images/button/light-off.svg?react";
import Link from "@/assets/images/button/link.svg?react";

const { TextArea } = AntdInput;

import { createStyles } from "antd-style";
import { useState } from "react";

const useStyles = createStyles(({ css }) => ({
  container: css`
    display: flex;
    width: 100%;
    position: relative;
  `,
  textareaBox: css`
    width: 100%;
    overflow-y: auto;
  `,
  textarea: css`
    padding-top: 1.25rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    margin-bottom: 1.25rem;
    border-width: 0px;
    textarea {
      padding: 0;
      border: none;
      resize: none;
    }
    &:focus {
      border: none;
      box-shadow: none;
      outline: none;
    }
  `,
  message: css`
    display: none;
  `,
}));

const useFunctionButtonStyles = createStyles(({ css }) => ({
  container: css``,
}));

export const FunctionButtons = () => {
  const [selectedThink, setSelectedThink] = useState<boolean>(false);

  return (
    <>
      <Button
        style={{
          padding: "0.5rem",
        }}
        shape="circle"
        icon={<Icon style={{ fontSize: "20px" }} component={Link} />}
      />

      <Button
        color="default"
        variant={selectedThink ? "filled" : "outlined"}
        icon={
          <Icon
            style={{ fontSize: "20px" }}
            component={selectedThink ? LightOn : LightOff}
          />
        }
        onClick={() => setSelectedThink(!selectedThink)}
      >
        思考
      </Button>

      <div style={{ display: "flex", alignItems: "center", marginLeft: "8px" }}>
        <span style={{ marginRight: "4px", color: "#888" }}>Grok 3</span>
        <Button icon={<ArrowUpOutlined />} type="text" />
      </div>
    </>
  );
};

export const Input = () => {
  const [message, setMessage] = useState<string>("");

  const { styles } = useStyles();
  return (
    <Flex className={styles.container} align="center" vertical>
      <div className={styles.textareaBox}>
        <span className={styles.message}>{message}</span>
        <ConfigProvider
          theme={{
            components: {
              Input: {
                paddingInlineLG: 0,
                paddingInlineSM: 0,
                paddingBlockLG: 0,
                paddingBlockSM: 0,
              },
            },
          }}
        >
          <TextArea
            className={styles.textarea}
            size="large"
            autoSize={{ minRows: 1, maxRows: 7 }}
            placeholder="想向 wikipedia 了解什么？"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </ConfigProvider>
      </div>
    </Flex>
  );
};
