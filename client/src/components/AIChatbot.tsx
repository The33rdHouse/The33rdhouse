import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { trpc } from "@/lib/trpc";
import { Loader2, MessageCircle, Send, X, Lock } from "lucide-react";
import { toast } from "sonner";
import { useSubscriptionAccess } from "@/hooks/useSubscriptionAccess";
import { UpgradeModal } from "./UpgradeModal";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIChatbotProps {
  currentGate?: number;
  currentRealm?: number;
  userProgress?: number;
}

export default function AIChatbot({ currentGate, currentRealm, userProgress }: AIChatbotProps) {
  const { hasAccess, userTier, isAuthenticated } = useSubscriptionAccess();
  const [isOpen, setIsOpen] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Welcome, seeker. I am here to guide you on your journey through The 33rd House. Ask me anything about the gates, realms, practices, or your spiritual path.",
    },
  ]);
  const [input, setInput] = useState("");
  
  const canAccessAI = hasAccess('aiChatbot');
  
  // Don't show chatbot for unauthenticated users
  if (!isAuthenticated) {
    return null;
  }

  const askQuestion = trpc.ai.askQuestion.useMutation({
    onSuccess: (response) => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
    },
    onError: (error) => {
      toast.error(`Failed to get response: ${error.message}`);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment." },
      ]);
    },
  });

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    // Send to AI
    askQuestion.mutate({
      question: userMessage,
      context: {
        currentGate,
        currentRealm,
        userProgress,
      },
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <>
        <Button
          onClick={() => canAccessAI ? setIsOpen(true) : setShowUpgradeModal(true)}
          className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 h-12 w-12 md:h-14 md:w-14 rounded-full shadow-lg z-50 ${
            canAccessAI 
              ? 'bg-purple-600 hover:bg-purple-700' 
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
          size="icon"
        >
        <MessageCircle className="h-6 w-6" />
        </Button>
        
        <UpgradeModal 
          open={showUpgradeModal}
          onOpenChange={setShowUpgradeModal}
          feature="aiChatbot"
          requiredTier="initiate"
          currentTier={userTier}
        />
      </>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-[calc(100vw-2rem)] md:w-96 h-[calc(100vh-8rem)] md:h-[600px] flex flex-col border-purple-900/30 bg-black/95 backdrop-blur-sm shadow-2xl z-50">
      <CardHeader className="border-b border-purple-900/30 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-purple-200 flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Spiritual Guide
            </CardTitle>
            <CardDescription className="text-gray-400">
              Ask questions about your journey
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-purple-950/30 text-gray-200 border border-purple-900/30"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {askQuestion.isPending && (
              <div className="flex justify-start">
                <div className="bg-purple-950/30 text-gray-200 border border-purple-900/30 rounded-lg p-3">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-purple-900/30 flex-shrink-0">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask your question..."
              className="bg-black/60 border-purple-900/30 text-gray-300 resize-none"
              rows={2}
              disabled={askQuestion.isPending}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || askQuestion.isPending}
              className="bg-purple-600 hover:bg-purple-700 self-end"
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
