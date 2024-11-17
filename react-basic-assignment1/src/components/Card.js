import React, { useState } from 'react';
import { FaHeart, FaEdit, FaTrash, FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa';
import EditUser from './EditUser';

const Card = ({ user, onDelete }) => {
  const avatarUrl = `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(user.name)}`;

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(user);
  const [isLiked, setIsLiked] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = (editedUser) => {
    setUserData(editedUser);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(userData.id);
    }
  };

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="card custom-card">
      <div className="card-header">
        <div className="avatar-container">
          <img src={avatarUrl} alt={userData.name} className="card-img-top avatar-img" />
        </div>
      </div>

      <div className="card-body">
        <h5 className="card-title">{userData.name}</h5>
        <p className="card-text">
          <h6>
            <FaEnvelope /> Email: {userData.email}
          </h6>
          <h6>
            <FaPhone /> Phone: {userData.phone}
          </h6>

          <h6>
            <FaGlobe /> Website: <a href={`https://${userData.website}`} target="_blank" rel="noopener noreferrer">{userData.website}</a>
          </h6>

        </p>
      </div>

      <div className="card-footer">

        {isLiked ? (
          <FaHeart className="icon-act liked" onClick={handleLikeToggle} />
        ) : (
          <FaHeart className="icon-act" onClick={handleLikeToggle} />
        )}
        <FaEdit className="icon-action" onClick={handleEditClick} />
        <FaTrash className="icon-action" onClick={handleDelete} />
      </div>

      <EditUser
        user={userData}
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default Card;
