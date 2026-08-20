import React, { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Container from "../common/Container";
import Button from "../common/Button";
import chatApi from "../../api/chat.api";
import type { PublicUserProfile, ChatMessage } from "../../types/chat";
import { Link, useParams } from "react-router-dom";

interface PublicProfilePageProps {
  onNavigateHome?: () => void;
}

export default function PublicProfilePage({
  onNavigateHome,
}: PublicProfilePageProps) {
  const { username } = useParams();
  const [profile, setProfile] = useState<PublicUserProfile | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending]);

  // Load public profile and chat history
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      if (!username) return;
      setIsLoadingProfile(true);
      setError(null);

      try {
        // Fetch Public Profile
        const { data: profileRes } = await chatApi.getPublicProfile(username);
        if (isMounted && profileRes.data) {
          setProfile(profileRes.data);
        }
      } catch (err: any) {
        if (isMounted) {
          const msg =
            err.response?.data?.message ||
            (err instanceof Error ? err.message : "Public profile not found");
          setError(msg);
        }
      } finally {
        if (isMounted) setIsLoadingProfile(false);
      }

      // Fetch Chat History for this visitor
      try {
        setIsLoadingHistory(true);
        const { data: historyRes } = await chatApi.getChatHistory(username);
        if (isMounted && historyRes.data?.messages) {
          setMessages(historyRes.data.messages);
        }
      } catch (err) {
        console.error("Failed to load chat history:", err);
      } finally {
        if (isMounted) setIsLoadingHistory(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [username]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isSending || !profile) return;

    setInputMessage("");

    // Optimistically add visitor message
    const userMsg: ChatMessage = {
      role: "USER",
      content: text,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsSending(true);

    try {
      const { data: response } = await chatApi.sendMessage(
        profile.username,
        text,
      );
      const aiMsg = response.data?.message;
      if (aiMsg) {
        setMessages((prev) => [...prev, aiMsg]);
      }
    } catch (err: any) {
      const errMsg =
        err.response?.data?.message ||
        (err instanceof Error ? err.message : "Failed to send message");
      // Add error notification message in chat
      setMessages((prev) => [
        ...prev,
        {
          role: "ASSISTANT",
          content: `⚠️ Sorry, I encountered an error: ${errMsg}`,
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="inline-block animate-spin w-10 h-10 border-4 border-border-primary border-t-text-primary rounded-full" />
          <p className="text-sm font-medium text-text-secondary">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <Container className="max-w-md w-full text-center space-y-6 bg-bg-secondary p-8 rounded-3xl border border-border-primary shadow-xl">
          <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto text-2xl">
            👤
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-text-primary">
              Profile Not Found
            </h1>
            <p className="text-sm text-text-secondary mt-2">
              The user profile for{" "}
              <span className="font-semibold">{username}</span> could not be
              found or is not published.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            className="w-full"
            onClick={
              onNavigateHome
                ? onNavigateHome
                : () => (window.location.hash = "")
            }
          >
            Back to Home
          </Button>
        </Container>
      </div>
    );
  }

  const userDetails = profile.userId;

  return (
    <div className="min-h-[90vh] flex flex-col justify-between pt-6">
      <Container className="max-w-5xl! w-full flex-1 flex flex-col space-y-6">
        {/* CENTER SECTION: User Profile Info Header */}
        <div className="text-center space-y-4">
          <div className="relative inline-block mx-auto">
            {userDetails?.profileUrl ? (
              <img
                src={userDetails.profileUrl}
                alt={userDetails.fullName}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-bg-primary object-cover shadow-md mx-auto"
              />
            ) : (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-text-primary text-text-inverse flex items-center justify-center text-3xl font-bold mx-auto shadow-md">
                {userDetails?.fullName?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              {userDetails?.fullName}
            </h1>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 text-xs font-semibold text-text-secondary mt-2">
              <span>{profile.username}</span>
            </div>
          </div>

          {/* Suggested Questions Pills */}
          {profile.suggestedQuestions &&
            profile.suggestedQuestions.length > 0 && (
              <div className="pt-2 space-y-2">
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Ask me about:
                </p>
                <div className="flex flex-col items-center justify-center gap-2">
                  {profile.suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      disabled={isSending}
                      className="text-xs sm:text-sm px-4 py-2 rounded-full bg-bg-primary border border-border-primary hover:border-border-primary hover:bg-black/5 transition-all text-text-primary font-medium cursor-pointer disabled:opacity-50"
                    >
                      💡 {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
        </div>

        {/* CHAT MESSAGES DISPLAY AREA */}
        <div
          ref={chatContainerRef}
          className="flex-1 min-h-[320px] overflow-y-auto space-y-4"
        >
          {isLoadingHistory ? (
            <div className="text-center py-8 text-xs text-text-secondary">
              Loading chat history...
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-12 space-y-2"></div>
          ) : (
            messages.map((msg, index) => {
              const isUser = msg.role === "USER";
              return (
                <div
                  key={msg._id || index}
                  className={`flex items-start gap-3 ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden bg-text-primary text-text-inverse flex items-center justify-center text-xs font-bold shadow-sm">
                      {userDetails?.profileUrl ? (
                        <img
                          src={userDetails.profileUrl}
                          alt={userDetails.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        userDetails?.fullName?.charAt(0).toUpperCase() || "A"
                      )}
                    </div>
                  )}

                  <div
                    className={` text-base leading-relaxed ${
                      isUser
                        ? "px-4 py-3 rounded-2xl bg-bg-inverse text-text-inverse rounded-tr-none shadow-md mt-3 max-w-[50%]"
                        : "pr-4"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </ReactMarkdown>
                    </p>
                  </div>
                </div>
              );
            })
          )}

          {/* AI Thinking Animation Indicator */}
          {isSending && (
            <div className="flex items-start gap-3 justify-start mb-2">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-text-primary text-text-inverse flex items-center justify-center text-xs font-bold">
                {userDetails?.profileUrl ? (
                  <img
                    src={userDetails.profileUrl}
                    alt={userDetails.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  userDetails?.fullName?.charAt(0).toUpperCase() || "A"
                )}
              </div>

              <div className="bg-bg-primary border border-border-primary text-text-secondary px-4 py-3 rounded-2xl rounded-tl-none text-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-text-secondary animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-text-secondary animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-text-secondary animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1 text-xs">thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* INPUT FIELD BAR FOR VISITOR CHAT */}
        <div className="sticky bottom-0 bg-bg-primary">
          <div className="bg-bg-secondary border border-border-primary rounded-full p-2 shadow-lg backdrop-blur-md flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask anything about ${userDetails?.fullName || username}...`}
              disabled={isSending}
              className="flex-1 px-5 py-3 rounded-full bg-transparent text-sm text-text-primary placeholder:text-text-secondary focus:outline-none"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isSending || !inputMessage.trim()}
              className="w-11 h-11 rounded-full bg-bg-inverse text-text-inverse hover:opacity-90 active:scale-95 transition-all flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
              aria-label="Send message"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9-7-7-7M5 12h14"
                />
              </svg>
            </button>
          </div>
          <div className="w-full flex justify-around flex-wrap py-2">
            <p className="text-xs text-text-secondary">Chat history expires after 24 hours of inactivity.</p>
            <Link to="/" className="text-sm font-bold text-center ">
              Powered by Meknos
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
