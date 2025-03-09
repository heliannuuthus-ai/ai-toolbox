import { createStyles } from "antd-style";
import TextArea from "@/components/chat/input/Textarea";
import Functions from "@/components/chat/input/Functions";
import Upload from "@/components/chat/input/Upload";
import Submit from "@/components/chat/input/Submit";

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    position: relative;
    padding-bottom: 1rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  `,
  form: css`
    position: relative;
    border-radius: 1.5rem;
    background-color: var(--background-color);
    box-shadow: ${token.boxShadow};
  `,
  textarea: css`
    padding-bottom: 3rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  `,
  buttons: css`
    max-width: 100%;
    border-color: transparent;
    border-width: 2px;
    padding: 0.75rem;
    position: absolute;
    gap: 0.375rem;
    display: flex;
    left: 0;
    right: 0;
    bottom: 0;
    button {
      height: 36px;
    }
  `,
}));

const Input = () => {
  const { styles } = useStyles();
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.textarea}>
          <TextArea />
        </div>
        <div className={styles.buttons}>
          <Upload />
          <Functions />
          <Submit />
        </div>
      </div>
    </div>
  );
};

export default Input;
