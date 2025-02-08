import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import './Backdrop.css';

const Backdrop = (props) => {
  const navigate = useNavigate();

  const closeModalHandler = () => {
    // 执行关闭模态框的操作
    props.onClick();
    // 跳转回 /posts 页面
    navigate('/');
  };

  return ReactDOM.createPortal(
    <div className="backdrop" onClick={closeModalHandler}></div>,
    document.getElementById('modal-hook')  // Ensure this matches the id in index.html
  );
};

export default Backdrop;
