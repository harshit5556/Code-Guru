import React, { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import { Link } from "react-router-dom"; 
import prism from "prismjs";
import "prismjs/components/prism-jsx"; 
import "prismjs/themes/prism-tomorrow.css"; 
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css"; 
import axios from "axios";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";


const Spinner = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

function Coding() {
  const [code, setCode] = useState(
`// Welcome to Code Guru!
// Paste your code here and click "Review Code" to get feedback.

function factorial(n) {
  if (n < 0) {
    return "Number must be non-negative.";
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}`
  );
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  async function reviewCode() {
    setLoading(true);
    setReview(""); 
    try {
      const response = await axios.post(
        'https://code-reviewer-backend-hqzb.onrender.com/ai/get-review', 
        { code }
      );
      setReview(response.data);
    } catch (err) {
      setReview("### ❌ Error\n\nThere was an issue fetching the review. Please ensure your backend server is running and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200 font-sans">
      
      <header className="sticky top-0 z-30 bg-gray-900/70 backdrop-blur-lg border-b border-gray-700">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="text-2xl font-bold tracking-tight">
            ⚡ <span className="text-blue-400">Code Guru</span>
          </Link>
          <div className="flex items-center gap-4">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:scale-105">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </header>

    
      <main className="flex-1 flex flex-col lg:flex-row gap-4 p-4">

        {/* Editor Panel */}
        <div className="flex flex-col lg:w-1/2 bg-gray-800/50 rounded-xl border border-gray-700 shadow-2xl">
          <div className="flex items-center justify-between p-3 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-gray-300">Your Code</h2>
            <span className="text-xs text-gray-400">JavaScript</span>
          </div>
          <div className="flex-1 p-2 relative">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              className="custom-scrollbar" 
              style={{
                fontFamily: '"Fira Code", "Consolas", monospace',
                fontSize: 15,
                minHeight: "100%",
                outline: "none",
                color: "#e0e0e0",
              }}
            />
          </div>
           <div className="p-3 border-t border-gray-700">
            <button
              onClick={reviewCode}
              disabled={loading}
              className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg font-semibold text-white shadow-lg hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? <><Spinner /> Reviewing...</> : "🔍 Review Code"}
            </button>
          </div>
        </div>

        {/* Review Panel */}
        <div className="flex flex-col lg:w-1/2 bg-gray-800/50 rounded-xl border border-gray-700 shadow-2xl">
          <div className="p-3 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-gray-300">AI Review</h2>
          </div>
          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
            {loading ? (
              <div className="flex flex-col gap-4">
                <div className="bg-gray-700 h-6 w-1/3 rounded-md animate-pulse"></div>
                <div className="bg-gray-700 h-4 w-full rounded-md animate-pulse"></div>
                <div className="bg-gray-700 h-4 w-3/4 rounded-md animate-pulse"></div>
                <div className="bg-gray-700 h-20 w-full rounded-md animate-pulse mt-4"></div>
              </div>
            ) : review ? (
              <Markdown
                rehypePlugins={[rehypeHighlight]}
                className="prose prose-invert prose-p:text-gray-300 prose-headings:text-white prose-strong:text-white prose-a:text-blue-400"
              >
                {review}
              </Markdown>
            ) : (
              <div className="text-center text-gray-400 flex flex-col items-center justify-center h-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M12 21v-1m-4-4a4 4 0 118 0 4 4 0 01-8 0z" /></svg>
                <p>Your AI code review will appear here.</p>
                <p className="text-sm text-gray-500">Click "Review Code" to get started.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Coding;
