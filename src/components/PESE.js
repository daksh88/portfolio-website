import React, { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';

function PESE() {
  const [videoHovered, setVideoHovered] = useState({ left: false, right: false });

  return (
    <Box sx={{ 
      minHeight: '100vh',
      pt: '64px',
      backgroundColor: '#0a192f',
      position: 'relative'
    }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography 
          variant="h3" 
          sx={{ 
            mb: 6,
            color: '#00ff9f',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            textAlign: 'center'
          }}
        >
          Introductory Video
        </Typography>
        
        <Box sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* Left Video */}
          <Box
            component="video"
            controls
            sx={{
              width: { xs: '100%', md: '45%' },
              height: 'auto',
              borderRadius: '10px',
              border: '1px solid rgba(0, 255, 159, 0.2)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)'
              }
            }}
          >
            <source src={`${process.env.PUBLIC_URL}/videos/Sixer.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </Box>

          {/* Right Video */}
          <Box
            component="video"
            controls
            sx={{
              width: { xs: '100%', md: '45%' },
              height: 'auto',
              borderRadius: '10px',
              border: '1px solid rgba(0, 255, 159, 0.2)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)'
              }
            }}
          >
            <source src={`${process.env.PUBLIC_URL}/videos/Fiver.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </Box>
        </Box>

        {/* Week 1 Section */}
        <Box sx={{ 
          mt: 8,
          p: 4,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '10px',
          border: '1px solid rgba(0, 255, 159, 0.2)'
        }}>
          <Typography 
            variant="h4" 
            sx={{ 
              color: '#00ff9f',
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
              textAlign: 'center',
              mb: 3
            }}
          >
            Week 1
          </Typography>
          
          <Typography 
            variant="h5" 
            sx={{ 
              color: '#00ff9f',
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
              mb: 2,
              textAlign: 'center'
            }}
          >
             Sixer Method for Self-Introduction
          </Typography>

          <Typography 
            variant="body1" 
            sx={{ 
              color: '#8892b0',
              fontSize: { xs: '1rem', sm: '1.1rem' },
              lineHeight: 1.7,
              textAlign: 'justify'
            }}
          >
            {/* Add your key learning points here */}
            This week, I learned the Sixer Method, a structured way to introduce myself effectively. It includes six key points:<br></br>
            <br></br>
              Name – Introducing myself with my full name.<br></br>
              Residing in – Mentioning my current place of residence.<br></br>
              Education – Briefly stating my academic background.<br></br>
              Internships/Projects – Highlighting relevant experiences and projects.<br></br>
              Hobbies – Sharing interests that define me beyond academics.<br></br>
              Career Objective – Expressing my long-term professional goals.
          </Typography>
        </Box>

        {/* Week 2 Section */}
        <Box sx={{ 
          mt: 8,
          p: 4,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '10px',
          border: '1px solid rgba(0, 255, 159, 0.2)'
        }}>
          <Typography 
            variant="h4" 
            sx={{ 
              color: '#00ff9f',
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
              textAlign: 'center',
              mb: 3
            }}
          >
            Week 2
          </Typography>
          
          <Typography 
            variant="h5" 
            sx={{ 
              color: '#00ff9f',
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
              mb: 2,
              textAlign: 'center'
            }}
          >
            Fiver Rule for Self-Introduction
          </Typography>

          <Typography 
            variant="body1" 
            sx={{ 
              color: '#8892b0',
              fontSize: { xs: '1rem', sm: '1.1rem' },
              lineHeight: 1.7,
              textAlign: 'justify'
            }}
          >
            {/* Add your Week 2 learning points here */}
            This week, I learned the Fiver Rule, another technique for introducing myself in a structured manner. It consists of five essential elements:
            <br></br>
            <br></br>
            Name – Stating my full name.<br></br>
            Residing in – Mentioning my current location.<br></br>
            Education – Briefly describing my academic journey.<br></br>
            Family – Providing a short insight into my family background.<br></br>
            Goal – Sharing my ultimate career or life goal.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default PESE;