const http = require("node:http");
const fs = require("fs"); 
const path = require("path");
const qs = require("querystring");

let users = JSON.parse(fs.readFileSync(path.join(__dirname, "users.json"), "utf8"));

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if ((url === "/" || url === "/html") && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
    res.end(html);
  }
  else if (url === "/style.css" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/css" });
    const css = fs.readFileSync(path.join(__dirname, "style.css"), "utf8");
    res.end(css);
}


  else if (url === "/addUser" && method === "POST") {
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const newUser = qs.parse(body);
      users.push(newUser);
      fs.writeFileSync(path.join(__dirname, "users.json"), JSON.stringify(users, null, 2));
      res.writeHead(301, { Location: "/html" });
      res.end();
    });
  }

  else if (url === "/users" && method === "GET") {
    const userData = JSON.parse(fs.readFileSync(path.join(__dirname, "users.json"), "utf8"));

    let html = `
    <html>
      <head>
        <title>All Users</title>
        
        

        <style>
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: #f9f9f9;
    margin: 0;
    padding: 0;
  }

  h1 {
    text-align: center;
    color: #333;
    margin-top: 30px;
  }

  table {
    border-collapse: collapse;
    width: 90%;
    margin: 30px auto;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    overflow: hidden;
  }

  th, td {
    padding: 14px 20px;
    text-align: center;
    border-bottom: 1px solid #ddd;
    font-size: 16px;
  }

  th {
    background-color: #4CAF50;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  tr:hover {
    background-color: #f1f1f1;
    transition: background-color 0.3s ease;
  }

  td form {
    display: inline-block;
    margin: 2px;
  }

  td form input[type="text"] {
    padding: 5px;
    width: 100px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  td form button {
    padding: 6px 10px;
    border: none;
    background-color: #ff4d4d;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s ease;
  }

  td form button:hover {
    background-color: #e60000;
  }

  td form[action="/updateUser"] button {
    background-color: #2196F3;
  }

  td form[action="/updateUser"] button:hover {
    background-color: #0b7dda;
  }

  a {
    display: block;
    width: fit-content;
    margin: 30px auto;
    text-align: center;
    text-decoration: none;
    padding: 12px 20px;
    background-color: #4CAF50;
    color: white;
    border-radius: 8px;
    font-weight: bold;
    box-shadow: 0 5px 10px rgba(0,0,0,0.1);
    transition: background-color 0.3s ease;
  }

  a:hover {
    background-color: a;
  }
</style>

      </head>
      <body>
        <h1 style="text-align:center">All Users</h1>
        <table>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Language</th>
          </tr>
    `;

    userData.forEach(user => {
      html += `<tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.age}</td>
        <td>${user.phone}</td>
        <td>${user.gender}</td>
        <td>${user.language}</td>
        <td>
            <form method="POST" action="/deleteUser" style="display:inline;">
              <input type="hidden" name="email" value="${user.email}">
              <button type="submit">Delete</button>
            </form>
            <form method="POST" action="/updateUser" style="display:inline;">
              <input type="hidden" name="email" value="${user.email}">
              <input type="text" name="name" placeholder="New name" required>
              <button type="submit">Update</button>
            </form>
          </td>
      </tr>`;
    });

    html += `
        </table>
        <a href="/html">Back to form</a>
      </body>
    </html>
    `;

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  }


  // ✅ حذف مستخدم
  else if (url === "/deleteUser" && method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk.toString());

    req.on("end", () => {
      const { email } = qs.parse(body);
      users = users.filter(user => user.email !== email);
      fs.writeFileSync(path.join(__dirname, "users.json"), JSON.stringify(users, null, 2));
      res.writeHead(301, { Location: "/users" });
      res.end();
    });
  }
// ✅ تعديل اسم مستخدم بناءً على الإيميل
else if (url === "/updateUser" && method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk.toString());

    req.on("end", () => {
      const { email, name } = qs.parse(body);
      users = users.map(user => {
        if (user.email === email) {
          return { ...user, name };
        }
        return user;
      });
      fs.writeFileSync(path.join(__dirname, "users.json"), JSON.stringify(users, null, 2));
      res.writeHead(301, { Location: "/users" });
      res.end();
    });
  }


  else if (url === "/api/users" && method === "GET") {
    const userData = JSON.parse(fs.readFileSync(path.join(__dirname, "users.json"), "utf8"));
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(userData));
  }
  




  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ msg: "Page not found" }));
  }
});

server.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
