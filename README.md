# The Network
### Live At: https://the-network-bice.vercel.app/

The Network is a social media web application that can be used to network with people from all over the world. It allows registered users to be able to make post's and interact with Posts from other users. 

## Inspiration
This Project was built to test my MERN Stack skills

## How it was built
For the Frontend I made use of NextJS, Javascript and CSS. In the backend, I made use of Node Js and Express JS for the Rest API and mongoDB for the Database. The Database was deployed on MongoDB Atlas, The RestAPI was deployed on render and I made use of vercel to deploy the Frontend.
Image Files are stored on `cloudinary` database.

## Challenges I ran Into
I had some issues setting up sessions and cookies for a production environment. Even though it was working perfectly fine on my local machine, after deploying it had some bugs. I was able to fix this by first setting up a Mongo Store to save session Data. and I configured `cors` to allow access from the FrontEnd hosted on vercel. Then I setup cookies `samesite` and `secure` properties.

Another major Issue i had was loading the image files from `cloudinary`. I had to configure the 'next.config.js' file to allow access from `res.cloudinary.com` to fix this.

## Accomplishment that I'm proud Of
I am proud that i was able to use the MERN stack to build this project 

## What I learned
I learned alot about Next JS and building Rest API with Express and Mongo DB. I learnt about hydaration in Next JS and how to setup cookies and sessions for a production environment. I also learned how to perfectly integrate different technologies/frameworks into one project.

## What's next for theNetwork
I'm working on integrating a chat feature and also setting up a notification system to alert users whenever their post is interacted with.
I also plan on making use of web sockets to integrate bi-directional communication instead of using a Rest API

## Built With
- NextJS
- Javascript
- CSS
- ExpressJS
- NodeJS
- MongoDB
- Cloudinary

Link to Backend code: https://github.com/Caleb00004/theNetwork-server-side-
