import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Login from './Login';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Login Component', () => {
  const mockSetIsAuthenticated = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the login form correctly', () => {
    render(
      <MemoryRouter>
        <Login setIsAuthenticated={mockSetIsAuthenticated} />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('shows an error message on invalid login credentials', () => {
    render(
      <MemoryRouter>
        <Login setIsAuthenticated={mockSetIsAuthenticated} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'wrongUsername' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongPassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText(/invalid login credentials/i)).toBeInTheDocument();
    expect(mockSetIsAuthenticated).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('successfully logs in with valid credentials and redirects', () => {
    render(
      <MemoryRouter>
        <Login setIsAuthenticated={mockSetIsAuthenticated} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'Ajay' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'Ajay@1234' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(mockSetIsAuthenticated).toHaveBeenCalledWith(true);
    expect(mockNavigate).toHaveBeenCalledWith('/');
    expect(localStorage.getItem('accessToken')).toBe('mock-jwt-token');
  });
});
