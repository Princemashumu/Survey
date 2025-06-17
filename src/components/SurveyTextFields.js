import React from 'react';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function SurveyTextFields({ data, errors, handleChange, setData, setErrors }) {
  return (
    <>
      <TextField
        fullWidth
        margin="dense"
        name="fullName"
        label="Full Names"
        onChange={handleChange}
        error={!!errors.fullName}
        helperText={errors.fullName}
      />
      <TextField
        fullWidth
        margin="dense"
        name="email"
        label="Email"
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Date of Birth"
          value={data.dob || null}
          onChange={(newValue) => {
            setData({ ...data, dob: newValue });
            setErrors(prev => ({ ...prev, dob: '' }));
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              margin="dense"
              error={!!errors.dob}
              helperText={errors.dob}
            />
          )}
        />
      </LocalizationProvider>
      <TextField
        fullWidth
        margin="dense"
        name="contact"
        label="Contact Number"
        onChange={handleChange}
        error={!!errors.contact}
        helperText={errors.contact}
      />
    </>
  );
}