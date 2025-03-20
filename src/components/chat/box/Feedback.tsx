import { Button, ButtonProps } from "antd";
import LikeFilled from "@/assets/images/button/like-fill.svg?react";
import LikeOutlined from "@/assets/images/button/like-outline.svg?react";
import Icon from "@ant-design/icons";
import { useState } from "react";
import { ChatMessage, FeedbackType } from "@/apis/types";

const Like = ({
  message,
  onFeedback,
  ...props
}: ButtonProps & {
  message: ChatMessage;
  onFeedback: (messageId: string, feedbackType: FeedbackType) => void;
}) => {
  const [liked, setLiked] = useState(false);
  const onClick = () => {
    const feedback = !liked ? FeedbackType.LIKE : FeedbackType.CANCEL;
    setLiked(!liked);
    onFeedback(message.messageId, feedback);
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
  message,
  onFeedback,
  ...props
}: ButtonProps & {
  message: ChatMessage;
  onFeedback: (messageId: string, feedbackType: FeedbackType) => void;
}) => {
  const [disliked, setDisliked] = useState(false);
  const onClick = () => {
    const feedback = !disliked ? FeedbackType.DISLIKE : FeedbackType.CANCEL;
    setDisliked(!disliked);
    onFeedback(message.messageId, feedback);
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
