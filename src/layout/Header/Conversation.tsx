import { Button, Drawer, Modal } from "antd";
import History from "@/assets/images/button/history.svg?react";
import { useState } from "react";

const Conversation = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type="text" onClick={() => setOpen(true)}>
        <History />
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <div>
          <h1>History</h1>
        </div>
      </Drawer>
    </>
  );
};

export default Conversation;
