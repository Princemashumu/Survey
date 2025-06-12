import React from 'react';
import { Container, Typography } from '@mui/material';

export default function SurveyResults({ responses }) {
  if (responses.length === 0) return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">Survey Results</Typography>
      <Typography>No surveys submitted yet.</Typography>
    </Container>
  );

  const getAge = dob => {
    const birth = new Date(dob);
    const today = new Date();
    return today.getFullYear() - birth.getFullYear();
  };

  const ages = responses.map(r => getAge(r.dob));
  const averageAge = (ages.reduce((a, b) => a + b, 0) / ages.length).toFixed(1);
  const maxAge = Math.max(...ages);
  const minAge = Math.min(...ages);

  const foodStats = (food) => (
    (responses.filter(r => r.food.includes(food)).length / responses.length * 100).toFixed(1)
  );

  const ratingToValue = {
    'Strongly Agree': 1,
    'Agree': 2,
    'Neutral': 3,
    'Disagree': 4,
    'Strongly Disagree': 5
  };

  const avgRating = (key) => {
    const ratings = responses.map(r => ratingToValue[r.responses[key]] || 0).filter(n => n > 0);
    return ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : '-';
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Survey Results</Typography>

      <Typography>Total number of surveys: {responses.length}</Typography>
      <Typography>Average Age: {averageAge}</Typography>
      <Typography>Oldest person: {maxAge}</Typography>
      <Typography>Youngest person: {minAge}</Typography>

      <Typography sx={{ mt: 2 }}>Percentage who like Pizza: {foodStats('Pizza')}%</Typography>
      <Typography>Percentage who like Pasta: {foodStats('Pasta')}%</Typography>
      <Typography>Percentage who like Pap and Wors: {foodStats('Pap and Wors')}%</Typography>

      <Typography sx={{ mt: 2 }}>People who like to watch movies: {avgRating('movies')}</Typography>
      <Typography>People who like to listen to radio: {avgRating('radio')}</Typography>
      <Typography>People who like to eat out: {avgRating('eatOut')}</Typography>
      <Typography>People who like to watch TV: {avgRating('tv')}</Typography>
    </Container>
  );
}
