import React, { useContext, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Snackbar } from '@mui/material';
import './Sell.scss';
import MyContext from '../MyContext/MyContext';

const SellSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  startingPrice: Yup.number().positive('Must be positive').required('Required'),
  category: Yup.string().required('Required'),
  image: Yup.mixed().required('Required'),
});

const categories = ['Electronics', 'Fashion', 'Books', 'Home Decor', 'Art', 'Other'];

const SellForm = () => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);



  // Function to handle the case when user is not logged in
  const handleNotLoggedIn = () => {
    setOpenSnackbar(true);
    setTimeout(() => {
      setOpenSnackbar(false);
      navigate('/login'); // Redirect to login after 3 seconds
    }, 3000);
  };

  return (
    <div className="sell-wrapper">
      <div className="sell-container">
        <h2>Create Listing</h2>
        <Formik
          initialValues={{
            title: '',
            description: '',
            startingPrice: '',
            category: '',
            image: null,
          }}
          validationSchema={SellSchema}
          onSubmit={async (values) => {
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');

            // Check if the user is logged in
            if (!token ) {
              handleNotLoggedIn();
              return;
            }

            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('startingPrice', values.startingPrice);
            formData.append('category', values.category);
            formData.append('image', values.image);

            try {
              await axios.post('http://localhost:3032/api/listings', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${token}`,
                },
              });
              navigate('/listings');
            } catch (error) {
              console.error('Error submitting listing:', error);
            }
          }}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="sell-form">
              <Field name="title" type="text" placeholder="Listing Title" />
              {errors.title && touched.title && <div className="error-message">{errors.title}</div>}

              <Field name="description" as="textarea" placeholder="Description" rows="4" />
              {errors.description && touched.description && (
                <div className="error-message">{errors.description}</div>
              )}

              <Field name="startingPrice" type="number" placeholder="Starting Price ($)" />
              {errors.startingPrice && touched.startingPrice && (
                <div className="error-message">{errors.startingPrice}</div>
              )}

              <Field name="category" as="select">
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Field>
              {errors.category && touched.category && (
                <div className="error-message">{errors.category}</div>
              )}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(event) => {
                  setFieldValue('image', event.currentTarget.files[0]);
                }}
              />
              {errors.image && touched.image && <div className="error-message">{errors.image}</div>}

              <button type="submit">Create Listing</button>
            </Form>
          )}
        </Formik>
      </div>

      {/* Snackbar for showing login prompt */}
      <Snackbar
        open={openSnackbar}
        message="Please login first to create a listing..."
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      />
    </div>
  );
};

export default SellForm;
