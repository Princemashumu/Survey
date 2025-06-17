import React from 'react';
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, Radio, FormHelperText, Box } from '@mui/material';

const questions = [
  { key: 'movies', text: 'I like to watch movies' },
  { key: 'radio', text: 'I like to listen to radio' },
  { key: 'eatOut', text: 'I like to eat out' },
  { key: 'tv', text: 'I like to watch TV' }
];
const ratings = ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'];

export default function SurveyRatings({ data, errors, handleRating }) {
  return (
    <>
      <Typography sx={{ mt: 4 }}>
        Please rate your level of agreement on a scale of 1 to 5 ,with 1 being strongly agree and 5 being strongly disagree.
      </Typography>
      <Box sx={{ width: '100%', overflowX: 'auto', mt: 2 }}>
        <Table sx={{ width: '100%'}}>
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
                <TableCell>
                  {q.text}
                  {errors.responses && errors.responses[q.key] && (
                    <FormHelperText error>{errors.responses[q.key]}</FormHelperText>
                  )}
                </TableCell>
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
      </Box>
    </>
  );
}