import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useScrollTrigger, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import MenuIcon from '@mui/icons-material/Menu';

// Update the navigation items array
const navItems = [
  { title: 'Home', path: '/' },
  { title: 'About', path: '/about' },  // Changed from AIESEC to About
  { title: 'PESE', path: '/pese' },
  { title: 'Contact', path: '/contact' }  // Add this item
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about'];  // Changed from 'aiesec' to 'about'
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkStyle = {
    my: 2,
    color: 'white',
    display: 'block',
    '&:hover': {
      backgroundColor: 'rgba(0, 255, 159, 0.1)',
      transform: 'scale(1.05)',
      transition: '0.3s'
    }
  };

  const handleDrawerToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <AppBar position="fixed" sx={{
      background: 'linear-gradient(90deg, rgba(75, 0, 130, 0.95) 0%, rgba(138, 43, 226, 0.95) 100%)',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
      transition: '0.3s ease-in-out'
    }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: "'Fira Code', monospace", color: '#00ff9f' }}>
          <CodeIcon sx={{ mr: 1 }} />
          Portfolio
        </Typography>
        <IconButton edge="end" color="inherit" onClick={() => setMobileMenuOpen(true)} sx={{ display: { xs: 'block', md: 'none' } }}>
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
          <Button component={Link} to="/" sx={linkStyle}>Home</Button>
          <Button component={Link} to="/about" sx={linkStyle}>About</Button>
          <Button component={Link} to="/pese" sx={linkStyle}>PESE</Button>
          <Button component={Link} to="/contact" sx={linkStyle}>Contact</Button>
        </Box>
      </Toolbar>
      <Drawer anchor="right" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <List>
          <ListItem button component={Link} to="/" onClick={handleDrawerToggle}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/about" onClick={handleDrawerToggle}>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button component={Link} to="/pese" onClick={handleDrawerToggle}>
            <ListItemText primary="PESE" />
          </ListItem>
          <ListItem button component={Link} to="/contact" onClick={handleDrawerToggle}>
            <ListItemText primary="Contact" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
