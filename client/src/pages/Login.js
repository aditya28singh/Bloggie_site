import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/v1/user/login", {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem('userId',data?.user._id) // to get userId by storing in local storage
        dispatch(authActions.login());
        toast.success("User Logged In Successfully!");
        navigate("/");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
          marginTop={5}
          boxShadow={"10px 10px 20px #ccc"}
          padding={3}
          borderRadius={5}
        >
          <Typography
            variant="h4"
            padding={3}
            textAlign={"center"}
            textTransform={"uppercase"}
          >
            Sign In
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <TextField
            placeholder="email"
            name="email"
            margin="normal"
            type={"email"}
            value={inputs.email}
            onChange={handleChange}
            required
          />
          <TextField
            placeholder="password"
            name="password"
            margin="normal"
            type={"password"}
            value={inputs.password}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Submit"}
          </Button>
          <Button
            onClick={() => navigate("/register")}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Not a user? Please Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Box, Typography, TextField, Button } from "@mui/material";
// import axios from "axios";
// import {useDispatch} from "react-redux"
// import {authActions} from "../redux/store"
// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [inputs, setInputs] = useState({
//     email: "",
//     password: "",
//   });
//   //handle input
//   const handlChange = (e) => {
//     setInputs((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };
//   //form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("/api/v1/user/login", {
//         email: inputs.email,
//         password: inputs.password,
//       });
//       if (data.success) {
//         dispatch(authActions.login())
//         alert("User LoggedIn Successfully!");
//         navigate("/");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <Box
//           maxWidth={450}
//           display={"flex"}
//           flexDirection={"column"}
//           alignItems={"center"}
//           justifyContent={"center"}
//           margin={"auto"}
//           marginTop={5}
//           boxShadow={"10px 10px 20px #ccc"}
//           padding={3}
//           borderRadius={5}
//         >
//           <Typography
//             variant="h4"
//             padding={3}
//             textAlign={"center"}
//             textTransform={"uppercase"}
//           >
//             Sign In 
//        </Typography>
//           <TextField
//             placeholder="email"
//             name="email"
//             margin="normal"
//             type={"email"}
//             value={inputs.email}
//             onChange={handlChange}
//             required
//           />
//           <TextField
//             placeholder="password"
//             name="password"
//             margin="normal"
//             type={"password"}
//             value={inputs.password}
//             onChange={handlChange}
//             required
//           />
//           <Button
//             type="submit"
//             sx={{ borderRadius: 3, marginTop: 3 }}
//             variant="contained"
//             color="primary"
//           >
//             Submit
//           </Button>
//           <Button
//             onClick={() => navigate("/register")}
//             sx={{ borderRadius: 3, marginTop: 3 }}
//           >
//             Not a user ? Please Register
//           </Button>
//         </Box>
//       </form>
//     </>
//   );
// };
  


// export default Login