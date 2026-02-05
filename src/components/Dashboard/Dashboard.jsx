import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Chatbot Component
function Chatbot() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [messages, setMessages] = React.useState([
        { id: crypto.randomUUID(), text: "Hi! I'm SmartPark Bot. How can I help you today?", sender: 'bot' }
    ]);
    const [input, setInput] = React.useState("");
    const [isTyping, setIsTyping] = React.useState(false);
    const messagesEndRef = React.useRef(null);
    const navigate = useNavigate();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    React.useEffect(scrollToBottom, [messages]);

    const getBotResponse = (input) => {
        let botResponse = "I'm here to help with parking questions! Try asking about rates, availability, or booking.";
        let quickReplies = null;
        const lowerInput = input.toLowerCase();

        if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
            botResponse = "Hello! Welcome to SmartPark. How can I assist you with your parking needs today?";
            quickReplies = ['Find parking', 'My bookings', 'Pricing info'];
        } else if (lowerInput.includes('find') || lowerInput.includes('park') || lowerInput.includes('parking')) {
            botResponse = "Great! I can help you find available parking spots. Let me take you to our interactive map.";
            setTimeout(() => navigate('/parkingMap'), 2000);
        } else if (lowerInput.includes('booking') || lowerInput.includes('reservation')) {
            botResponse = "Let me check your bookings for you.";
            setTimeout(() => navigate('/my-bookings'), 2000);
        } else if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('rate') || lowerInput.includes('fee')) {
            botResponse = "Our parking rates vary by location and time:\n• Downtown: $4-6/hour\n• Residential: $2-4/hour\n• Airport: $8-12/hour\n\nAll major credit cards accepted. Monthly passes available!";
            quickReplies = ['Book now', 'Monthly pass', 'Payment methods'];
        } else if (lowerInput.includes('full') || lowerInput.includes('availability') || lowerInput.includes('space')) {
            botResponse = "Most of our lots have availability, but some popular spots fill up quickly during peak hours (8-10 AM, 5-7 PM). Check the map for real-time updates!";
            quickReplies = ['Check map', 'Peak hours'];
        } else if (lowerInput.includes('how') && lowerInput.includes('book')) {
            botResponse = "Booking is easy! Just:\n1. Select a location on the map\n2. Choose your time slot\n3. Enter payment info\n4. Get your digital ticket\n\nYou can modify or cancel up to 30 minutes before your reservation.";
            quickReplies = ['Book now', 'Cancellation policy'];
        } else if (lowerInput.includes('cancel') || lowerInput.includes('refund')) {
            botResponse = "You can cancel reservations up to 30 minutes before the start time for a full refund. Cancellations within 30 minutes may incur a small fee. Contact support for special cases.";
            quickReplies = ['Contact support', 'My bookings'];
        } else if (lowerInput.includes('payment') || lowerInput.includes('pay')) {
            botResponse = "We accept all major credit/debit cards, Apple Pay, Google Pay, and PayPal. Payments are processed securely through our encrypted system.";
            quickReplies = ['Book now', 'Security info'];
        } else if (lowerInput.includes('hours') || lowerInput.includes('open')) {
            botResponse = "Most lots are open 24/7, but some have restrictions:\n• Downtown garages: 24/7\n• Street parking: Varies by zone\n• Airport: 24/7\n\nCheck specific lot details on the map.";
            quickReplies = ['Check map', 'Airport parking'];
        } else if (lowerInput.includes('contact') || lowerInput.includes('support') || lowerInput.includes('help')) {
            botResponse = "Need more help? Our support team is available:\n• Email: support@smartpark.com\n• Phone: 1-800-PARK-NOW\n• Live chat: Available 9 AM - 9 PM daily\n\nWe're here to help!";
            quickReplies = ['Email support', 'Call now'];
        } else if (lowerInput.includes('monthly') || lowerInput.includes('pass') || lowerInput.includes('subscription')) {
            botResponse = "Monthly passes save you up to 30%!\n• Basic: $150/month (unlimited parking)\n• Premium: $250/month (reserved spot + EV charging)\n• Business: Custom rates for companies\n\nSign up in your dashboard!";
            quickReplies = ['Sign up', 'Compare plans'];
        } else if (lowerInput.includes('ev') || lowerInput.includes('electric') || lowerInput.includes('charging')) {
            botResponse = "We have EV charging stations at select locations:\n• Downtown Plaza: 10 stations\n• Tech Center: 15 stations\n• Airport: 20 stations\n\nPremium pass includes free charging!";
            quickReplies = ['Find EV spots', 'Premium pass'];
        } else if (lowerInput.includes('location') || lowerInput.includes('where') || lowerInput.includes('address')) {
            botResponse = "We have parking locations throughout the city. Use our map to find the closest spot to your destination. Popular areas include downtown, airport, shopping centers, and business districts.";
            quickReplies = ['View map', 'Popular areas'];
        } else if (lowerInput.includes('thank') || lowerInput.includes('thanks')) {
            botResponse = "You're welcome! Happy parking! 🚗✨";
        } else if (lowerInput.includes('bye') || lowerInput.includes('goodbye')) {
            botResponse = "Goodbye! Drive safely and we'll see you next time!";
            setTimeout(() => setIsOpen(false), 2000);
        }

        return { botResponse, quickReplies };
    };

    const handleQuickReply = (reply) => {
        const userMsg = { id: crypto.randomUUID(), text: reply, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);

        setIsTyping(true);

        setTimeout(() => {
            const { botResponse, quickReplies } = getBotResponse(reply);
            const botMsg = { id: crypto.randomUUID(), text: botResponse, sender: 'bot', quickReplies };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { id: crypto.randomUUID(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput("");

        setIsTyping(true);

        setTimeout(() => {
            const { botResponse, quickReplies } = getBotResponse(userMsg.text);
            const botMsg = { id: crypto.randomUUID(), text: botResponse, sender: 'bot', quickReplies };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const renderMessage = (msg) => (
        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${msg.sender === 'user' ? '' : 'space-y-2'}`}>
                <div className={`rounded-lg p-3 text-sm ${msg.sender === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-br-none'
                        : 'bg-gradient-to-r from-slate-800 to-slate-900 text-slate-300 border border-purple-500/20 rounded-bl-none'
                    }`}>
                    {msg.text}
                </div>
                {msg.quickReplies && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {msg.quickReplies.map((reply, index) => (
                            <button
                                key={index}
                                onClick={() => handleQuickReply(reply)}
                                className="bg-[#283039] hover:bg-[#3b4754] text-[#9dabb9] hover:text-white px-3 py-1 rounded-full text-xs transition-colors"
                            >
                                {reply}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 bg-[#9333ea] rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                </button>
            )}

            {isOpen && (
                <div className="w-80 h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl border border-purple-500/20 flex flex-col overflow-hidden animate-fade-in-up">
                    <div className="bg-gradient-to-r from-purple-600 to-cyan-600 p-4 flex justify-between items-center">
                        <h3 className="text-white font-bold flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            SmartBot
                        </h3>
                        <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
                        {messages.map(renderMessage)}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-slate-300 border border-purple-500/20 rounded-lg rounded-bl-none p-3 max-w-[80%]">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-3 bg-gradient-to-r from-slate-800 to-slate-900 border-t border-purple-500/20">
                        <div className="flex gap-2">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                className="flex-1 bg-slate-900 border border-purple-500/20 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-400 focus:outline-none focus:border-purple-500/50 transition-colors"
                                placeholder="Type a message..."
                            />
                            <button onClick={handleSend} className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white p-2 rounded-lg transition-all">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Dashboard() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    return (
        <div className="bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 font-sans text-white w-screen h-screen flex overflow-hidden">
            {/* Sidebar Navigation */}
            <aside className="w-64 flex-shrink-0 bg-gradient-to-b from-slate-900 via-purple-900/10 to-slate-900 border-r border-purple-500/20 flex flex-col">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-lg"></span>
                    </div>
                    <div>
                        <h1 className="text-white text-base font-bold leading-tight">Smart</h1>
                        <p className="text-slate-200 text-xl font-medium uppercase tracking-wider">Parking</p>
                    </div>
                </div>

                <nav className="flex-1 px-3 mt-4 space-y-1">
                    <button onClick={() => navigate('/dashboard')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600/20 to-cyan-600/20 text-cyan-300 border-r-4 border-cyan-400">
                        <span className="text-sm font-medium">Dashboard</span>
                    </button>
                    <button onClick={() => navigate('/parkingMap')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-purple-500/10 transition-colors">
                       
                        <span className="text-sm font-medium">Map View</span>
                    </button>
                    <button onClick={() => navigate('/my-bookings')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-purple-500/10 transition-colors">
                       
                        <span className="text-sm font-medium">My Bookings</span>
                    </button>
                    <button onClick={() => navigate('/profile')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-purple-500/10 transition-colors">
                        
                        <span className="text-sm font-medium">Profile</span>
                    </button>
                    <button onClick={() => navigate('/settings')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        
                        <span className="text-sm font-medium">Settings</span>
                    </button>
                </nav>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3 px-2 py-2" >
                        <div className="w-8 h-8 rounded-full bg-slate-200 bg-cover bg-center"  style={{ backgroundImage: 'url("https://sohohindipro.com/wp-content/uploads/2022/11/14_girls-dp-sohohindipro.com_-1024x1024.jpg")' } }></div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate">{user?.name || 'Alex Johnson'}</p>
                            <p className="text-xs text-slate-500 truncate">{user?.role === 'admin' ? 'System Admin' : 'User'}</p>
                        </div>
                        <button onClick={() => {
                            logout();
                            navigate('/');
                        }} className="text-slate-400 hover:text-red-500 transition-colors" title="Logout">
                            <span className="material-symbols-outlined text-sm">logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-y-auto w-full">
                {/* Top Navigation Bar */}
                <header className="sticky top-0 z-10 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 py-4 flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-4 flex-1 max-w-xl">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white whitespace-nowrap mr-8">Dashboard Overview</h2>
                        <div className="relative w-full max-w-md hidden md:block">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl"></span>
                            <input className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#9333ea] transition-shadow outline-none" placeholder="Search plates, users, or slots..." type="text" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-100 hover:bg-slate-100 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg relative transition-colors">
                            <span className="bg-gradient-to-r from-purple-600 to-cyan-600">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                        </button>
                        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
                        <button onClick={() => navigate('/parkingMap')} className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#9333ea]/90 transition-colors">
                            <span className="bg-gradient-to-r from-purple-600 to-cyan-600 ">add Newbookings</span>
                        </button>
                    </div>
                </header>

                <div className="p-8 space-y-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="bg-[#9333ea]/10 text-[#9333ea] p-2 rounded-lg">
                                    <span className="material-symbols-outlined">garage</span>
                                </div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Slots</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">500</p>
                            <div className="flex items-center mt-2 text-green-500 text-xs font-semibold">
                                <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                                <span>Full capacity reached</span>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="bg-[#9333ea]/10 text-[#9333ea] p-2 rounded-lg">
                                    <span className="material-symbols-outlined">payments</span>
                                </div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Revenue Today</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">$1,240.00</p>
                            <div className="flex items-center mt-2 text-green-500 text-xs font-semibold">
                                <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                                <span>+12.5% from yesterday</span>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="bg-[#9333ea]/10 text-[#9333ea] p-2 rounded-lg">
                                    <span className="material-symbols-outlined">event_available</span>
                                </div>
                                <span className="text-xs font-bold text-slate-400 uppercase pl-11 tracking-wider">Active Bookings</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">42</p>
                            <div className="flex items-center mt-2 text-red-500 text-xs font-semibold">
                                <span className="material-symbols-outlined text-sm mr-1">trending_down</span>
                                <span>-5% from peak hour</span>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="bg-[#9333ea]/10 text-[#9333ea] p-2 rounded-lg">
                                    <span className="material-symbols-outlined">pie_chart</span>
                                </div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Occupancy</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">64%</p>
                            <div className="flex items-center mt-2 text-slate-500 dark:text-slate-400 text-xs font-medium">
                                <span>Real-time monitoring active</span>
                            </div>
                        </div>
                    </div>

                    {/* Live Occupancy Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1 bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6">Live Occupancy</h3>
                            <div className="relative flex items-center justify-center py-4">
                                <svg className="w-48 h-48 transform -rotate-90">
                                    <circle className="dark:stroke-slate-800" cx="96" cy="96" fill="transparent" r="80" stroke="#f1f5f9" strokeWidth="20"></circle>
                                    <circle cx="96" cy="96" fill="transparent" r="80" stroke="#9333ea" strokeDasharray="502.4" strokeDashoffset="180" strokeWidth="20"></circle>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-bold text-slate-900 dark:text-white">320</span>
                                    <span className="text-xs text-slate-500 font-medium">Occupied</span>
                                </div>
                            </div>
                            <div className="mt-8 space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-[#9333ea]"></span>
                                        <span className="text-slate-600 dark:text-slate-400">Occupied</span>
                                    </div>
                                    <span className="font-semibold">320 slots</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700"></span>
                                        <span className="text-slate-600 dark:text-slate-400">Available</span>
                                    </div>
                                    <span className="font-semibold">180 slots</span>
                                </div>
                            </div>
                            <button
                                onClick={() => navigate('/parkingMap')}
                                className="w-full mt-8 py-2.5 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                View Detailed Map
                            </button>
                        </div>

                        {/* Recent Activity Table */}
                        <div className="lg:col-span-2 bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
                            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Activity</h3>
                                <button className=" bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-[#9333ea]/90 transition-colors">View All</button>
                            </div>
                            <div className="overflow-x-auto flex-1">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4 font-bold">User</th>
                                            <th className="px-6 py-4 font-bold">Vehicle Info</th>
                                            <th className="px-6 py-4 font-bold">Slot</th>
                                            <th className="px-6 py-4 font-bold">Status</th>
                                            <th className="px-6 py-4 font-bold text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-[#9333ea] font-bold text-xs">JS</div>
                                                    <span className="text-sm font-semibold text-slate-900 dark:text-white">James Smith</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm">
                                                    <p className="font-medium text-slate-900 dark:text-white">ABC-1234</p>
                                                    <p className="text-xs text-slate-500">Tesla Model 3</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">A-12</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-[#9333ea]/10 text-[#9333ea]">Parked</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-slate-400 hover:text-slate-600">
                                                    <span className="material-symbols-outlined">more_vert</span>
                                                </button>
                                            </td>
                                        </tr>
                                        {/* Add more rows as needed */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Chatbot Component */}
            
            <Chatbot />
        </div>
    );
}
