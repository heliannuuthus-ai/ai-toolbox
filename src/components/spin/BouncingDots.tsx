import { createStyles } from "antd-style";

const useStyles = createStyles(({ css }) => ({
  container: css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
    padding: 8px;
  `,
  dot: css`
    width: 6px;
    height: 6px;
    background-color: #7d8187;
    border-radius: 50%;
    display: inline-block;
    animation: bounce 1.2s infinite;
    opacity: 0.7;

    &:nth-child(2) {
      animation-delay: 0.3s;
    }

    &:nth-child(3) {
      animation-delay: 0.6s;
    }

    @keyframes bounce {
      0%,
      80%,
      100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-8px);
      }
    }
  `,
}));

const BouncingDots = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
    </div>
  );
};

export default BouncingDots;
