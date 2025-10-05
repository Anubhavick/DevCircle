import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  const handleGitHubLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&scope=user:email`;
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-20">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Mutual Growth for College Coders
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          DevCircle is a platform designed to boost coding communities within colleges through
          fair and active peer-to-peer support. Help others, earn karma, and grow together.
        </p>
        {user ? (
          <Link
            to="/dashboard"
            className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-primary-700 inline-block"
          >
            Go to Dashboard
          </Link>
        ) : (
          <button
            onClick={handleGitHubLogin}
            className="bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-900 inline-flex items-center space-x-3"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Get Started with GitHub</span>
          </button>
        )}
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 my-20">
        <div className="text-center p-6">
          <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Mutual Help System</h3>
          <p className="text-gray-600">
            Request help and earn karma by helping others in your college community
          </p>
        </div>

        <div className="text-center p-6">
          <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Fair Matchmaking</h3>
          <p className="text-gray-600">
            Smart system connects active users for meaningful collaboration
          </p>
        </div>

        <div className="text-center p-6">
          <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Leaderboard & Tracking</h3>
          <p className="text-gray-600">
            Track your progress and compete with peers on weekly leaderboards
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 text-white rounded-2xl p-12 text-center my-20">
        <h2 className="text-3xl font-bold mb-4">Ready to Join Your College Community?</h2>
        <p className="text-xl mb-8 opacity-90">
          Start helping and getting help from fellow developers today
        </p>
        {!user && (
          <button
            onClick={handleGitHubLogin}
            className="bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100"
          >
            Sign Up Now
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
