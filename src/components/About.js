import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const About = () => {
  return (
    <Box 
      id="about" 
      sx={{ 
        paddingTop: '80px', // Add padding to account for navbar height
        minHeight: '100vh'  // Ensure full viewport height
      }}
    >
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography 
            variant="h3" 
            gutterBottom
            sx={{
              color: '#00ff9f',
              textAlign: 'center',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
            }}
          >
            About Me
          </Typography>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3,
              backgroundColor: 'rgba(17, 34, 64, 0.8)',
              border: '1px solid rgba(0, 255, 159, 0.2)'
            }}
          >
            <Typography 
              paragraph
              sx={{ 
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                color: '#e6f1ff'
              }}
            >
              I’m Daksh Nautiyal, a 3rd-year B.Tech CSE student at Graphic Era Hill
               University, deeply passionate about tech and development. My skills 
               include frontend development with JavaScript, React, and responsive 
               web design, along with a strong foundation in C, C++, and Java. I 
               love building projects from scratch, like my portfolio website, which 
               showcases my work, certificates, and AIESEC journey with sleek transitions 
               and a modern design. My development journey isn't just limited to frontend—I’ve 
               also explored backend development with Node.js and want to master it completely. 
               I’ve worked on some exciting projects, including an Air Draw application using 
               OpenCV and Mediapipe, where I optimized the drawing functionality for better 
               control, and a Text-to-Speech & Speech-to-Text translator built with Python 
               and Google APIs. In e-commerce, I first built a React-based website with a 
               server.js backend, skipping MongoDB, and also experimented with WordPress, 
               where I manually implemented product cards and later added an ‘Add to Cart’ 
               button. Currently, I’m a Web Development Intern at Digital Nomadians, a
                marketing agency focused on SEO and social media marketing. My team there 
                is quite a mix—there’s a hilarious guy who always does something funny, a
                 coder, an SEO specialist, a social media expert, and an intern who barely 
                 shows up.
            </Typography>
            <Typography 
              paragraph
              sx={{ 
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                color: '#e6f1ff'
              }}
            >
              Beyond tech, my AIESEC journey has been nothing short of a rollercoaster. 
              It all started when I became an Organizing Committee Member for Global 
              Village 2023, followed by Global Goal Runs 2023. From there, I stepped into 
              leadership roles, becoming Core Committee Vice President for Partnership 
              Development and Creatives at Youth Speak Forum 2024, and later, Core Committee 
              President for Global Village 2024. Alongside these, I held multiple Senior Manager
               roles, first in Business Development, then in Incoming Global Volunteer Customer
                Experience, and once again in Business Development. My journey in AIESEC taught
                 me a lot about leadership, networking, and handling high-pressure situations 
                 while working with diverse teams. It’s been an incredible experience that 
                 shaped my personality, giving me confidence in both professional and personal
                  spaces.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
