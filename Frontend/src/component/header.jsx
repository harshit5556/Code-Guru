import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Header = () => {
  return (
    <div className="h-16 bg-gray-800 text-white flex items-center justify-between px-6">
      <h1 className="text-xl font-bold">⚡ Code Reviewer</h1>

      {/* If user is signed out → show Sign In */}
      <SignedOut>
        <SignInButton mode="modal">
          <button className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>

      {/* If user is signed in → show Dashboard + Sign Out */}
      <SignedIn>
        <div className="flex items-center gap-4">
          <a
            href="/dashboard"
            className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Dashboard
          </a>
          <UserButton afterSignOutUrl="/" />
        </div>
      </SignedIn>
    </div>
  );
};

export default Header;
