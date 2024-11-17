import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CardList from './CardList';



describe('CardList Component', () => {
  const usersMock = [
    { id: 1, name: 'Ajay', email: 'ajay@example.com', phone: '123-456-7890', website: 'ajay.com' },
    { id: 2, name: 'Vijay', email: 'vijay@example.com', phone: '987-654-3210', website: 'vijay.com' },
  ];

  test('renders "No users found" when the user list is empty', () => {
    render(<CardList users={[]} setUsers={jest.fn()} />);

    expect(screen.getByText(/no users found/i)).toBeInTheDocument();
  });

  test('renders user cards when user list is not empty', () => {
    render(<CardList users={usersMock} setUsers={jest.fn()} />);

    expect(screen.getAllByText(/Ajay/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Vijay/i)[1]).toBeInTheDocument();
  });

});