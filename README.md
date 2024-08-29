<div align="center">
  <h1>Comprehensive Project README</h1>
</div>

---

## APIs and demo data:

## post: http://localhost:5000/register  jsonData: 
                 {
                    "username":"Nill",
                    "email":"nill4470@gmail.com",
                    "password":"abcd"
                }
## post: http://localhost:5000/login  jsonData:
                    {
                      "email":"nill4470@gmail.com",
                      "password":"abcd"
                  }
## post: http://localhost:5000/blog  jsonData: 
                  {
                    "Title": "Introduction to JavaScript",
                    "Messages": [
                      "JavaScript is a versatile programming language.",
                      "It is widely used for web development.",
                      "You can build interactive websites using JavaScript."
                    ],
                    "Author": "Nill",
                    "authorId": "12345555"
                  }
## get: http://localhost:5000/allBlog


## Technology Stack

- Express.js,bcrypt,JWT, MongoDB

### Installation Steps

1. Clone the git Repo:

```bash
  https://github.com/Biddut-Roy/Nursery-client.git
```

2. Open vs code and Run Terminal:

```bash
  npm i
```

3.

```bash
  npm run dev
```

### Configuration

1. Create a `.env.local` file in the root directory of the project.
2. Add necessary configuration variables in the `.env.local` file.
   Example:
   ```bash
    DB_USER=bitrouBoss
    DB_PASS=BNitAqcLxihxl1JT
    JWT_SECRET=4fe72e7381aeae9ae250874b9eb4ea4475db9a040671d3ea1223bc875a58b2931de96fb635dce001ed34878965d7dd54e818d52f2138fb63c39404a88ae4b891
   ```
