import React from 'react';
import { Container, Typography, Box, IconButton, Link as MuiLink } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const Contact = () => {
  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        paddingTop: '80px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'background.default'
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            py: 4
          }}
        >
          <Typography 
            variant="h3" 
            sx={{ 
              color: '#00ff9f',
              textAlign: 'center',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
            }}
          >
            Contact Me
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              p: 4,
              backgroundColor: 'rgba(17, 34, 64, 0.8)',
              borderRadius: 2,
              border: '1px solid rgba(0, 255, 159, 0.2)',
              width: '100%',
              maxWidth: 600
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              gap: 4,
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <MuiLink 
                href="https://www.linkedin.com/in/dakshnautiyal/" 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ 
                  color: '#00ff9f',
                  '&:hover': { color: '#fff' }
                }}
              >
                <IconButton 
                  sx={{ 
                    color: 'inherit',
                    '&:hover': { backgroundColor: 'rgba(0, 255, 159, 0.1)' }
                  }}
                >
                  <LinkedInIcon sx={{ fontSize: { xs: 32, sm: 40 } }} />
                </IconButton>
              </MuiLink>
              <MuiLink 
                href="https://www.instagram.com/dakshnautiyal1/" 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ 
                  color: '#00ff9f',
                  '&:hover': { color: '#fff' }
                }}
              >
                <IconButton 
                  sx={{ 
                    color: 'inherit',
                    '&:hover': { backgroundColor: 'rgba(0, 255, 159, 0.1)' }
                  }}
                >
                  <InstagramIcon sx={{ fontSize: { xs: 32, sm: 40 } }} />
                </IconButton>
              </MuiLink>
              <MuiLink 
                href="https://github.com/daksh88" 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ 
                  color: '#00ff9f',
                  '&:hover': { color: '#fff' }
                }}
              >
                <IconButton 
                  sx={{ 
                    color: 'inherit',
                    '&:hover': { backgroundColor: 'rgba(0, 255, 159, 0.1)' }
                  }}
                >
                  <GitHubIcon sx={{ fontSize: { xs: 32, sm: 40 } }} />
                </IconButton>
              </MuiLink>
            </Box>

            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              gap: 3
            }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                color: '#00ff9f'
              }}>
                <EmailIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
                <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>
                  <MuiLink 
                    href="mailto:dakshnautiyal88@gmail.com"
                    sx={{ 
                      color: 'inherit',
                      textDecoration: 'none',
                      '&:hover': { color: '#fff' }
                    }}
                  >
                    dakshnautiyal88@gmail.com
                  </MuiLink>
                </Typography>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: 2,
                color: '#00ff9f'
              }}>
                <PhoneIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
                <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>
                  <MuiLink 
                    href="tel:+918445603923"
                    sx={{ 
                      color: 'inherit',
                      textDecoration: 'none',
                      '&:hover': { color: '#fff' }
                    }}
                  >
                    +91 8445603923
                  </MuiLink>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;