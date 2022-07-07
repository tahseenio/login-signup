# Login Signup <a target="_blank" href="https://login-signup-sable.vercel.app/">Visit Here</a>

<img src="https://img.shields.io/github/repo-size/tahseenio/login-signup">

### Description
A sleek login and signup system where users are able to create a new account or log in with a previous email or using a google account.

## Screenshots

![image](https://user-images.githubusercontent.com/55749172/176456297-12501320-31a3-4379-97a7-79d379356ffe.png)

## Tech and Packages Used
<p align="center">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" >
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" >
  <img src="https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white" >
  <img src="https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue" >
  <img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white" >
</p>

- react-hook-form and yup for input validation and handling of all forms.
- react-icons for icons
- ChartJS for good looking charts
- Firebase authentication and Firestore for data storage

## Lessons Learned
- In this project I focused more on learning how to create a form that would allow users to login, signup, reset passwords and similar forms of that nature.
- I realised it was easier to use react-hook-forms than relying on useState to hold form data as it was simpler when it came to handling the data and integrating error handling.
- I learned how to use yup for error handling and conditionally displaying it. 
- For the actual login process I decided to learn Firebase as I was able to learn how to create authentication using either an email someone had inputted or logging in using an external service such as Google login. 
- I learned how to use protected routes so users who are not logged in cannot access certain URLs they do not have access to
- Learned the basics of Firestore and being able to store and pull data of an existing user. In this case it was being able to store the number values of the different colors of the pie chart.




## Future optimizations
- Add a nice layout once the user has logged in. I have put this on the backburner as this project was more of a focus on learning to build forms, input validation and authentication using a backend.
