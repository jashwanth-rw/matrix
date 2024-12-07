import { useEffect, useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize speech recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = event => {
          const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join("");
          setInput(transcript);
        };

        recognition.onerror = event => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);
        };

        setRecognition(recognition);
      }
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognition?.stop();
      setIsListening(false);
    } else {
      recognition?.start();
      setIsListening(true);
    }
  };

  const getBotResponse = async (userMessage: string) => {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant who responds in a friendly and concise manner.",
            },
            {
              role: "user",
              content: userMessage,
            },
          ],
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error getting bot response:", error);
      return "Sorry, I'm having trouble processing your request right now.";
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { text: input, sender: "user" };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput("");
    setIsLoading(true);

    // Get and add bot message
    const botResponse = await getBotResponse(input);
    setIsLoading(false);
    const botMessage = { text: botResponse, sender: "bot" };
    setMessages(prevMessages => [...prevMessages, botMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 relative w-full mx-auto">
        {/* Messages container with absolute positioning and overflow */}
        <div className="absolute inset-0 flex flex-col">
          {/* Scrollable messages area that fills available space */}
          <div className="flex-1 overflow-y-auto pb-20">
            <div className="flex flex-col gap-2 p-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`p-2 rounded-lg max-w-[70%] break-words ${
                      message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="p-2 rounded-lg bg-gray-300">Thinking...</div>
                </div>
              )}
            </div>
          </div>

          {/* Fixed input container at bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-base-100 border-t p-4">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="input input-bordered w-full"
                placeholder="Type your message..."
              />
              <button onClick={toggleListening} className={`btn ${isListening ? "btn-error" : "btn-secondary"}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                  />
                </svg>
              </button>
              <button onClick={handleSendMessage} className="btn btn-primary" disabled={!input.trim() || isLoading}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
