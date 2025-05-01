import { useFormik } from "formik";
import * as Yup from "yup";
import "./Login.scss";
import { useContext, useState } from "react";
import { Button, InputAdornment, TextField, Snackbar } from "@mui/material";
import { IoMdLock } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import MyContext from "../MyContext/MyContext";

const Login = () => {
  const Navigate = useNavigate();
  const {handleLogin} = useContext(MyContext); // Importing handleLogin from context
  
  const [showPass, setShowPass] = useState(false);

  const [loader, setLoader] = useState(false); 
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar visibility state
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Snackbar severity (success or error)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("**Enter a valid email").required("**Email is required"),
      password: Yup.string().min(8, "**Password must be at least 8 characters").required("**Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoader(true); // Show loader
      try {
        const response = await fetch("http://localhost:3032/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        setLoader(false); // Hide loader after response

        if (data.success) {
          // Store token in localStorage for authenticated requests
          localStorage.setItem('token', data.token);
          
          // Pass token to context handler if needed
          handleLogin(data.token); 
          
          // Update UI feedback
          setSnackbarMessage("Login successful!");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
          
          // Navigate and reset form
          Navigate("/");
          resetForm();
          
          // For debugging - check if token was stored
          console.log("Token stored:", localStorage.getItem('token'));
        } else {
          setSnackbarMessage(data.error || "Login failed. Please try again.");
          setSnackbarSeverity("error"); // Red snackbar for failure
          setSnackbarOpen(true);
        }
      } catch (error) {
        setLoader(false);
        console.error("Login error:", error);
        setSnackbarMessage("Connection error. Please try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    },
  });

  // Function to confirm password reset before navigating
  const handleForgotPassword = () => {
    const confirmReset = window.confirm("Are you sure you want to reset your password?");
    if (confirmReset) {
      Navigate("/forget-password");
    }
  };

  return (
    <>
      {!sessionStorage.getItem("token") ? (
        <>
          <h1 className="log_heading">Login</h1>
          <div className="Login_main">
            <form onSubmit={formik.handleSubmit} className="Login_form">
              <TextField
                id="email"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdOutlineMail />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />

              <div className="pass">
                <span onClick={() => setShowPass(!showPass)}>
                  {showPass ? <FaEye /> : <FaEyeSlash />}
                </span>

                <TextField
                  id="password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IoMdLock />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </div>

              {/* Updated forgot password with confirmation */}
              <p className="log_fp" onClick={handleForgotPassword}>Forgot Your Password?</p>

              <Button type="submit" className="log_btn">
                {loader ? <CircularProgress size={24} /> : "Sign in"}
              </Button>
              <p className="log_ca" onClick={() => Navigate("/register")}>Create account</p>
            </form>
          </div>
        </>
      ) : Navigate("/")}

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        severity={snackbarSeverity}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          backgroundColor: snackbarSeverity === "success" ? "green" : "red",
        }}
      />
    </>
  );
};

export default Login;