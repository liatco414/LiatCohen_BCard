# React + Vite

# Business Cards Project

## Overview

This is a **React** project where users can explore, like, and manage business cards. The application allows both regular users and business users to interact with business cards.

-   **Business Users**: Can create, update, delete, and manage their business cards.
-   **Regular Users**: Can only view business cards and like them.

This project uses **Axios** for making API requests and **JWT Tokens** for user authentication.

## Features

-   **Home Page**: Displays a list of all business cards with options to like and view more details.
-   **Like Business Cards**: Users can like business cards. Likes are stored per user.
-   **Create Business Cards**: Business users can create new business cards with details like title, subtitle, description, contact info, etc.
-   **Update Business Cards**: Business users can update their existing business cards.
-   **Delete Business Cards**: Business users can delete their business cards.
-   **User Profile**: Users can view and edit their profiles.
-   **Authentication**: Users can sign up, log in, and log out using JWT tokens.

## Components

### 1. **About**

Displays information about the application.

### 2. **CardDetails**

Shows detailed information about a specific business card.

### 3. **CreateCard**

Allows business users to create a new business card.

### 4. **CreateCardModal**

Modal window used to create a new business card.

### 5. **EditCard**

Allows business users to edit existing business cards.

### 6. **FavCards**

Displays a list of cards liked by the user.

### 7. **Footer**

Contains footer information (e.g., links, copyright).

### 8. **Home**

The landing page showing a list of business cards.

### 9. **LoggedInNavBar**

Navigation bar shown when the user is logged in.

### 10. **LogIn**

Page that allows users to log in.

### 11. **LogOutModal**

Modal that confirms when the user wants to log out.

### 12. **NavBar**

The navigation bar, visible on every page.

### 13. **MyCards**

Displays the user's own business cards, where they can edit or delete them.

### 14. **Profile**

Page where users can update their personal information and view their details.

### 15. **SignUp**

Page that allows new users to sign up.

### 16. **SignUpModal**

Modal window for the signup process.

### 17. **UpdateUser**

Page where users can update their personal information (e.g., name, phone, address).

## Services

The following services are used for interacting with the backend API:

### 1. **userService**

Handles operations related to users (sign up, login, profile management, etc.).

-   `getAllUsers()`: Fetches all users.
-   `loginUser(user)`: Logs in a user.
-   `addUser(user)`: Adds a new user.
-   `businessStatus()`: Updates the user's business status.
-   `getUserById(userId)`: Fetches a user by their ID.
-   `updateUser(userId, userData)`: Updates the user's profile.

### 2. **cardService**

Handles operations related to business cards.

-   `getAllCards()`: Fetches all business cards.
-   `editCardById(cardId, cardData)`: Edits a business card by its ID.
-   `newCard(user)`: Creates a new business card.
-   `getCardById(cardId)`: Fetches a business card by its ID.
-   `deleteCard(cardId, bizNum)`: Deletes a business card.
-   `cardLikes(cardId, updatedLikes)`: Updates the likes for a specific business card.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/liatco414/LiatCohen_BCard.git
```
