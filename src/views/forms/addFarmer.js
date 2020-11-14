import React from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik'
import { TextField } from 'material-ui-formik-components/TextField'
import { Select } from 'material-ui-formik-components/Select'

import {
  Box,
  Button,
  Container,
  Typography,
  makeStyles
} from '@material-ui/core';
import MuiPhoneNumber from 'material-ui-phone-number'
import Page from 'src/components/Page';

import { postFarmer, useAuthState, useAuthDispatch } from '../../Context';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterFarmerView = () => { 
  const classes = useStyles();
  const navigate = useNavigate();

  const dispatch = useAuthDispatch();
  const { loading, errorMessage, token } = useAuthState();
  
  return (
    <Page
      className={classes.root}
      title="Register Farmer"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              age: '',
              email: '',
              gender: 'Male',
              village: '',
              phoneNumber: ''
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                firstName: Yup.string().max(255).required('First name is required'),
                lastName: Yup.string().max(255).required('Last name is required'),
              })
            }
            onSubmit={async values => {
              console.log(values)
              try {
                let response = await postFarmer(dispatch, values, token);
                if (!response) return;
                return navigate('/app/dashboard', { replace: true });
              } catch (error) {
                console.log(error);
                console.log(errorMessage)
              }
            }}
          >
            {formik => ( 
              <Form>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create new Farmer
                  </Typography>
                </Box>
                <Field 
                  name="firstName" 
                  label="First Name" 
                  component={TextField} 
                />
                <Field 
                  name="lastName" 
                  label="Last Name" 
                  component={TextField} 
                />
                <Field 
                  name="email" 
                  label="Email Address" 
                  type="email"
                  component={TextField} 
                />
                <Field 
                  name="phoneNumber" 
                  label="Phone Number" 
                  component={TextField} 
                />
                <Field
                  required
                  name="gender"
                  label="Gender"
                  options={[
                    { value: 'Male', label: 'Male' },
                    { value: 'Female', label: 'Female' },
                    { value: 'Other', label: 'Other' },
                  ]}
                  component={Select}
                />
                <Field 
                  name="age" 
                  label="Age" 
                  component={TextField} 
                />
                <Field 
                  name="village" 
                  label="Village" 
                  component={TextField} 
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={!formik.dirty || loading}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Create Farmer
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  )
}

export default RegisterFarmerView