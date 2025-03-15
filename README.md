# Which Element Are You? - A Personality Quiz

## Overview
This project is a React-based web application that presents a personality quiz to determine which element (Fire, Water, Earth, or Air) best represents the user based on their answers. The application provides an interactive user experience with a simple UI, dynamic routing, and artwork fetching from The Metropolitan Museum of Art API.

## Technologies Used
- **React**: For building the user interface.
- **React Router**: For managing application routing.
- **Context API**: For managing global user state.
- **The Metropolitan Museum of Art API**: For retrieving artwork based on the selected element.
- **CSS**: For styling the application.

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps to Run the Project
1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd which-element-quiz
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm start
   ```
5. Open `http://localhost:3000/` in your browser to access the quiz.


## API Integration
The application uses The Metropolitan Museum of Art API to fetch artwork based on the determined element.

### Example API Request
```sh
GET https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=<element>&isOnView=true
```


