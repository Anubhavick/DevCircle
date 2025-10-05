import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { Request, Activity } from '../types';
import RequestCard from '../components/RequestCard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [myRequests, setMyRequests] = useState<Request[]>([]);
  const [helpedRequests, setHelpedRequests] = useState<Request[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [requestsRes, helpedRes, activitiesRes] = await Promise.all([
        api.get('/requests/my/requests'),
        api.get('/requests/my/helped'),
        api.get('/activities/my'),
      ]);

      setMyRequests(requestsRes.data);
      setHelpedRequests(helpedRes.data);
      setActivities(activitiesRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteRequest = async (requestId: string) => {
    try {
      await api.post(`/requests/${requestId}/complete`);
      fetchDashboardData();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to complete request');
    }
  };

  const handleCancelRequest = async (requestId: string) => {
    try {
      await api.post(`/requests/${requestId}/cancel`);
      fetchDashboardData();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to cancel request');
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
    <div className="max-w-7xl mx-auto">
      {/* Stats Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Karma Points</h3>
          <p className="text-3xl font-bold text-primary-600">{user?.karmaPoints || 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Help Score</h3>
          <p className="text-3xl font-bold text-green-600">{user?.helpScore || 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Active Requests</h3>
          <p className="text-3xl font-bold text-blue-600">{myRequests.length}</p>
        </div>
      </div>

      {/* My Requests */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">My Requests</h2>
        {myRequests.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-600">
            You haven't created any requests yet.
          </div>
        ) : (
          <div className="space-y-4">
            {myRequests.map((request) => (
              <RequestCard
                key={request._id}
                request={request}
                showActions
                onComplete={handleCompleteRequest}
                onCancel={handleCancelRequest}
              />
            ))}
          </div>
        )}
      </div>

      {/* Requests I'm Helping With */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Requests I'm Helping With</h2>
        {helpedRequests.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-600">
            You're not helping with any requests yet. Check out the Requests page!
          </div>
        ) : (
          <div className="space-y-4">
            {helpedRequests.map((request) => (
              <RequestCard key={request._id} request={request} />
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        {activities.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-600">
            No recent activity
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md divide-y">
            {activities.slice(0, 10).map((activity) => (
              <div key={activity._id} className="p-4 hover:bg-gray-50">
                <p className="text-gray-800">{activity.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">
                    {new Date(activity.createdAt).toLocaleDateString()}
                  </span>
                  {activity.pointsEarned > 0 && (
                    <span className="text-sm font-medium text-green-600">
                      +{activity.pointsEarned} karma
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
