import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  //handle input
  const handlChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        toast.success("User Registered Successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
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
            Register
          </Typography>
          <TextField
            placeholder="name"
            name="name"
            margin="normal"
            value={inputs.name}
            onChange={handlChange}
            type={"text"}
          />
          <TextField
            placeholder="email"
            name="email"
            margin="normal"
            type={"email"}
            value={inputs.email}
            onChange={handlChange}
            required
          />
          <TextField
            placeholder="password"
            name="password"
            margin="normal"
            type={"password"}
            value={inputs.password}
            onChange={handlChange}
            required
          />
          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/login")}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Already registered ? Please Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
