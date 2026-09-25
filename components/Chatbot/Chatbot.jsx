"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  MessageSquare,
  X,
  Send,
  RotateCcw,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import "./Chatbot.css";

const INITIAL_MESSAGE = {
  id: "msg-init",
  sender: "assistant",
  text: "Hi! I'm the Ideate X assistant.\n\nI can help you explore our services, answer questions, or figure out what you might need for your project.",
  time: "Just now",
  links: [],
  quickReplies: [
    { label: "Explore Services", action: "explore_services" },
    { label: "Start a Project", action: "start_project" },
    { label: "How Ideate X Works", action: "how_we_work" },
    { label: "Ask a Question", action: "ask_question" },
  ],
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState(INITIAL_MESSAGE.quickReplies);
  const [qualificationState, setQualificationState] = useState(null);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState(null);
  const [showScrollDown, setShowScrollDown] = useState(false);

  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to latest message
  const scrollToBottom = (behavior = "smooth") => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior,
      });
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior });
    }
  };

  const handleMessagesScroll = () => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const distanceToBottom = scrollHeight - scrollTop - clientHeight;
    setShowScrollDown(distanceToBottom > 70);
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom("smooth");
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isTyping]);

  // Keyboard shortcut: Escape to close chat
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasUnread(false);
    }
  };

  const handleRestart = () => {
    setMessages([
      {
        ...INITIAL_MESSAGE,
        id: `msg-${Date.now()}`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setQuickReplies(INITIAL_MESSAGE.quickReplies);
    setQualificationState(null);
    setSubmittedLeadId(null);
  };

  const sendMessage = async (textToSend, action = null) => {
    const text = (textToSend || inputText).trim();
    if (!text && !action) return;

    const userMsgId = `msg-usr-${Date.now()}`;
    const userTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // If user typed or clicked text, append user message bubble
    if (text) {
      setMessages((prev) => [
        ...prev,
        {
          id: userMsgId,
          sender: "user",
          text,
          time: userTime,
        },
      ]);
    }

    setInputText("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chatbot/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          action,
          history: messages.map((m) => ({ role: m.sender, content: m.text })),
          qualificationState,
        }),
      });

      const data = await res.json();
      const assistantTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-ast-${Date.now()}`,
            sender: "assistant",
            text: data.text,
            time: assistantTime,
            links: data.links || [],
            isReadyForSubmission: data.isReadyForSubmission || false,
            qualificationState: data.qualificationState || null,
          },
        ]);

        setQuickReplies(data.quickReplies || []);
        if (data.qualificationState !== undefined) {
          setQualificationState(data.qualificationState);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-ast-err-${Date.now()}`,
            sender: "assistant",
            text: data.text || "Something went wrong. Please try again or reach out to hello@ideatex.co.in directly.",
            time: assistantTime,
            links: [{ label: "Contact Us", route: "/contact" }],
          },
        ]);
        setQuickReplies([
          { label: "Try Again", action: "start" },
          { label: "Contact Page", route: "/contact" },
        ]);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-ast-err-${Date.now()}`,
          sender: "assistant",
          text: "Network error occurred. You can reach out directly to the Ideate X team at hello@ideatex.co.in.",
          time: "Just now",
          links: [{ label: "View Contact Page", route: "/contact" }],
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendEnquiry = async (leadData) => {
    setIsSubmittingLead(true);
    try {
      const res = await fetch("/api/chatbot/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadData.name || "Website Lead",
          email: leadData.email,
          phone: leadData.phone || "",
          service: leadData.platform ? `${leadData.platform} Project` : "Custom Software Development",
          project_description: leadData.project_description,
          target_users: leadData.target_users,
          platform: leadData.platform,
          timeline: leadData.timeline,
          budget: leadData.budget,
          conversation_history: messages.map((m) => ({ role: m.sender, content: m.text })),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmittedLeadId(data.enquiryId);
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-success-${Date.now()}`,
            sender: "assistant",
            text: "Your project enquiry has been sent to the Ideate X team! We'll review your requirements and get back to you shortly.",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            links: [
              { label: "Explore Our Work", route: "/portfolio" },
              { label: "Read Case Studies", route: "/case-studies" },
            ],
          },
        ]);
        setQuickReplies([
          { label: "Explore Services", action: "explore_services" },
          { label: "About Ideate X", route: "/about" },
        ]);
        setQualificationState(null);
      } else {
        alert(data.error || "Failed to send enquiry. Please check your email or reach out on our contact page.");
      }
    } catch (e) {
      alert("Network error while submitting enquiry. Please contact hello@ideatex.co.in.");
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputText);
    }
  };

  const handleChipClick = (chip) => {
    if (chip.action === "submit_enquiry" && qualificationState?.data) {
      handleSendEnquiry(qualificationState.data);
    } else if (chip.action) {
      sendMessage(chip.label, chip.action);
    } else if (chip.route) {
      setIsOpen(false);
    } else {
      sendMessage(chip.text || chip.label);
    }
  };

  return (
    <div className="ix-chatbot-root" aria-label="Ideate X Assistant">
      {/* ─── Chat Window Panel ─── */}
      {isOpen && (
        <div
          className="ix-chat-window"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ix-chat-heading"
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="ix-chat-header">
            <div className="ix-chat-header-info">
              <div className="ix-chat-avatar">
                <img
                  src="/logo-ideatex.png"
                  alt="Ideate X"
                  style={{ height: "18px", width: "auto", objectFit: "contain" }}
                />
              </div>
              <div className="ix-chat-title-group">
                <h3 id="ix-chat-heading">
                  Talk to Ideate X
                  <span className="ix-chat-status-pill">
                    <span className="ix-chat-status-dot" /> Online
                  </span>
                </h3>
                <p className="ix-chat-subtitle">Ask about our services or tell us what you're building.</p>
              </div>
            </div>

            <div className="ix-chat-header-actions">
              <button
                type="button"
                className="ix-chat-btn-icon"
                onClick={handleRestart}
                title="Restart Conversation"
                aria-label="Restart Conversation"
              >
                <RotateCcw size={15} />
              </button>
              <button
                type="button"
                className="ix-chat-btn-icon"
                onClick={toggleChat}
                title="Close Chat"
                aria-label="Close Chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div
            ref={messagesContainerRef}
            className="ix-chat-messages"
            aria-live="polite"
            onScroll={handleMessagesScroll}
            onWheel={(e) => e.stopPropagation()}
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
          >
            {messages.map((msg) => (
              <div key={msg.id} className={`ix-msg-row ${msg.sender}`}>
                <div className="ix-msg-bubble">
                  {msg.text.split("\n").map((para, i) => {
                    const cleanPara = para.trim();
                    if (!cleanPara) return null;

                    // Bullet point handling
                    if (cleanPara.startsWith("• ")) {
                      const bulletContent = cleanPara.replace(/^•\s*/, "");
                      // Parse any bold segments in bullet
                      const parts = bulletContent.split(/(\*\*.*?\*\*)/g);
                      return (
                        <div key={i} className="ix-msg-bullet-item">
                          <span className="ix-msg-bullet-dot" />
                          <span>
                            {parts.map((part, pIdx) => {
                              if (part.startsWith("**") && part.endsWith("**")) {
                                return <strong key={pIdx} style={{ color: "#ffffff", fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
                              }
                              return part;
                            })}
                          </span>
                        </div>
                      );
                    }

                    // Regular paragraph with bold support
                    const parts = cleanPara.split(/(\*\*.*?\*\*)/g);
                    return (
                      <p key={i}>
                        {parts.map((part, pIdx) => {
                          if (part.startsWith("**") && part.endsWith("**")) {
                            return <strong key={pIdx} style={{ color: "#ffffff", fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
                          }
                          return part;
                        })}
                      </p>
                    );
                  })}

                  {/* Links / Page Buttons */}
                  {msg.links && msg.links.length > 0 && (
                    <div className="ix-msg-links">
                      {msg.links.map((link, lIdx) => (
                        <Link
                          key={lIdx}
                          href={link.route}
                          className="ix-msg-link-btn"
                          onClick={() => setIsOpen(false)}
                        >
                          <span>{link.label}</span>
                          <ArrowRight size={13} />
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Summary & Send Enquiry Card */}
                  {msg.isReadyForSubmission && msg.qualificationState?.data && !submittedLeadId && (
                    <div className="ix-lead-card">
                      <div className="ix-lead-card-header">
                        <Sparkles size={14} /> Ready to Connect
                      </div>
                      <div className="ix-lead-card-summary">
                        <div className="ix-lead-field">
                          <span className="ix-lead-label">Email</span>
                          <span className="ix-lead-val">{qualificationState?.data?.email || msg.qualificationState.data.email || "—"}</span>
                        </div>
                        <div className="ix-lead-field">
                          <span className="ix-lead-label">Mobile</span>
                          <input
                            type="tel"
                            className="ix-lead-input-phone"
                            placeholder="+91 / Country Code & Number"
                            value={qualificationState?.data?.phone !== undefined ? qualificationState.data.phone : (msg.qualificationState.data.phone || "")}
                            onChange={(e) => {
                              const val = e.target.value;
                              setQualificationState((prev) => {
                                const currentData = prev?.data || msg.qualificationState.data || {};
                                return {
                                  ...prev,
                                  data: {
                                    ...currentData,
                                    phone: val,
                                  },
                                };
                              });
                            }}
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        className="ix-lead-submit-btn"
                        onClick={() => handleSendEnquiry(qualificationState?.data || msg.qualificationState.data)}
                        disabled={isSubmittingLead}
                      >
                        {isSubmittingLead ? "Sending..." : "Send Project Enquiry"}
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  )}

                  {msg.isReadyForSubmission && submittedLeadId && (
                    <div className="ix-lead-card">
                      <div className="ix-lead-success-badge">
                        <CheckCircle2 size={15} /> Enquiry Sent Successfully
                      </div>
                    </div>
                  )}
                </div>
                <span className="ix-msg-time">{msg.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="ix-msg-row assistant">
                <div className="ix-typing-indicator">
                  <span className="ix-typing-dot" />
                  <span className="ix-typing-dot" />
                  <span className="ix-typing-dot" />
                </div>
              </div>
            )}

            {/* Floating Jump to Latest Button */}
            {showScrollDown && (
              <button
                type="button"
                className="ix-scroll-bottom-btn"
                onClick={() => scrollToBottom("smooth")}
                title="Jump to latest message"
                aria-label="Jump to latest message"
              >
                <ChevronDown size={14} />
                <span>Latest</span>
              </button>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Chips */}
          {quickReplies && quickReplies.length > 0 && (
            <div
              className="ix-chat-quick-actions"
              aria-label="Suggested responses"
              data-lenis-prevent="true"
              data-lenis-prevent-wheel="true"
              data-lenis-prevent-touch="true"
              onWheel={(e) => e.stopPropagation()}
            >
              {quickReplies.map((chip, cIdx) => (
                <button
                  key={cIdx}
                  type="button"
                  className="ix-quick-chip"
                  onClick={() => handleChipClick(chip)}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          )}

          {/* Message Composer */}
          <form className="ix-chat-composer" onSubmit={handleFormSubmit}>
            <input
              ref={inputRef}
              type="text"
              className="ix-chat-input"
              placeholder="Ask a question or describe your project..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Chat message"
            />
            <button
              type="submit"
              className="ix-chat-send-btn"
              disabled={!inputText.trim() || isTyping}
              title="Send Message"
              aria-label="Send Message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* ─── Modern Animated Floating Launcher Trigger Button ─── */}
      <button
        type="button"
        className={`ix-chatbot-trigger ${isOpen ? "is-open" : "is-closed"}`}
        onClick={toggleChat}
        aria-label={isOpen ? "Close chat with Ideate X" : "Open chat with Ideate X"}
        aria-expanded={isOpen}
      >
        <span className="ix-chatbot-trigger-ring" />
        <span className="ix-chatbot-trigger-inner">
          {isOpen ? (
            <X size={22} className="ix-icon-close" />
          ) : (
            <>
              <MessageSquare size={22} className="ix-icon-chat" />
              <span className="ix-chatbot-sparkle-badge">
                <Sparkles size={9} />
              </span>
            </>
          )}
        </span>
        {!isOpen && hasUnread && <span className="ix-chatbot-badge-ping" />}
        {!isOpen && (
          <span className="ix-chatbot-tooltip">
            <span className="ix-tooltip-sparkle">✦</span> Ask Ideate X
          </span>
        )}
      </button>
    </div>
  );
}
