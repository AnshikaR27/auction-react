// // Comments.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import './Comments.scss';

// const Comments = () => {
//   const { id } = useParams(); // listing ID
//   const [newComment, setNewComment] = useState('');
//   const [comments, setComments] = useState([]);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [error, setError] = useState('');
//   const [showModal, setShowModal] = useState(false);

//   // Fetch comments when the component mounts or when id changes
//   useEffect(() => {
//     if (id) {
//       fetchComments();
//     }
//   }, [id]);

//   const fetchComments = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3032/api/comments/${id}`);
//       if (res.data.success) {
//         setComments(res.data.data);
//       } else {
//         setComments([]);
//       }
//     } catch (err) {
//       console.error('Error fetching comments:', err);
//       setComments([]);
//     }
//   };

//   const handleSubmitComment = async () => {
//     if (!newComment.trim()) return;
  
//     const token = localStorage.getItem('token');
//     console.log("Token from localStorage:", token); // Debug token value
    
//     if (!token) {
//       setError('You must be logged in to post a comment.');
//       return;
//     }
  
//     try {
//       console.log("Submitting comment to:", `http://localhost:3032/api/comments/${id}`);
//       console.log("Comment text:", newComment);
//       console.log("Authorization header:", `Bearer ${token}`);
      
//       const res = await axios.post(
//         `http://localhost:3032/api/comments/${id}`,
//         { text: newComment },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           },
//         }
//       );
  
//       console.log("Response:", res.data);
  
//       if (res.data.success) {
//         // Add the new comment to the beginning of the list
//         setComments([res.data.data, ...comments]);
//         setSuccessMessage('Comment posted successfully!');
//         setNewComment('');
//         setError('');
//       } else {
//         setError('Failed to post comment');
//         console.error("Error in response:", res.data);
//       }
//     } catch (err) {
//       setError('Error posting comment');
//       console.error("Network error:", err);
      
//       // Log more details if available
//       if (err.response) {
//         console.error("Error response status:", err.response.status);
//         console.error("Error response data:", err.response.data);
//       }
//     }
//   };

//   return (
//     <div className="comments-page">
//       <button onClick={() => setShowModal(true)}>Leave a Comment</button>

//       {showModal && (
//         <div className="modal-overlay" onClick={() => setShowModal(false)}>
//           <div className="modal" onClick={(e) => e.stopPropagation()}>
//             <span className="close" onClick={() => setShowModal(false)}>&times;</span>
//             <h2>Comments</h2>

//             <div className="comments-list">
//               {comments.length > 0 ? (
//                 comments.map((comment) => (
//                   <div key={comment._id} className="comment-item">
//                     <p><strong>{comment.userName || 'Anonymous'}</strong>: {comment.text}</p>
//                   </div>
//                 ))
//               ) : (
//                 <p>No comments yet. Be the first!</p>
//               )}
//             </div>

//             <textarea
//               placeholder="Write your comment..."
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//               rows={5}
//             />
//             <button onClick={handleSubmitComment}>Submit</button>
//             {successMessage && <p className="success">{successMessage}</p>}
//             {error && <p className="error">{error}</p>}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Comments;