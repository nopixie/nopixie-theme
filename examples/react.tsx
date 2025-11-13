import React, { useState, useEffect, useCallback } from 'react';
import './UserCard.css';

/**
 * User interface
 */
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
}

/**
 * Component props
 */
interface UserCardProps {
  userId: number;
  onUpdate?: (user: User) => void;
  className?: string;
}

/**
 * UserCard component for displaying user information
 */
const UserCard: React.FC<UserCardProps> = ({ userId, onUpdate, className = '' }) => {
  // State management
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Constants
  const MAX_NAME_LENGTH = 50;
  const STATUS_COLORS = {
    active: 'green',
    inactive: 'red'
  };

  /**
   * Fetch user data
   */
  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/${userId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      const data: User = await response.json();
      setUser(data);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Effect hook
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  /**
   * Handle user update
   */
  const handleUpdate = async (updatedUser: User): Promise<void> => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
      });

      if (response.ok) {
        setUser(updatedUser);
        setIsEditing(false);
        onUpdate?.(updatedUser);
      }
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  /**
   * Calculate birth year
   */
  const getBirthYear = (): number => {
    if (!user) return 0;
    return new Date().getFullYear() - user.age;
  };

  // Render loading state
  if (loading) {
    return <div className="spinner">Loading...</div>;
  }

  // Render error state
  if (error) {
    return (
      <div className="error-message">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  // Render null state
  if (!user) {
    return null;
  }

  // Main render
  return (
    <div className={`user-card ${className}`}>
      <div className="user-header">
        <h2>{user.name}</h2>
        <span
          className="status-badge"
          style={{ backgroundColor: STATUS_COLORS[user.isActive ? 'active' : 'inactive'] }}
        >
          {user.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>

      <div className="user-info">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Birth Year:</strong> {getBirthYear()}</p>
      </div>

      <div className="user-actions">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="btn-primary"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>

        {isEditing && (
          <button
            onClick={() => handleUpdate(user)}
            className="btn-success"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
