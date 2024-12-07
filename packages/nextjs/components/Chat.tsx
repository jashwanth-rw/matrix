import { useState, useEffect } from 'react';
// import 'react-daisyui/react';

export default function Chat(){
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSendMessage = () => {
        setMessages([...messages, { text: input, sender: 'user' }]);
        setInput('');
        setMessages([...messages, { text: 'Sure', sender: 'bot' }]);
    };

    return(
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-center justify-center w-4/5">
                <div className="flex flex-col justify-center gap-2">
                    {messages.map((message, index) => (
                        <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-2 ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                                {message.text}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex gap-2 mt-4">
                    <input value={input} onChange={e => setInput(e.target.value)} className="input input-bordered w-full max-w-xs" />
                    <button onClick={handleSendMessage} className="btn">Send</button>
                </div>
            </div>
        </div>
    )
}