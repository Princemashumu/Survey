import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box,
  useTheme, useMediaQuery, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header({ setView, currentView }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleTabClick = (tab) => {
    setView(tab);
    setDrawerOpen(false);
  };

  const tabList = [
    { label: 'FILL OUT SURVEY', value: 'form' },
    { label: 'VIEW SURVEY RESULTS', value: 'results' }
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          flexDirection: isMobile ? 'row' : 'row',
          alignItems: 'center',
          px: isMobile ? 1 : 2,
          py: isMobile ? 1 : 0,
        }}
      >
        <Typography
          variant={isMobile ? 'subtitle1' : 'h6'}
          sx={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: isMobile ? '1.1rem' : undefined,
          }}
        >
          _ Surveys
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="black"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              <Box sx={{ width: 220 }}>
                <List>
                  {tabList.map(tab => (
                    <ListItem key={tab.value} disablePadding>
                      <ListItemButton
                        selected={currentView === tab.value}
                        onClick={() => handleTabClick(tab.value)}
                        sx={{
                          backgroundColor: currentView === tab.value ? '#87CEEB' : 'transparent',
                          color: currentView === tab.value ? '#fff' : '#000',
                          fontWeight: currentView === tab.value ? 'bold' : 'normal',
                        }}
                      >
                        <ListItemText primary={tab.label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 0,
              borderBottom: '1px solid #e0e0e0',
            }}
          >
            {tabList.map(tab => (
              <Button
                key={tab.value}
                color="inherit"
                onClick={() => setView(tab.value)}
                sx={{
                  color: currentView === tab.value ? '#fff' : '#000',
                  backgroundColor: currentView === tab.value ? '#87CEEB' : 'transparent',
                  borderRadius: '6px 6px 0 0',
                  margin: '0 8px',
                  fontWeight: currentView === tab.value ? 'bold' : 'normal',
                  fontSize: '1rem',
                  boxShadow: currentView === tab.value ? '0 2px 8px rgba(135,206,235,0.15)' : 'none',
                  px: 2,
                  py: 1,
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: currentView === tab.value ? '#87CEEB' : '#e3f4fb',
                    color: currentView === tab.value ? 'black' : '#000',
                  }
                }}
              >
                {tab.label}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
