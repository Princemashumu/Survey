import React from 'react';
import { Typography, FormGroup, FormControlLabel, Checkbox, TextField, Box } from '@mui/material';

const foodOptions = ['Pizza', 'Pasta', 'Pap and Wors', 'Other'];

export default function SurveyFoodOptions({ data, handleFoodToggle, handleOtherFoodChange }) {
  const isOtherChecked = data.food.includes('Other');

  return (
    <>
      <Typography sx={{ mt: 3 }}>What is your favorite food?</Typography>
      <FormGroup
        row
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1, sm: 2 },
          width: '100%',
        }}
      >
        {foodOptions.map(food => (
          <FormControlLabel
            key={food}
            control={
              <Checkbox
                checked={data.food.includes(food)}
                onChange={() => handleFoodToggle(food)}
              />
            }
            label={food}
          />
        ))}
        {isOtherChecked && (
          <Box sx={{ mt: { xs: 1, sm: 0 }, ml: { sm: 2 } }}>
            <TextField
              label="Please specify"
              size="small"
              value={data.otherFood || ''}
              onChange={e => handleOtherFoodChange(e.target.value)}
            />
          </Box>
        )}
      </FormGroup>
    </>
  );
}