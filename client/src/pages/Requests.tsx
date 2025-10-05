import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { Request as RequestType, RequestType as ReqType } from '../types';
import RequestCard from '../components/RequestCard';

const Requests: React.FC = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<RequestType[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    type: ReqType.CODE_REVIEW,
    title: '',
    description: '',
    repoUrl: '',
    tags: '',
    helpCredits: 5,
  });

  const fetchRequests = useCallback(async () => {
    try {
      const response = await api.get(`/requests/open?college=${user?.college}`);
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.college]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleCreateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/requests', {
        ...formData,
        tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      });
      setShowCreateModal(false);
      setFormData({
        type: ReqType.CODE_REVIEW,
        title: '',
        description: '',
        repoUrl: '',
        tags: '',
        helpCredits: 5,
      });
      fetchRequests();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to create request');
    }
  };

  const handleAcceptRequest = async (requestId: string) => {
    try {
      await api.post(`/requests/${requestId}/accept`);
      fetchRequests();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to accept request');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Open Requests</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700"
        >
          Create Request
        </button>
      </div>

      {requests.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center text-gray-600">
          <p className="text-xl mb-4">No open requests at the moment.</p>
          <p>Be the first to create one!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {requests.map((request) => (
            <RequestCard
              key={request._id}
              request={request}
              showActions
              onAccept={handleAcceptRequest}
            />
          ))}
        </div>
      )}

      {/* Create Request Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Create New Request</h2>
            <form onSubmit={handleCreateRequest}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Request Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as ReqType })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                >
                  <option value={ReqType.CODE_REVIEW}>Code Review</option>
                  <option value={ReqType.BUG_FIX}>Bug Fix</option>
                  <option value={ReqType.GITHUB_STAR}>GitHub Star</option>
                  <option value={ReqType.COLLABORATION}>Collaboration</option>
                  <option value={ReqType.MENTORSHIP}>Mentorship</option>
                  <option value={ReqType.OTHER}>Other</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  placeholder="Brief title for your request"
                  required
                  minLength={5}
                  maxLength={200}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  rows={5}
                  placeholder="Detailed description of what you need help with..."
                  required
                  minLength={20}
                  maxLength={2000}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Repository URL (optional)
                </label>
                <input
                  type="url"
                  value={formData.repoUrl}
                  onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  placeholder="https://github.com/username/repo"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  placeholder="React, TypeScript, Bug"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Karma Points to Offer (1-10)
                </label>
                <input
                  type="number"
                  value={formData.helpCredits}
                  onChange={(e) => setFormData({ ...formData, helpCredits: parseInt(e.target.value) })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  min={1}
                  max={10}
                  required
                />
                <p className="text-sm text-gray-600 mt-1">
                  Your current karma: {user?.karmaPoints || 0}
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700"
                >
                  Create Request
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;
