<?php

namespace App\Models;

use DateTime;

/**
 * User class for managing user data
 */
class User
{
    // Properties
    private string $name;
    private string $email;
    protected int $age;
    public bool $isActive;

    // Constants
    const MAX_LOGIN_ATTEMPTS = 3;

    /**
     * Constructor
     */
    public function __construct(string $name, string $email, int $age = 18)
    {
        $this->name = $name;
        $this->email = $email;
        $this->age = $age;
        $this->isActive = true;
    }

    /**
     * Get user information
     */
    public function getInfo(): array
    {
        return [
            'name' => $this->name,
            'email' => $this->email,
            'age' => $this->age,
            'status' => $this->isActive ? 'active' : 'inactive'
        ];
    }

    /**
     * Validate email format
     */
    private function validateEmail(string $email): bool
    {
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return true;
        }
        return false;
    }

    /**
     * Update user email
     */
    public function setEmail(string $newEmail): void
    {
        if ($this->validateEmail($newEmail)) {
            $this->email = $newEmail;
            echo "Email updated successfully!\n";
        } else {
            throw new \InvalidArgumentException("Invalid email format");
        }
    }

    /**
     * Calculate birth year
     */
    public function getBirthYear(): int
    {
        $currentYear = (new DateTime())->format('Y');
        return (int)$currentYear - $this->age;
    }
}

// Usage example
$user = new User("John Doe", "john@example.com", 25);
$info = $user->getInfo();

foreach ($info as $key => $value) {
    echo "$key: $value\n";
}
