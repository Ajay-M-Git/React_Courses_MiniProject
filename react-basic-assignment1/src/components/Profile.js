import React from 'react';
import { useParams } from 'react-router-dom';

const Profile = ({ users }) => {
    const { id } = useParams();
    const user = users.find(user => user.id === parseInt(id));

    const avatarUrl = `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(user.name)}`;

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div className='custom-card'>
            <img src={avatarUrl} alt={user.name} className="card-img-top avatar-img" />
            <h1>{user.name}</h1>
            <h2>Username: {user.username}</h2>
            <h3>Email: {user.email}</h3>
            <h3>Phone: {user.phone}</h3>
            <h3>Website: {user.website}</h3>
            <h3>Company: {user.company.name}</h3>
            <h4>Address:</h4>
            <p>{user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</p>
            <h5>Coordinates: {user.address.geo.lat}, {user.address.geo.lng}</h5>

        </div>
    );
};

export default Profile;
