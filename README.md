

# 🧾 Node.js User Management CRUD App

This is a simple Node.js-based CRUD application that allows users to **create**, **view**, **update**, and **delete** user information. It uses core Node.js modules only (no frameworks like Express).

## 📁 Features

* View a form to add new users
* Save user data to a `users.json` file
* View a styled table of all users
* Update a user's name by email
* Delete a user by email
* Get users in JSON format through an API route

---

## 📂 Project Structure

```
├── index.html          # Main form interface
├── style.css           # Styling for the frontend
├── users.json          # Stores user data
├── server.js           # Main server file
├── README.md           # Project documentation
```

---

## 🛠 Technologies Used

* Node.js (`http`, `fs`, `path`, `querystring` modules)
* HTML5, CSS3
* JSON (for data persistence)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/nodejs-crud-app.git
cd nodejs-crud-app
```

### 2. Install Node.js (if not already)

[Download and install Node.js](https://nodejs.org)

### 3. Run the Application

```bash
node server.js
```

### 4. Open in Browser

Visit: [http://localhost:3001](http://localhost:3001)

---

## 📌 Available Routes

| Method | Route          | Description                      |
| ------ | -------------- | -------------------------------- |
| GET    | `/` or `/html` | Displays the user input form     |
| POST   | `/addUser`     | Adds a new user to `users.json`  |
| GET    | `/users`       | Displays all users in a table    |
| POST   | `/deleteUser`  | Deletes a user by email          |
| POST   | `/updateUser`  | Updates a user's name by email   |
| GET    | `/api/users`   | Returns all users in JSON format |
| GET    | `/style.css`   | Loads CSS file for styling       |

---

## ✨ Sample User Object

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": "25",
  "phone": "1234567890",
  "gender": "male",
  "language": "English"
}
```

---

## 📝 Notes

* This app uses **vanilla Node.js**, no external libraries or frameworks.
* All data is stored in a local JSON file (`users.json`).
* Frontend and backend are in the same project for simplicity.

---

## 📷 Screenshots



![b](https://github.com/user-attachments/assets/ba5adfa9-f915-4b73-99ff-fa4da0ea3b4c)
![a](https://github.com/user-attachments/assets/b1dd3e13-22cf-4515-a76d-f8ea008ed7d4)


---

## 🧑‍💻 Author

**Mid**


---

## 📃 License

MIDO KHALED

---


