import { Button, ButtonProps } from "antd";
import LikeFilled from "@/assets/images/button/like-fill.svg?react";
import LikeOutlined from "@/assets/images/button/like-outline.svg?react";
import Icon from "@ant-design/icons";
import { useState } from "react";
import { Feedback } from "@/apis/types";

const Like = ({
  onFeedback,
  ...props
}: ButtonProps & { onFeedback: (feedback: Feedback) => void }) => {
  const [liked, setLiked] = useState(false);
  const onClick = () => {
    const feedback = !liked ? Feedback.LIKE : Feedback.CANCEL;
    setLiked(!liked);
    onFeedback(feedback);
  };

  return (
    <Button
      {...props}
      shape="circle"
      type="text"
      icon={<Icon component={liked ? LikeFilled : LikeOutlined} />}
      onClick={onClick}
    />
  );
};

const Dislike = ({
  onFeedback,
  ...props
}: ButtonProps & { onFeedback: (feedback: Feedback) => void }) => {
  const [disliked, setDisliked] = useState(false);
  const onClick = () => {
    const feedback = !disliked ? Feedback.DISLIKE : Feedback.CANCEL;
    setDisliked(!disliked);
    onFeedback(feedback);
  };
  return (
    <Button
      {...props}
      shape="circle"
      type="text"
      onClick={onClick}
      icon={
        <Icon
          style={{ transform: "matrix(-1, 0, 0, 1, 0, 0) rotate(180deg)" }}
          component={disliked ? LikeFilled : LikeOutlined}
        />
      }
    />
  );
};

export default { Like, Dislike };
