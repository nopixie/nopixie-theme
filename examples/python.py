"""
User module for managing user data
"""

from datetime import datetime
from typing import List, Dict, Optional


class User:
    """User class for managing user information"""

    # Class variable
    MAX_LOGIN_ATTEMPTS = 3

    def __init__(self, name: str, email: str, age: int = 18):
        """
        Initialize a new user

        Args:
            name: User's full name
            email: User's email address
            age: User's age (default: 18)
        """
        self._name = name
        self._email = email
        self._age = age
        self.is_active = True
        self._login_attempts = 0

    @property
    def name(self) -> str:
        """Get user name"""
        return self._name

    @property
    def email(self) -> str:
        """Get user email"""
        return self._email

    def get_info(self) -> Dict[str, any]:
        """
        Get user information as dictionary

        Returns:
            Dictionary containing user information
        """
        return {
            'name': self._name,
            'email': self._email,
            'age': self._age,
            'status': 'active' if self.is_active else 'inactive',
            'login_attempts': self._login_attempts
        }

    def _validate_email(self, email: str) -> bool:
        """Validate email format (private method)"""
        return '@' in email and '.' in email

    def set_email(self, new_email: str) -> None:
        """Update user email"""
        if self._validate_email(new_email):
            self._email = new_email
            print(f"Email updated successfully to {new_email}!")
        else:
            raise ValueError("Invalid email format")

    def get_birth_year(self) -> int:
        """Calculate birth year based on age"""
        current_year = datetime.now().year
        return current_year - self._age

    def __str__(self) -> str:
        """String representation of user"""
        return f"User(name={self._name}, email={self._email})"

    def __repr__(self) -> str:
        """Developer-friendly representation"""
        return f"User('{self._name}', '{self._email}', {self._age})"


# Usage example
if __name__ == "__main__":
    user = User("John Doe", "john@example.com", 25)
    info = user.get_info()

    # Iterate and print user info
    for key, value in info.items():
        print(f"{key}: {value}")

    # List comprehension example
    ages = [18, 25, 30, 45]
    birth_years = [datetime.now().year - age for age in ages]

    print(f"\nBirth years: {birth_years}")
