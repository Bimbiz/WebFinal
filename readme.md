This project is a Full-Stack web application designed to manage a digital library of video games. It allows users to browse games, view industry news, and participate in a community-driven rating system. The application is built using a decoupled architecture with a dedicated REST API and a client-side interface.

Backend:
Node.js
Express
MongoDB
JWT
News API (It is bad)

Frontend:

CSS, HTML, JS

Method,Endpoint,Purpose
POST,/api/auth/register,User account creation
POST,/api/auth/login,User authentication & token issuance
GET,/api/games,Retrieval of the game catalog
GET,/api/games/:id,Retrieval of specific game metadata and calculated score
POST,/api/reviews,Creation of a new review (Authenticated only)
GET,/api/news,External news data aggregation

How to setup:
.env: MONGO_URI, JWT_SECRET, APITUBE_API_KEY, PORT

```shell
npm install
```

And then:

```shell
npx nodemon server.js
```

(I know it is not proper way to run it, but trust me)
