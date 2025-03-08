import MessageBox from "@/components/chat/MessageBox";
import { Input, FunctionButtons } from "@/components/chat/Input";

import { createStyles } from "antd-style";

const useStyles = createStyles(({ css, token }) => ({
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
  input: css`
    position: relative;
    padding-bottom: 1rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  `,
  inputForm: css`
    position: relative;
    border-radius: 1.5rem;
    background-color: var(--background-color);
    box-shadow: ${token.boxShadow};
  `,
  inputBox: css`
    padding-bottom: 3rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  `,
  functionButtons: css`
    max-width: 100%;
    border-color: transparent;
    border-width: 2px;
    padding: 0.75rem;
    position: absolute;
    display: flex;
    left: 0;
    right: 0;
    bottom: 0;
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
        <div className={styles.input}>
          <div className={styles.inputForm}>
            <div className={styles.inputBox}>
              <Input />
            </div>
            <div className={styles.functionButtons}>
              <FunctionButtons />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Box;
