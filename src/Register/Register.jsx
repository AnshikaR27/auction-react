import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Register.scss';
import { FaArrowLeft } from "react-icons/fa6";
import {  useState } from 'react';
import { Button, InputAdornment, TextField, Snackbar, CircularProgress } from '@mui/material';
import { IoMdLock } from "react-icons/io";
import { MdCall, MdDriveFileRenameOutline, MdOutlineMail } from "react-icons/md";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const Navigate = useNavigate()
  const [loader, setLoader] = useState(false); // Loader state
  const [showPass, setShowPass] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar visibility state
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Snackbar severity (success or error)

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('**Name is required')
        .matches(/^([^0-9]*)$/, "**Don't allow Numeric Value"),
      email: Yup.string()
        .required('**Email is required')
        .email('**Enter a valid email'),
      mobile: Yup.string()
        .required('**Mobile number is required')
        .matches(/^[0-9]{10}$/, '**Mobile number is not valid'),
      password: Yup.string()
        .required('**Password is required')
        .min(8, '**Password must be at least 8 characters')
        .max(12, '**Password must be at most 12 characters'),
    }),

    onSubmit: async (values, { resetForm }) => {
      setLoader(true); // Start loader when the form is submitting
      const response = await fetch('http://localhost:3032/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      setLoader(false); // Stop loader after receiving response

      if (data.success) {
        setSnackbarMessage("Registration successful!");
        setSnackbarSeverity("success"); // Green success message
        setSnackbarOpen(true);
        resetForm();
        Navigate('/login')

      } else {
        setSnackbarMessage(data.error || "Registration failed. Please try again.");
        setSnackbarSeverity("error"); // Red error message
        setSnackbarOpen(true);
      }
    },
  });

  return (
    <>
      {!sessionStorage.getItem('token') ? (
        <>
          <h2 className='reg_heading'>Register</h2>
          <div className='Register_main'>
            <div className="backto_login">
              <FaArrowLeft onClick={() => Navigate('/login')} />
            </div>

            <form className='Register_form' onSubmit={formik.handleSubmit}>

              <TextField
                id="name"
                name="name"
                placeholder='Name'
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name} 
                label="Name" 
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdDriveFileRenameOutline />
                    </InputAdornment>
                  ),
                }}
                variant="outlined" 
              />

              <TextField
                id="email"
                name="email"
                placeholder='Email'
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email} 
                label="Email" 
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdOutlineMail />
                    </InputAdornment>
                  ),
                }}
                variant="outlined" 
              />

              <TextField
                id="mobile"
                name="mobile"
                placeholder='Mobile'
                value={formik.values.mobile}
                onChange={formik.handleChange}
                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile} 
                label="Mobile" 
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdCall />
                    </InputAdornment>
                  ),
                }}
                variant="outlined" 
              />

              <div className='pass'>
                <span onClick={() => setShowPass(!showPass)}>
                  {showPass ? <FaEye /> : <FaEyeSlash />}
                </span>

                <TextField
                  id="password"
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  placeholder='Password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password} 
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IoMdLock/>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined" 
                />
              </div>

              <Button className='reg_btn' type="submit" variant="contained" disabled={loader}>
                {loader ? <CircularProgress size={24} /> : 'Sign Up'}
              </Button>

            </form>
          </div>

          {/* Snackbar for success and error messages */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
            message={snackbarMessage}
            severity={snackbarSeverity}
            style={{
              backgroundColor: snackbarSeverity === 'success' ? '#4CAF50' : '#f44336',
              color: 'white',
            }}
          />
        </>
      ) : Navigate('/')}
    </>
  );
};

export default Register;
