import React from 'react';
import { Card, CardContent, Typography, Grid, Divider, Box, LinearProgress } from '@mui/material';

function getAge(dob) {
  if (!dob) return null;
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const foodOptions = ['Pizza', 'Pasta', 'Pap and Wors', 'Other'];
const ratingLabels = [
  'Strongly Agree',
  'Agree',
  'Neutral',
  'Disagree',
  'Strongly Disagree'
];
const ratingMap = {
  'Strongly Agree': 5,
  'Agree': 4,
  'Neutral': 3,
  'Disagree': 2,
  'Strongly Disagree': 1,
};

export default function SurveyStats({ responses }) {
  const total = responses.length;

  // Age calculations
  const ages = responses.map(r => getAge(r.dob)).filter(a => typeof a === 'number');
  const avgAge = ages.length ? (ages.reduce((a, b) => a + b, 0) / ages.length).toFixed(1) : '-';
  const oldest = ages.length ? Math.max(...ages) : '-';
  const youngest = ages.length ? Math.min(...ages) : '-';

  // Food percentages
  const foodCounts = foodOptions.reduce((acc, food) => {
    acc[food] = responses.filter(r => r.food && r.food.includes(food)).length;
    return acc;
  }, {});
  const foodPercentages = Object.fromEntries(
    Object.entries(foodCounts).map(([food, count]) => [
      food,
      total ? ((count / total) * 100).toFixed(1) : '-'
    ])
  );

  // "Like to eat out" average rating
  const eatOutRatings = responses
    .map(r => ratingMap[r.responses?.eatOut])
    .filter(v => typeof v === 'number');
  const eatOutAvg = eatOutRatings.length ? (eatOutRatings.reduce((a, b) => a + b, 0) / eatOutRatings.length).toFixed(1) : '-';

  // "Like to eat out" rating percentages
  const eatOutRatingCounts = ratingLabels.reduce((acc, label) => {
    acc[label] = responses.filter(r => r.responses && r.responses.eatOut === label).length;
    return acc;
  }, {});
  const eatOutRatingPercentages = Object.fromEntries(
    Object.entries(eatOutRatingCounts).map(([label, count]) => [
      label,
      total ? ((count / total) * 100).toFixed(1) : '-'
    ])
  );

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
            Survey Statistics
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                Total Surveys Completed
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{total}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                Average Age
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{avgAge}</Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Oldest Person
              </Typography>
              <Typography variant="h6">{oldest}</Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Youngest Person
              </Typography>
              <Typography variant="h6">{youngest}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Average "Like to Eat Out" Rating
              </Typography>
              <Typography variant="h6">{eatOutAvg} / 5</Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
            Food Preferences (%)
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            {foodOptions.map(food => (
              <Grid item xs={12} sm={6} md={3} key={food}>
                <Typography variant="body2" color="text.secondary">{food}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={foodPercentages[food] === '-' ? 0 : Number(foodPercentages[food])}
                    sx={{ flex: 1, height: 8, borderRadius: 5, mr: 1 }}
                  />
                  <Typography variant="body2" sx={{ minWidth: 40 }}>
                    {foodPercentages[food]}%
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
            "Like to Eat Out" Ratings (%)
          </Typography>
          <Grid container spacing={2}>
            {ratingLabels.map(label => (
              <Grid item xs={12} sm={6} md={2.4} key={label}>
                <Typography variant="body2" color="text.secondary">{label}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={eatOutRatingPercentages[label] === '-' ? 0 : Number(eatOutRatingPercentages[label])}
                    sx={{ flex: 1, height: 8, borderRadius: 5, mr: 1 }}
                  />
                  <Typography variant="body2" sx={{ minWidth: 40 }}>
                    {eatOutRatingPercentages[label]}%
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
