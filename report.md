Grant Palmieri and Tyler McCluskey                                                                                    12/1/23


SafeTalk Report

Goal of the project: The primary aim of the SafeTalk project is to establish a secure and anonymous communication platform, fostering open and honest conversations between users. By creating an environment where individuals can freely express themselves without the fear of judgment or consequences, the project seeks to enhance the mental well-being of its users. 

Significance of the project: SafeTalk holds significant importance in offering a distinctive approach to online communication. The app's unique feature of deleting conversations upon disconnection ensures utmost privacy, surpassing conventional chat applications. This novel combination of anonymity and ephemeral messaging provides users with a genuine safe space for candid discussions, addressing mental health concerns and facilitating support without the lingering trace of exchanged words.

Installation and Instructions:

Download latest release from the Release page on GitHub: https://github.com/10Hr/Safetalk/releases

Accessing the Application:
After downloading the zip file unzip it to where you would like to save the program

Install Node.js and npm:
If you haven't already installed Node.js and npm, you can download and install them from the official website: https://nodejs.org/en/download/.

Install Dependencies:
Open a terminal or command prompt, navigate to the directory where your program is located, and run the following command to install the required dependencies (express, http, socket.io):

npm install

Run the Program:
After installing the dependencies, you can start the server by running the following command:

node app.js

Access the Application:
Open a web browser and go to http://localhost:3000. This assumes that the server is running on port 3000 as specified in your code. If you see the message "Server is running on port 3000" in the terminal, it means the server is up and running.



Structure of the Code: 
Diagram-
 +-------------------------------------+
 |              Express App            |
 |                                     |
 |  +------------------+               |
 |  |      Static      |               |
 |  |    Middleware    |               |
 |  +------------------+               |
 |  +------------------+               |
 |  |       Routes     |               |
 |  +------------------+               |
 |  |  / (GET)         |               |
 |  +------------------+               |
 |                                     |
 +------------+------------------------+
              |
              v
 +-------------------------------------+
 |           Socket.IO Server          |
 |                                     |
 |  +------------------+               |
 |  |   Connection    |                |
 |  |   Management    |                |
 |  +------------------+               |
 |  +------------------+               |
 |  |   Event Listeners|               |
 |  +------------------+               |
 |  | 'start looking'  |               |
 |  | 'disconnect'     |               |
 |  | 'disconnect room'|               |
 |  +------------------+               |
 |                                     |
 +------------+------------------------+
              |
              v
 +-------------------------------------+
 |        User Queue Management        |
 |                                     |
 |  +------------------+               |
 |  |  Array of Users  |               |
 |  +------------------+               |
 |  +------------------+               |
 |  |   User Methods   |               |
 |  +------------------+               |
 |  | generateRandomName|              |
 |  +------------------+               |
 |  |  Join Room Logic |               |
 |  +------------------+               |
 |  |Disconnect Logic  |               |
 |  +------------------+               |
 |                                     |
 +------------+------------------------+
              |
              v
 +-------------------------------------+
 |            Active Rooms             |
 |                                     |
 |  +------------------+               |
 |  |  Array of Rooms  |               |
 |  +------------------+               |
 |                                     |
 +-------------------------------------+
Explanation-
Express App:
    Responsible for handling HTTP requests.
    Uses the Express middleware to serve static files from the '/public' directory.
    Defines a route for the root URL ('/') that serves the 'index.html' file.
    Socket.IO Server:
    Manages WebSocket connections for real-time communication.
    Handles 'connection' events when a client connects.
    Listens for 'start looking', 'disconnect', and 'disconnect room' events from clients.
    Manages user queues, room creation, and user disconnection logic.
User Queue Management:
    Keeps track of users waiting to be connected.
    Generates a random username for each user.
    Implements logic to create a room and connect two users when the 'start looking' event is triggered.
    Manages disconnection logic when a user leaves the room.
Active Rooms:
    Keeps track of the currently active rooms.
    A new room is created when two users are ready to connect.
Event Listeners:
    Listens for events like 'chat message' and handles communication between connected users.
    Handles the 'disconnect room' event to manage disconnections within a room.
Disconnect Logic:
    Handles disconnection events, both for the entire WebSocket connection and specific rooms.
    Removes the user from the queue when they disconnect.
    Server Initialization:
    Listens on the specified port for incoming connections.



Functionalities and Test Results:SafeTalk encompasses several key functionalities to ensure a secure and seamless user experience. Users initiate conversations through a priority queue system, promoting quick connections. The app provides anonymous usernames, and conversations are automatically deleted upon disconnection, reinforcing privacy.
During testing, the priority queue functionality was refined to ensure users are matched appropriately. Rigorous testing, including unit tests and user acceptance tests, confirmed the effectiveness of these features. SafeTalk consistently delivered on its promise of providing a secure and ephemeral communication platform.


Discussion and Conclusions: While SafeTalk successfully meets its objectives, future enhancements could include user accounts for personalized experiences and the addition of interactive game features. Challenges faced during development, such as refining the priority queue system, were overcome through collaborative problem-solving.
In conclusion, SafeTalk demonstrates the practical application of course concepts in developing a meaningful and innovative solution. The project's success lies in its commitment to providing users with a secure and confidential space for genuine communication, fostering mental well-being in the digital realm.

