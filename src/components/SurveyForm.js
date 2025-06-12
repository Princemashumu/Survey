import React, { useState } from 'react';
import {
  Container, TextField, Typography, FormGroup,
  FormControlLabel, Checkbox, Table, TableHead,
  TableRow, TableCell, TableBody, Radio
} from '@mui/material';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const foodOptions = ['Pizza', 'Pasta', 'Pap and Wors', 'Other'];
const questions = [
  { key: 'movies', text: 'I like to watch movies' },
  { key: 'radio', text: 'I like to listen to radio' },
  { key: 'eatOut', text: 'I like to eat out' },
  { key: 'tv', text: 'I like to watch TV' }
];
const ratings = ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'];

export default function SurveyForm({ onSubmit }) {
  const [data, setData] = useState({
    fullName: '',
    email: '',
    dob: '',
    contact: '',
    food: [],
    responses: {}
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Personal Detail</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="dense" name="fullName" label="Full Names" onChange={handleChange} />
        <TextField fullWidth margin="dense" name="email" label="Email" onChange={handleChange} />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date of Birth"
            value={data.dob || null}
            onChange={(newValue) => {
              setData({ ...data, dob: newValue });
            }}
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="dense" />
            )}
          />
        </LocalizationProvider>
        <TextField fullWidth margin="dense" name="contact" label="Contact Number" onChange={handleChange} />

        <Typography sx={{ mt: 3 }}>What is your favorite food?</Typography>
        <FormGroup row>
          {foodOptions.map(food => (
            <FormControlLabel
              key={food}
              control={<Checkbox checked={data.food.includes(food)} onChange={() => handleFoodToggle(food)} />}
              label={food}
            />
          ))}
        </FormGroup>

        <Typography sx={{ mt: 4 }}>
          Please rate your level of agreement:
        </Typography>

        <Table sx={{ mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {ratings.map(rate => (
                <TableCell key={rate} align="center">{rate}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map(q => (
              <TableRow key={q.key}>
                <TableCell>{q.text}</TableCell>
                {ratings.map(rate => (
                  <TableCell key={rate} align="center">
                    <Radio
                      name={q.key}
                      value={rate}
                      checked={data.responses[q.key] === rate}
                      onChange={() => handleRating(q.key, rate)}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Button type="submit" variant="contained" sx={{ mt: 3 }}>Submit</Button>
      </form>
    </Container>
  );
}
