import React, { useEffect } from "react";
import { SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/Coding");
    }
  }, [isSignedIn, navigate]);

  return (
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white overflow-hidden p-4 relative">
    
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-teal-400 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 md:w-96 md:h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      
      <div className="z-10 flex flex-col items-center justify-center text-center animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight text-shadow-lg">
          ⚡ Welcome to{" "}
          
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
            Code Guru
          </span>
        </h1>
        <p className="text-lg md:text-xl mb-10 text-gray-300 max-w-2xl">
          Write, test, and review your code with AI assistance. Sign in to start
          your journey.
        </p>

        <SignedOut>
          <SignInButton mode="modal">
            
            <button className="text-lg font-semibold text-white px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300">
              🚀 Sign In to Start Coding
            </button>
          </SignInButton>
        </SignedOut>

        
        <img
          src="https://cdn-icons-png.flaticon.com/512/906/906324.png"
          alt="Coding icon"
          className="mt-16 w-32 md:w-40 opacity-70 transform transition-all duration-500 ease-in-out hover:opacity-100 hover:scale-110 hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.7)]"
        />
      </div>
    </div>
  );
}

export default Home;
