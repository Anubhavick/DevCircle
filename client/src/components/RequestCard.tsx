import React from 'react';
import { Request as RequestType, RequestStatus } from '../types';

interface RequestCardProps {
  request: RequestType;
  onAccept?: (id: string) => void;
  onComplete?: (id: string) => void;
  onCancel?: (id: string) => void;
  showActions?: boolean;
}

const RequestCard: React.FC<RequestCardProps> = ({
  request,
  onAccept,
  onComplete,
  onCancel,
  showActions = false,
}) => {
  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case RequestStatus.OPEN:
        return 'bg-green-100 text-green-800';
      case RequestStatus.IN_PROGRESS:
        return 'bg-yellow-100 text-yellow-800';
      case RequestStatus.COMPLETED:
        return 'bg-blue-100 text-blue-800';
      case RequestStatus.CANCELLED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const requester = typeof request.requester === 'object' ? request.requester : null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{request.title}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            {requester && (
              <div className="flex items-center space-x-2">
                {requester.avatar && (
                  <img
                    src={requester.avatar}
                    alt={requester.username}
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <span>@{requester.username}</span>
              </div>
            )}
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
              {request.status.replace('_', ' ').toUpperCase()}
            </span>
            <span className="text-primary-600 font-medium">
              {request.helpCredits} karma points
            </span>
          </div>
        </div>
      </div>

      <p className="text-gray-700 mb-4">{request.description}</p>

      {request.repoUrl && (
        <a
          href={request.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 hover:underline text-sm mb-4 block"
        >
          View Repository →
        </a>
      )}

      {request.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {request.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {showActions && (
        <div className="flex space-x-3 mt-4">
          {request.status === RequestStatus.OPEN && onAccept && (
            <button
              onClick={() => onAccept(request._id)}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
            >
              Accept Request
            </button>
          )}
          {request.status === RequestStatus.IN_PROGRESS && onComplete && (
            <button
              onClick={() => onComplete(request._id)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Mark Complete
            </button>
          )}
          {(request.status === RequestStatus.OPEN || request.status === RequestStatus.IN_PROGRESS) && onCancel && (
            <button
              onClick={() => onCancel(request._id)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default RequestCard;
