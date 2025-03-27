import { Button } from "antd";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface SubmitProps {
  generating: boolean;
  onSubmit: () => Promise<void>;
  onStop: () => Promise<void>;
}

const PlayPauseButton = ({ generating }: { generating: boolean }) => {
  const playRef = useRef<SVGPathElement>(null);
  const pauseRef = useRef<SVGPathElement>(null);

  const playPath =
    "M213.333333 309.12c0-96.554667 102.4-157.482667 186.624-113.792l6.272 3.456 344.874667 202.88c81.664 48.042667 84.053333 164.096 7.210667 216.106667l-7.210667 4.565333-344.874667 202.88c-83.242667 48.938667-187.648-8.405333-192.725333-103.168L213.333333 714.88v-405.76z m64 0v405.76a64 64 0 0 0 96.426667 55.168l344.917333-202.88a64 64 0 0 0 0-110.336L373.76 253.952A64 64 0 0 0 277.333333 309.12z";
  const pausePath =
    "M309.333333 213.333333v597.333334a32 32 0 0 0 64 0V213.333333a32 32 0 1 0-64 0zM650.666667 213.333333v597.333334a32 32 0 0 0 64 0V213.333333a32 32 0 1 0-64 0z";

  useEffect(() => {
    if (generating) {
      // 播放 -> 暂停：隐藏播放图标，显示暂停图标
      gsap.to(playRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(pauseRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.inOut",
      });
    } else {
      // 暂停 -> 播放：隐藏暂停图标，显示播放图标
      gsap.to(playRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(pauseRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [generating]);

  return (
    <svg width="20" height="20" viewBox="0 0 1024 1024">
      <path
        ref={playRef}
        d={playPath}
        fill="currentColor"
        style={{ opacity: 1, transformOrigin: "center" }} // 初始显示播放图标
      />
      <path
        ref={pauseRef}
        d={pausePath}
        fill="currentColor"
        style={{ opacity: 0, transformOrigin: "center" }} // 初始隐藏暂停图标
      />
    </svg>
  );
};

const Submit = ({ generating, onSubmit, onStop }: SubmitProps) => {
  useEffect(() => {}, [generating]);

  return (
    <Button
      htmlType="submit"
      style={{
        minWidth: "36px",
        minHeight: "36px",
        fontSize: "20px",
      }}
      onClick={async () => {
        if (generating) {
          await onStop();
          return;
        }
        await onSubmit();
      }}
      shape="circle"
      icon={<PlayPauseButton generating={generating} />}
    />
  );
};

export default Submit;
