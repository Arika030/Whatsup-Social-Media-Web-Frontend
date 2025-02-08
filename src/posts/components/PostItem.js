import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../shared/Auth-context';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../../shared/components/UIElements/Modal';
import Backdrop from '../../shared/components/UIElements/Backdrop';
import { useLocation } from 'react-router-dom';
import './PostItem.css';

const DUMMY_POSTS = [
  {
    id: 'p1',
    uid: 'u1',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    creatorName: 'user1',
    title: 'This skirt is so BEAUTIFUL!',
    content: 'Guys! You should try this! It can make your legs look long.',
    likes: 2,
    likedByUser: false,
    comments: [
      { id: 'c1', text: 'Nice post!', userId: 'user2', likes: 1, CommentslikedByUser: false},
      { id: 'c2', text: 'Hope you like!', userId: 'user1', likes: 2, CommentslikedByUser: false }
    ]
  },
  {
    id: 'p2',
    uid: 'u2',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    creatorName: 'user2',
    title: 'How you guys doing?',
    content: 'Hi.',
    likes: 1,
    likedByUser: false,
    comments: [
      { id: 'c3', text: 'Good!', userId: 'user1', likes: 0, CommentslikedByUser: false }
    ]
  }
];

const PostItem = () => {
  const { postId } = useParams(); // Extract postId from the route
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState(DUMMY_POSTS);
  const [commentInput, setCommentInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal state
  const [selectedPost, setSelectedPost] = useState(null); // Post to display in modal
  const location = useLocation(); // 获取当前 location
  const isModal = location.state && location.state.background;
  
  useEffect(() => {
    const currentPost = posts.find((post) => post.id === postId);
    if (currentPost) {
      setSelectedPost(currentPost);
      setIsModalOpen(true); // Open modal when the post is found
    }
  }, [postId, posts]); // Runs when postId or posts changes

  // Find the current post based on the URL postId
  const currentPost = posts.find((post) => post.id === postId);

  if (!currentPost) {
    return <p>Post not found!</p>; // Handle invalid postId
  }

  const openModalHandler = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    navigate('/');
  };

  const likePostHandler = () => {
    if (!auth.userId) {
      navigate('/login'); // Redirect to login if not logged in
      return;
    }

    // Directly update the current post's likes
    const updatedPost = {
      ...selectedPost,
      likes: selectedPost.likedByUser ? selectedPost.likes - 1 : selectedPost.likes + 1,
      likedByUser: !selectedPost.likedByUser // Toggle liked state
    };

    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === selectedPost.id ? updatedPost : post))
    );
    setSelectedPost(updatedPost);
  };

  const addCommentHandler = () => {
    if (commentInput.trim() === '') return; // Prevent empty comments
    if (!auth.userId) {
      navigate('/login'); // Redirect to login if not logged in
      return;
    }

    const newComment = {
      id: `c${Math.random()}`, // Simple ID generation for comments
      text: commentInput,
      userId: auth.userId,
      likes: 0
    };

    const updatedPost = {
      ...selectedPost,
      comments: [...selectedPost.comments, newComment]
    };

    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === selectedPost.id ? updatedPost : post))
    );
    setSelectedPost(updatedPost);
    setCommentInput('');
  };

  const toggleCommentLikeHandler = (commentId) => {
    if (!auth.userId) {
      navigate('/login'); // Redirect to login if not logged in
      return;
    }

    const updatedPost = {
      ...selectedPost,
      comments: selectedPost.comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              likes: comment.CommentslikedByUser ? comment.likes - 1 : comment.likes + 1,
              CommentslikedByUser: !comment.CommentslikedByUser
            }
          : comment
      )
    };

    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === selectedPost.id ? updatedPost : post))
    );
    setSelectedPost(updatedPost);
  };

  

  return (
    <div>
      {/* Display post items and open modal when clicked */}
      
      


      {/* Modal to display the post */}
      {isModalOpen && selectedPost && (
        <React.Fragment>
        {isModal && <Backdrop onClick={closeModalHandler} />}
        
        <Modal show={isModalOpen} onCancel={closeModalHandler}>
          <div className="modal-header">
            <h2>{selectedPost.title}</h2>
            <button className="close-button" onClick={closeModalHandler}>X</button>
          </div>
          <div className="post-content">
            <img className="post-image" src={selectedPost.imageUrl} alt={selectedPost.title} />
            <div className="post-details">
              <div className="post-header">
                <img className="post-avatar" src={selectedPost.avatar} alt={selectedPost.creatorName} />
                <div className="post-info">
                  <h3>{selectedPost.creatorName}</h3>
                  <p className="post-text">{selectedPost.content}</p>
                </div>
              </div>
              <div className="post-actions">
                <button onClick={likePostHandler}>
                  {selectedPost.likedByUser ? '❤️' : '🤍'} {selectedPost.likes}
                </button>
              </div>
              <div className="comments">
                {selectedPost.comments.map((comment) => (
                  <div key={comment.id} className="comment">
                    <p>{comment.text}</p>
                    <button onClick={() => toggleCommentLikeHandler(comment.id)}>
                    {comment.CommentslikedByUser ? '❤️' : '🤍'} {comment.likes}
                    </button>
                  </div>
                ))}
              </div>
              {auth.userId && (
                <div className="comment-input">
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Add a comment"
                  />
                  <button onClick={addCommentHandler}>Comment</button>
                </div>
              )}
            </div>
          </div>
        </Modal>
      </React.Fragment>
        
      )}
    </div>
  );
};

export default PostItem;