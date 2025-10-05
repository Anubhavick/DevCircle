import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { User } from '../types';

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser, updateUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    bio: '',
    skills: '',
  });
  const [loading, setLoading] = useState(true);

  const isOwnProfile = !id || id === currentUser?._id;

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      const endpoint = id ? `/users/${id}` : '/users/me';
      const response = await api.get(endpoint);
      setUser(response.data);
      setFormData({
        bio: response.data.bio || '',
        skills: response.data.skills?.join(', ') || '',
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.put('/users/me', {
        bio: formData.bio,
        skills: formData.skills.split(',').map((s) => s.trim()).filter(Boolean),
      });
      setUser(response.data);
      updateUser(response.data);
      setIsEditing(false);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">User not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 mb-8">
          {user.avatar && (
            <img
              src={user.avatar}
              alt={user.username}
              className="w-24 h-24 rounded-full"
            />
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
            <p className="text-gray-600">{user.email}</p>
            {user.githubProfile && (
              <a
                href={user.githubProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline inline-flex items-center space-x-1 mt-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>View GitHub Profile</span>
              </a>
            )}
          </div>
          {isOwnProfile && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-primary-50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-primary-600">{user.karmaPoints}</p>
            <p className="text-gray-600 text-sm">Karma Points</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-green-600">{user.helpScore}</p>
            <p className="text-gray-600 text-sm">Help Score</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-blue-600">{user.college}</p>
            <p className="text-gray-600 text-sm">College</p>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && isOwnProfile ? (
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                rows={4}
                maxLength={500}
                placeholder="Tell us about yourself..."
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Skills (comma-separated)
              </label>
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="React, Node.js, Python, etc."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <>
            {/* Bio */}
            {user.bio && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">About</h3>
                <p className="text-gray-700">{user.bio}</p>
              </div>
            )}

            {/* Skills */}
            {user.skills && user.skills.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {!user.bio && (!user.skills || user.skills.length === 0) && isOwnProfile && (
              <div className="text-center py-8 text-gray-600">
                <p className="mb-4">Your profile is looking a bit empty!</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
                >
                  Complete Your Profile
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
