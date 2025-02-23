import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import PESE from './components/PESE';
import Contact from './components/Contact';  // Add this import
import { Box } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff9f',
    },
    secondary: {
      main: '#ff0266',
    },
    background: {
      default: '#0a192f',
      paper: '#112240',
    },
    text: {
      primary: '#e6f1ff',
      secondary: '#8892b0',
    },
  },
  typography: {
    fontFamily: "'Fira Code', 'Roboto Mono', monospace",
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.5px',
    },
    h5: {
      fontFamily: "'Roboto Mono', monospace",
      fontWeight: 400,
    },
    body1: {
      fontSize: '1.1rem',
      letterSpacing: '-0.5px',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#112240',
          borderRadius: '8px',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 30px -15px rgba(0, 255, 159, 0.2)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          textTransform: 'none',
          fontSize: '1rem',
          fontFamily: "'Fira Code', 'Roboto Mono', monospace",
          '&:hover': {
            backgroundColor: 'rgba(0, 255, 159, 0.1)',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Navbar />
        <Box>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/pese' element={<PESE />} />
            <Route path='/contact' element={<Contact />} />  {/* Add this route */}
          </Routes>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
