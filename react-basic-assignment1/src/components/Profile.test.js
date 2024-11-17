import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Profile from './Profile';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('Profile Component', () => {
  const mockUsers = [
    {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      phone: '123-456-7890',
      website: 'johndoe.com',
      company: { name: 'JohnDoe Inc.' },
      address: {
        street: 'Main Street',
        suite: 'Apt. 1',
        city: 'Metropolis',
        zipcode: '12345',
        geo: { lat: '12.34', lng: '56.78' },
      },
    },
    {
      id: 2,
      name: 'Jane Doe',
      username: 'janedoe',
      email: 'jane@example.com',
      phone: '987-654-3210',
      website: 'janedoe.com',
      company: { name: 'JaneDoe LLC' },
      address: {
        street: 'Second Street',
        suite: 'Apt. 2',
        city: 'Gotham',
        zipcode: '54321',
        geo: { lat: '21.43', lng: '65.87' },
      },
    },
  ];

  test('renders user profile when user is found', () => {
    const { useParams } = require('react-router-dom');
    useParams.mockReturnValue({ id: '1' });

    render(
      <MemoryRouter initialEntries={['/profile/1']}>
        <Routes>
          <Route path="/profile/:id" element={<Profile users={mockUsers} />} />
        </Routes>
      </MemoryRouter>
    );
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Username: johndoe')).toBeInTheDocument();
    expect(screen.getByText('Email: john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Phone: 123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('Website: johndoe.com')).toBeInTheDocument();
    expect(screen.getByText('Company: JohnDoe Inc.')).toBeInTheDocument();
    expect(screen.getByText('Main Street, Apt. 1, Metropolis, 12345')).toBeInTheDocument();
    expect(screen.getByText('Coordinates: 12.34, 56.78')).toBeInTheDocument();
  });

});
