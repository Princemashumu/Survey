import React, { useState } from 'react';
import { Container, Typography, Button, CircularProgress, Box } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import SurveyTextFields from './SurveyTextFields';
import SurveyFoodOptions from './SurveyFoodOptions';
import SurveyRatings from './SurveyRatings';

function getAge(dateString) {
  if (!dateString) return null;
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export default function SurveyForm({ onSubmit }) {
  const [data, setData] = useState({
    fullName: '',
    email: '',
    dob: '',
    contact: '',
    food: [],
    otherFood: '',
    responses: {},
    submittedAt: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleFoodToggle = (food) => {
    const updated = data.food.includes(food)
      ? data.food.filter(item => item !== food)
      : [...data.food, food];
    setData({ ...data, food: updated });
  };

  const handleRating = (key, value) => {
    setData(prev => ({
      ...prev,
      responses: {
        ...prev.responses,
        [key]: value
      }
    }));
    setErrors(prev => ({
      ...prev,
      responses: { ...prev.responses, [key]: '' }
    }));
  };

  const handleOtherFoodChange = (value) => {
    setData(prev => ({ ...prev, otherFood: value }));
  };

  const validate = () => {
    console.log('Validating form data:', data);
    let valid = true;
    let newErrors = {};

    // Text fields
    if (!data.fullName.trim()) {
      newErrors.fullName = 'Full Names is required';
      valid = false;
    }
    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }
    if (!data.contact.trim()) {
      newErrors.contact = 'Contact Number is required';
      valid = false;
    }

    // Date of Birth
    if (!data.dob) {
      newErrors.dob = 'Date of Birth is required';
      valid = false;
    } else {
      const age = getAge(data.dob);
      if (age === null || age < 5 || age > 120) {
        newErrors.dob = 'Age must be between 5 and 120';
        valid = false;
      }
    }

    // Food selection
    if (data.food.length === 0) {
      newErrors.food = 'Please select at least one food option';
      valid = false;
    }
    if (data.food.includes('Other') && !data.otherFood.trim()) {
      newErrors.otherFood = 'Please specify your other favorite food';
      valid = false;
    }

    // Check survey responses
    const responseKeys = ['movies', 'radio', 'eatOut', 'tv'];
    let responsesErrors = {};
    responseKeys.forEach(key => {
      if (!data.responses[key]) {
        responsesErrors[key] = 'Required';
        valid = false;
      }
    });
    if (Object.keys(responsesErrors).length > 0) {
      newErrors.responses = responsesErrors;
    }

    console.log('Validation result:', { valid, errors: newErrors });
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted, validating...', data);
    
    if (validate()) {
      setIsSubmitting(true);
      try {
        console.log('Validation passed, preparing submission data...');
        const submissionData = {
          fullName: data.fullName.trim(),
          email: data.email.trim(),
          dob: data.dob ? new Date(data.dob).toISOString() : null,
          contact: data.contact.trim(),
          food: data.food,
          otherFood: data.food.includes('Other') ? data.otherFood.trim() : '',
          responses: data.responses,
          submittedAt: new Date().toISOString()
        };
        
        console.log('Submitting data:', submissionData);
        await onSubmit(submissionData);
        console.log('Submission successful');
        
        setSuccess(true);
        // Reset form after successful submission
        setData({
          fullName: '',
          email: '',
          dob: '',
          contact: '',
          food: [],
          otherFood: '',
          responses: {},
          submittedAt: null
        });
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors(prev => ({
          ...prev,
          submit: 'Failed to submit the form. Please try again.'
        }));
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log('Validation failed', errors);
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        mt: 4,
        px: { xs: 1, sm: 2, md: 4 },
        maxWidth: '900px',
      }}
    >
      <Typography variant="h5" gutterBottom>Personal Details</Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <SurveyTextFields
          data={data}
          errors={errors}
          handleChange={handleChange}
          setData={setData}
          setErrors={setErrors}
        />
        <SurveyFoodOptions
          data={data}
          handleFoodToggle={handleFoodToggle}
          handleOtherFoodChange={handleOtherFoodChange}
          errors={errors}
        />
        <SurveyRatings
          data={data}
          errors={errors}
          handleRating={handleRating}
        />
        <Button 
          type="submit" 
          variant="contained" 
          disabled={isSubmitting}
          sx={{ 
            mt: 3, 
            width: { xs: '100%', sm: 'auto' },
            position: 'relative',
            minWidth: '120px',
            minHeight: '36px'
            ,borderRadius: '1',
             padding: '0 8px',
            marginBottom: '20px',
            backgroundColor: '#87CEEB',
            color: 'black',
          }}
        >
          {isSubmitting ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={20} color="inherit" />
              <span>Submitting...</span>
            </Box>
          ) : (
            'Submit'
          )}
        </Button>
      </form>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert 
          onClose={() => setSuccess(false)} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          Survey submitted successfully!
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}
