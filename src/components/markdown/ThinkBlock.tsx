import React, { useEffect, useRef, useState, ReactNode } from "react";
import { Collapse, Typography } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

const { Text } = Typography;

// 检查是否包含结束标志
const hasEndThink = (children: any): boolean => {
  if (typeof children === "string") return children.includes("[ENDTHINKFLAG]");
  if (Array.isArray(children)) return children.some(hasEndThink);
  if (React.isValidElement(children) && "children" in (children.props as any)) {
    return hasEndThink((children.props as any).children);
  }
  return false;
};

// 移除结束标志
const removeEndThink = (children: any): ReactNode => {
  if (typeof children === "string")
    return children.replace("[ENDTHINKFLAG]", "");
  if (Array.isArray(children)) return children.map(removeEndThink);
  if (React.isValidElement(children) && "children" in (children.props as any)) {
    return React.cloneElement(children, {
      ...(children.props as any),
      children: removeEndThink((children.props as any).children),
    });
  }
  return children;
};

// 自定义 Hook 管理计时器
const useThinkTimer = (children: any) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const startTimeRef = useRef(Date.now());
  const timerRef = useRef<number>(0);

  useEffect(() => {
    if (!isComplete) {
      timerRef.current = setInterval(() => {
        setElapsedTime(
          Math.floor((Date.now() - startTimeRef.current) / 100) / 10,
        );
      }, 100);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isComplete]);

  useEffect(() => {
    if (hasEndThink(children)) {
      setIsComplete(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [children]);

  return { elapsedTime, isComplete };
};

export const ThinkBlock = ({ children, ...props }: any) => {
  const { elapsedTime, isComplete } = useThinkTimer(children);
  const displayContent = removeEndThink(children);

  // 如果没有 data-think 属性，直接返回原始内容
  if (!(props["data-think"] ?? false)) {
    return <details {...props}>{children}</details>;
  }

  return (
    <Collapse
      defaultActiveKey={isComplete ? [] : ["1"]} // 未完成时默认展开
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      bordered={false}
      className="bg-gray-50"
      items={[
        {
          key: "1",
          label: (
            <Text strong type={isComplete ? "success" : "warning"}>
              {isComplete
                ? `已思考(${elapsedTime.toFixed(1)}s)`
                : `思考中...(${elapsedTime.toFixed(1)}s)`}
            </Text>
          ),
          children: <div className="p-3 text-gray-500">{displayContent}</div>,
        },
      ]}
    />
  );
};

export default ThinkBlock;
