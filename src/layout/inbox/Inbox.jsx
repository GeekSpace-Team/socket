import React from "react";
import InboxCard from "../../view/inboxCard/InboxCard";
import "../../style/inbox/inbox.css";

const Inbox = (props) => {
  return (
    <div>
      <InboxCard  unreadCount={props.unreadCount} setUnreadCount={props.setUnreadCount}/>
    </div>
  );
};

export default Inbox;
