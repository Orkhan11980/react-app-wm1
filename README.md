
## Deployment
Check out the live version here: [Live Demo](https://orkhan11980.github.io/react-app-wm1/)


### Features

#### Home Page

- **General Introduction**: A brief biography or introduction to myself, outlining my skills, experiences.

- **Project Showcase**: A list of all the projects I've completed or are in progress. Each project has:
  - A brief description
  - Technologies used
  - An external link to the project's website or repository(which are not deployed)

#### Flashcards Page

- **Interactive Learning Tool**: Users can view, flip, and learn from flashcards.
  - **Add Flashcards**: Users can add new flashcards with a question on the front and an answer on the back. The new cards are saved to `/cards` on the JSON server.
  - **Flip Functionality**: Users can flip the cards to see the question or answer.
  - **Filter and Search**: Users can filter flashcards by categories or tags and use a search function to quickly find specific cards.
  - **Drag and Drop**: Organize your flashcards or study sessions by dragging and dropping cards into custom orders.
  - **Infinite Pagination**: Scroll through flashcards endlessly with the infinite pagination feature, making it easy to continuously study without interruption :).
  - **Sort Functionality**: Sort the flashcards by date added (latest and oldest), or by last modified date for efficient studying.

#### Contact Page

- **Messaging Form**: A simple form where users can leave their name, email, and a message.
  - **Data Handling**: Submitted messages are saved to `/messages` on the JSON server.
  - **Validation and Feedback**: Ensures all fields are filled and provides confirmation upon successful submission.

### JavaScript Animations

- **Page-Wide Animations**: Each page features custom JavaScript animations, enhancing the user experience and interface aesthetics. From smooth transitions between pages to interactive elements on hover, the application provides a dynamic and engaging user environment.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm
- Visual Studio Code - Code Editor (or any other you prefer)
### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/Orkhan11980/react-app-wm1.git
    cd [repository-directory]
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Environment Setup**

    - Create a `.env` file and configure your application's ports and database URLs as necessary.

### Run the Application

This application is configured to run both the client-side React application and the JSON server concurrently, simplifying the development process and mimicking a more production-like environment.

- **Concurrent Execution**: By utilizing `concurrently`, the npm script is configured to launch both the React application and JSON server in parallel but on different ports. The default configuration runs the React app on port 3000 and the JSON server on port 3001.

Execute the following command to start both servers:

    ```bash
    npm start
    ```
   
## Technology Stack


- **Frontend**: React - A JavaScript library for building user interfaces.
- **Backend**: JSON Server - A full fake REST API with zero coding.
- **Concurrent Execution**: Concurrently - A utility that manages multiple npm commands concurrently.


## Contact

- **Orkhan Ismayilov**: [LinkedIn](https://www.linkedin.com/in/orkhanismayilov11980/)
- **Email**: oismayilov11980@ada.edu.az
