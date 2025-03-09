import MessageBox from "@/components/chat/MessageBox";
import Input from "@/components/chat/Input";

import { createStyles } from "antd-style";

const useStyles = createStyles(({ css }) => ({
  container: css`
    height: 100%;
    overflow-y: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
  `,
  inputContainer: css`
    position: absolute;
    bottom: 0;
    left: var(--sidebar-width);
    right: 0;
    max-width: 50rem;
    margin-left: auto;
    margin-right: auto;
  `,
}));

const Box = () => {
  const { styles } = useStyles();
  return (
    <>
      <div className={styles.container}>
        <MessageBox />
      </div>
      <div className={styles.inputContainer}>
        <Input />
      </div>
    </>
  );
};

export default Box;
