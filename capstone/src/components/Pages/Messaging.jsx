import React, { useEffect, useState } from "react";
import LoadingIcon from "../Widgets/LoadingIcon";

import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  LoadingIndicator,
  ChannelList,
} from "stream-chat-react";

import "/Users/josuearredondo/Non-iCloud Items/DevMountain-course-files/Projects/Capstone-Reduce-N-Produce-quill/capstone/node_modules/stream-chat-react/dist/css/index.css";

const apiKey = import.meta.env.REACT_APP_STREAM_API_KEY;

const user = {
  id: "1",
  name: "John Doe",
  image: "https://getstream.io/random_svg/?id=1&name=John+Doe",
};

export default function Messaging() {
  const [client, setClient] = useState(null);
  // const [channel, setChannel] = useState(null);

  useEffect(() => {
    async function init() {
      const chatClient = StreamChat.getInstance(apiKey);

      await chatClient.connectUser(user, chatClient.devToken(user.id));

      const channel = chatClient.channel("messaging", "general", {
        name: "General",
      });

      await channel.watch();

      setClient(chatClient);
    }

    init();

    if (client) return () => client.disconnectUser();
  }, []);

  if (!client) return <LoadingIndicator />;

  return (
    <Chat client={client} theme="messaging dark">
      <ChannelList />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
}
