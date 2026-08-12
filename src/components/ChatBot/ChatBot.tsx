import React from "react";
import { Modal, Text, ScrollArea } from "@mantine/core";
import { IoSend, IoStopCircleOutline } from "react-icons/io5";
import { MdPerson } from "react-icons/md";
import { VscSparkle } from "react-icons/vsc";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { ChatInput } from "../ChatInput";
import {
  StyledAvatar,
  StyledChatContainer,
  StyledCreditLink,
  StyledEyebrow,
  StyledHeader,
  StyledHeaderBottom,
  StyledHeaderTop,
  StyledMessageBubble,
  StyledMessageList,
  StyledMessageRow,
  StyledSubtitle,
  StyledThinkingBar,
  StyledThinkingContainer,
  StyledThinkingHeader,
  StyledThinkingText,
  StyledTitle,
} from "./styles";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

interface ChatBotProps {
  opened: boolean;
  onClose: () => void;
}

export const ChatBot: React.FC<ChatBotProps> = ({ opened, onClose }) => {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "1",
      text: "Hello! How can I help you with JSON Visualization?",
      isUser: false,
    },
  ]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);

  const placeholders = [
    "How do I convert JSON to CSV?",
    "What is JSON Schema validation?",
    "How to use JSONPath queries?",
    "Explain jq query syntax",
    "How to export visualization as image?",
  ];

  React.useEffect(() => {
    if (!viewportRef.current) return;
    requestAnimationFrame(() => {
      if (!viewportRef.current) return;
      viewportRef.current.scrollTo({
        top: viewportRef.current.scrollHeight,
        behavior: "auto",
      });
    });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setLoading(true);

    const botMessageId = (Date.now() + 1).toString();
    const botMessage: Message = {
      id: botMessageId,
      text: "",
      isUser: false,
    };
    setMessages(prev => [...prev, botMessage]);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_CHAT_API_URL || "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CHAT_API_KEY}`,
        },
        body: JSON.stringify({
          model: "thinhphoenix/nobody",
          messages: [
            {
              role: "system",
              content:
                "You are the official assistant for JSON Visualization (JsonViz). Help users with how-to questions about the app: pasting/importing JSON, formatting/pretty-printing, Graph/Tree/JsonDraw views, search, JSONPath, jq, schema validation, conversions (JSON/YAML/CSV/XML), exporting, sharing, and troubleshooting errors. Explain JsonDraw as the freeform drawing canvas built from the JSON graph (autosaves locally; use Clear Drawing to reload from JSON). Use concise, friendly answers and format responses in markdown. If a question is outside JsonViz or general data/JSON tooling, politely say you only support JsonViz-related questions and ask them to rephrase around JsonViz.",
            },
            {
              role: "user",
              content: currentInput,
            },
          ],
          stream: true,
        }),
      });

      if (!response.ok || !response.body) throw new Error("Failed");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let accumulatedText = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                accumulatedText += content;
                setMessages(prev =>
                  prev.map(msg =>
                    msg.id === botMessageId ? { ...msg, text: accumulatedText } : msg
                  )
                );
              }
            } catch {
              // Skip invalid JSON
            }
          }
        }
      }

      if (!accumulatedText) {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === botMessageId ? { ...msg, text: "Sorry, I couldn't process that." } : msg
          )
        );
      }
    } catch {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === botMessageId
            ? { ...msg, text: "Sorry, there was an error connecting to the chat service." }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="lg"
      radius="md"
      centered
      overlayProps={{
        color: "#171816",
        opacity: 0.5,
        blur: 3,
      }}
      styles={{
        header: {
          paddingBottom: 14,
          borderBottom: "1px solid #d9d9d3",
          backgroundColor: "#ffffff",
          color: "#171816",
        },
        body: {
          paddingTop: 16,
          backgroundColor: "#ffffff",
        },
        content: {
          backgroundColor: "#ffffff",
          border: "1px solid #bfc0b9",
          borderRadius: "10px",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.16)",
          overflow: "hidden",
        },
      }}
      title={
        <StyledHeader>
          <StyledHeaderTop>
            <StyledEyebrow>Documentation Assistant</StyledEyebrow>
          </StyledHeaderTop>
          <StyledHeaderTop>
            <StyledTitle>JsonViz Assistant</StyledTitle>
          </StyledHeaderTop>
          <StyledHeaderBottom>
            <StyledSubtitle>Ask about formatting, queries, conversions, or exports.</StyledSubtitle>
            <StyledCreditLink
              href="https://llm.chila.io.vn/"
              target="_blank"
              rel="noopener noreferrer"
            >
              API powered by Chila.io.vn
            </StyledCreditLink>
          </StyledHeaderBottom>
        </StyledHeader>
      }
    >
      <StyledChatContainer>
        <ScrollArea viewportRef={viewportRef} style={{ flex: 1 }} mb="md">
          <StyledMessageList>
            {messages.map(msg => (
              <StyledMessageRow key={msg.id} $isUser={msg.isUser}>
                {!msg.isUser && (
                  <StyledAvatar $isUser={false}>
                    <VscSparkle size={15} />
                  </StyledAvatar>
                )}
                <StyledMessageBubble $isUser={msg.isUser}>
                  {msg.isUser ? (
                    <Text size="sm" c="dark">
                      {msg.text}
                    </Text>
                  ) : msg.text ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                      {msg.text}
                    </ReactMarkdown>
                  ) : (
                    <StyledThinkingContainer>
                      <StyledThinkingHeader>
                        <VscSparkle
                          size={13}
                          style={{ color: "var(--public-text-subtle, #81847c)" }}
                        />
                        <StyledThinkingText>Thinking...</StyledThinkingText>
                      </StyledThinkingHeader>
                      <StyledThinkingBar $width="85%" />
                      <StyledThinkingBar $width="60%" />
                    </StyledThinkingContainer>
                  )}
                </StyledMessageBubble>
                {msg.isUser && (
                  <StyledAvatar $isUser={true}>
                    <MdPerson size={15} />
                  </StyledAvatar>
                )}
              </StyledMessageRow>
            ))}
            <div ref={messagesEndRef} />
          </StyledMessageList>
        </ScrollArea>

        <ChatInput
          placeholders={placeholders}
          value={input}
          onChange={e => setInput(e.target.value)}
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          disabled={false}
          loading={loading}
          sendIcon={<IoSend size={16} />}
          stopIcon={<IoStopCircleOutline size={18} />}
        />
      </StyledChatContainer>
    </Modal>
  );
};
