import { Button, ButtonProps } from "antd";
import LikeFilled from "@/assets/images/button/like-fill.svg?react";
import LikeOutlined from "@/assets/images/button/like-outline.svg?react";
import Icon from "@ant-design/icons";
import { useState } from "react";
import { FeedbackType } from "@/apis/types";

const Like = ({
  id,
  onFeedback,
  ...props
}: ButtonProps & {
  id: string;
  onFeedback: (messageId: string, feedbackType: FeedbackType) => void;
}) => {
  const [liked, setLiked] = useState(false);
  const onClick = () => {
    const feedback = !liked ? FeedbackType.LIKE : FeedbackType.CANCEL;
    setLiked(!liked);
    onFeedback(id, feedback);
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
  id,
  onFeedback,
  ...props
}: ButtonProps & {
  id: string;
  onFeedback: (messageId: string, feedbackType: FeedbackType) => void;
}) => {
  const [disliked, setDisliked] = useState(false);
  const onClick = () => {
    const feedback = !disliked ? FeedbackType.DISLIKE : FeedbackType.CANCEL;
    setDisliked(!disliked);
    onFeedback(id, feedback);
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
