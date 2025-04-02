import React, { useState, useEffect } from 'react';
import { fetchPostComments } from '../services/api';

const PostCard = ({ post, showComments = false }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  
  // Generate a random image for the post
  const imageId = Math.floor(Math.random() * 1000);
  const imageUrl = `https://picsum.photos/seed/${post.id || imageId}/400/300`;
  
  // Generate a random user avatar
  const userImageId = Math.floor(Math.random() * 100);
  const userImageUrl = `https://randomuser.me/api/portraits/men/${userImageId}.jpg`;

  useEffect(() => {
    if (showComments && post.id && expanded) {
      setLoading(true);
      fetchPostComments(post.id)
        .then(data => {
          setComments(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching comments:', error);
          setLoading(false);
        });
    }
  }, [post.id, showComments, expanded]);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 hover:shadow-lg transition-shadow">
      <div className="p-4">
        <div className="flex items-center mb-3">
          <img 
            src={userImageUrl} 
            alt={post.userName} 
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="font-medium">{post.userName}</h3>
            <p className="text-xs text-gray-500">User ID: {post.userid}</p>
          </div>
        </div>
        
        <img 
          src={imageUrl} 
          alt="Post content" 
          className="w-full h-48 object-cover rounded-md mb-3"
        />
        
        <p className="text-gray-800 mb-3">{post.content}</p>
        
        <div className="flex justify-between items-center text-gray-500 text-sm">
          <span>Post ID: {post.id}</span>
          {post.commentCount !== undefined && (
            <button 
              onClick={() => setExpanded(!expanded)}
              className="text-blue-500 hover:text-blue-700"
            >
              {post.commentCount} comments {expanded ? '(Hide)' : '(Show)'}
            </button>
          )}
        </div>
      </div>
      
      {showComments && expanded && (
        <div className="bg-gray-50 p-4 border-t border-gray-200">
          <h4 className="font-medium mb-2">Comments</h4>
          
          {loading ? (
            <p className="text-center text-gray-500">Loading comments...</p>
          ) : comments && comments.length > 0 ? (
            <div className="space-y-3">
              {comments.map(comment => (
                <div key={comment.id} className="bg-white p-3 rounded-md shadow-sm">
                  <p className="text-gray-800">{comment.content}</p>
                  <p className="text-xs text-gray-500 mt-1">Comment ID: {comment.id}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No comments yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;