import React from 'react';
import { AppBar, Toolbar, Typography, Button, useTheme, useMediaQuery, Box } from '@mui/material';

export default function Header({ setView, currentView }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          px: isMobile ? 1 : 2,
          py: isMobile ? 1 : 0,
        }}
      >
        <Typography
          variant={isMobile ? 'subtitle1' : 'h6'}
          sx={{
            color: '#000',
            fontWeight: 'bold',
            mb: isMobile ? 1 : 0,
            fontSize: isMobile ? '1.1rem' : undefined,
          }}
        >
          _ Surveys
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 1 : 0,
            width: isMobile ? '100%' : 'auto',
          }}
        >
          <Button
            color="inherit"
            fullWidth={isMobile}
            onClick={() => setView('form')}
            sx={{
              color: currentView === 'form' ? '#fff' : '#000',
              backgroundColor: currentView === 'form' ? '#87CEEB' : 'transparent',
              borderRadius: isMobile ? 2 : '6px 6px 0 0',
              margin: isMobile ? '0 0 4px 0' : '0 8px',
              fontWeight: currentView === 'form' ? 'bold' : 'normal',
              fontSize: isMobile ? '0.95rem' : '1rem',
              boxShadow: currentView === 'form' ? '0 2px 8px rgba(135,206,235,0.15)' : 'none',
              px: isMobile ? 1 : 2,
              py: isMobile ? 1.2 : 1,
              '&:hover': {
                backgroundColor: '#87CEEB',
                color: '#fff',
              },
              transition: 'all 0.2s',
            }}
          >
            FILL OUT SURVEY
          </Button>
          <Button
            color="inherit"
            fullWidth={isMobile}
            onClick={() => setView('results')}
            sx={{
              color: currentView === 'results' ? '#fff' : '#000',
              backgroundColor: currentView === 'results' ? '#87CEEB' : 'transparent',
              borderRadius: isMobile ? 2 : '6px 6px 0 0',
              margin: isMobile ? 0 : '0 8px',
              fontWeight: currentView === 'results' ? 'bold' : 'normal',
              fontSize: isMobile ? '0.95rem' : '1rem',
              boxShadow: currentView === 'results' ? '0 2px 8px rgba(135,206,235,0.15)' : 'none',
              px: isMobile ? 1 : 2,
              py: isMobile ? 1.2 : 1,
              '&:hover': {
                backgroundColor: '#87CEEB',
                color: '#fff',
              },
              transition: 'all 0.2s',
            }}
          >
            VIEW SURVEY RESULTS
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
