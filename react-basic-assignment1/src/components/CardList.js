import React from 'react';
import Card from './Card';

const CardList = ({ users, setUsers }) => {
    if (!users || users.length === 0) {
        return <div>No users found.</div>;
    }


    const handleDelete = (id) => {
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
    };

    return (
        <div className="row">
            {users.map(user => (
                <div className="col-md-3 mb-4" key={user.id}>
                    <Card user={user} onDelete={handleDelete} />
                </div>
            ))}
        </div>
    );
};

export default CardList;
