import React, { useEffect, useRef, useState, Suspense, useMemo } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Paper, Button, IconButton, Link as MuiLink, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import GitHubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
import { motion, AnimatePresence } from 'framer-motion';


const CardMedia = React.lazy(() => import('@mui/material/CardMedia'));

const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// 2. Use React.memo for static components
const LoadingPlaceholder = React.memo(() => (
  <Box sx={{ height: 200, bgcolor: 'rgba(0, 0, 0, 0.5)' }} />
));

class Particle {
  constructor(canvas) {
    this.characters = "01";
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.fontSize = 10;
    this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
    this.speed = 0.5;
  }

  draw(ctx) {
    ctx.fillStyle = '#00ff9f10';
    ctx.font = this.fontSize + 'px monospace';
    ctx.fillText(this.text, this.x, this.y);
  }

  update(canvasHeight, canvasWidth) {
    if (this.y > canvasHeight) {
      this.y = 0;
      this.x = Math.random() * canvasWidth;
    }
    this.y += this.speed;
  }
}

function Home() {
  const [projectStartIndex, setProjectStartIndex] = useState(0);
  const [certStartIndex, setCertStartIndex] = useState(0);
  const [aiesecIndex, setAiesecIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuredStartIndex, setFeaturedStartIndex] = useState(0);
  const canvasRef = useRef(null);
  const autoPlayRef = useRef();
  const [videoHovered, setVideoHovered] = useState({ left: false, right: false });

  // 1. Optimize image loading and reduce re-renders
  const [images, setImages] = useState({
    featured: [],
    aiesec: [],
    projects: [],
    certificates: []
  });

  useEffect(() => {
    autoPlayRef.current = () => {
      if (isAutoPlaying) {
        setAiesecIndex((prev) => (prev + 1) % aiesecImages.length);
      }
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      try {
        autoPlayRef.current();
      } catch (error) {
        console.error('Error in autoplay:', error);
      }
    }, 3000);

    return () => {
      clearInterval(interval); // Clear interval on unmount
    };
  }, [isAutoPlaying]);

  const handlePrevClick = (type) => {
    if (type === 'certificates') {
      setCertStartIndex((prev) => (prev - 3 + certificates.length) % certificates.length);
    } else if (type === 'projects') {
      setProjectStartIndex((prev) => (prev - 3 + projects.length) % projects.length);
    } else if (type === 'aiesec') {
      setAiesecIndex((prev) => (prev - 1 + aiesecImages.length) % aiesecImages.length);
    } else if (type === 'featured') {
      setFeaturedStartIndex((prev) => 
        (prev - 1 + featuredItems.length) % featuredItems.length
      );
    }
  };

  const handleNextClick = (type) => {
    if (type === 'certificates') {
      setCertStartIndex((prev) => (prev + 3) % certificates.length);
    } else if (type === 'projects') {
      setProjectStartIndex((prev) => (prev + 3) % projects.length);
    } else if (type === 'aiesec') {
      setAiesecIndex((prev) => (prev + 1) % aiesecImages.length);
    } else if (type === 'featured') {
      setFeaturedStartIndex((prev) => 
        (prev + 1) % featuredItems.length
      );
    }
  };

  // Update the getVisibleItems function for featured section
  const getVisibleItems = (items, startIdx, type) => {
    if (type === 'featured') {
      return [
        items[startIdx],
        items[(startIdx + 1) % items.length]
      ]; // Return two items for featured section
    }
    // Original logic for other sections
    const visibleItems = [];
    for (let i = 0; i < 3; i++) {
      const index = (startIdx + i) % items.length;
      visibleItems.push(items[index]);
    }
    return visibleItems;
  };

  // 3. Optimize useEffect for canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Create particles after canvas size is set
    const particles = new Array(25).fill(null).map(() => new Particle(canvas));

    let animationFrameId;
    let isActive = true;

    const animate = () => {
      if (!isActive) return;

      ctx.fillStyle = 'rgba(10, 25, 47, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.draw(ctx);
        particle.update(canvas.height, canvas.width);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      isActive = false;
      window.removeEventListener('resize', setCanvasSize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // 4. Optimize image preloading
  const preloadImages = async () => {
    const imagesToPreload = [
      ...featuredItems.map(item => item.image),
      ...projects.slice(0, 3).map(project => project.image),
      ...certificates.slice(0, 3).map(cert => cert.image)
    ];

    try {
      await Promise.all(
        imagesToPreload.map(src => preloadImage(src))
      );
    } catch (error) {
      console.error('Error preloading images:', error);
    }
  };

  useEffect(() => {
    preloadImages();
  }, []);

  const projects = [
    {
      title: 'Motion Gesture Volume Controller',
      description: 'It can control the volume of the system using the movement of index finger and thumb and its a AI based model.',
      image: `${process.env.PUBLIC_URL}/logo512.png`,
      icon: <CodeIcon sx={{ color: '#00ff9f', fontSize: '2rem' }} />,
      link: 'https://github.com/daksh88/Motion-Gesture-Volume-Controller'
    },
    {
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website built with React and Material-UI. Features smooth animations and dynamic content.',
      image: `${process.env.PUBLIC_URL}/logo512.png`,
      icon: <CodeIcon sx={{ color: '#00ff9f', fontSize: '2rem' }} />,
      link: 'https://github.com/daksh88/portfolio-website'
    },
    {
      title: 'Drum Machine',
      description: 'An interactive drum machine web application with customizable sound kits and recording functionality.',
      image: `${process.env.PUBLIC_URL}/logo512.png`,
      icon: <CodeIcon sx={{ color: '#00ff9f', fontSize: '2rem' }} />,
      link: 'https://github.com/daksh88/drum-machine'
    },
    {
      title: 'Random Quote Generator',
      description: 'A web application that displays inspirational quotes randomly. Features social media sharing and dynamic background colors.',
      image: `${process.env.PUBLIC_URL}/logo512.png`,
      icon: <CodeIcon sx={{ color: '#00ff9f', fontSize: '2rem' }} />,
      link: 'https://github.com/daksh88/random-quote-generator'
    },
    {
      title: 'Ecommerce Website',
      description: 'A full-featured ecommerce platform with product catalog, shopping cart, and secure checkout functionality. Built with React and integrated with a backend API.',
      image: `${process.env.PUBLIC_URL}/logo512.png`,
      icon: <StorageIcon sx={{ color: '#00ff9f', fontSize: '2rem' }} />,
      link: 'https://github.com/daksh88/ecommerce-website'
    }
  ];

  const certificates = [
    {
      title: 'Responsive Web Design',
      description: 'Mastery in HTML5, CSS3, and responsive design principles. Creating adaptive layouts and mobile-first websites.',
      image: `${process.env.PUBLIC_URL}/certificate1.png`
    },
    {
      title: 'Frontend Development Libraries',
      description: 'Proficiency in React, Bootstrap, jQuery, and SASS. Building dynamic user interfaces with modern frameworks.',
      image: `${process.env.PUBLIC_URL}/certificate2.png`
    },
    {
      title: 'Javascript Algorithm and Data Structures',
      description: 'Advanced JavaScript concepts, ES6+, algorithms, and data structures for efficient problem-solving.',
      image: `${process.env.PUBLIC_URL}/certificate3.png`
    },
    {
      title: 'Programming in Java',
      description: 'Core Java programming, OOP concepts, collections framework, and multithreading fundamentals.',
      image: `${process.env.PUBLIC_URL}/certificate4.png`
    },
    {
      title: 'Introduction to Networks',
      description: 'Understanding network protocols, TCP/IP, routing, and network security fundamentals.',
      image: `${process.env.PUBLIC_URL}/certificate5.png`
    },
    {
      title: 'Android Development',
      description: 'Building native Android applications using Java, Android SDK, and Material Design principles.',
      image: `${process.env.PUBLIC_URL}/certificate6.png`
    }
  ];

  const [aiesecImages, setAiesecImages] = useState([
   {
      image: `${process.env.PUBLIC_URL}/slide1.jpg`,
      alt: 'AIESEC Experience 1',
      description: 'Global Goal Runs'
    }, 
    {
      image: `${process.env.PUBLIC_URL}/slide2.jpg`,
      alt: 'AIESEC Experience 2',
      description: 'Trekkers Local Conference'
    },
    {
      image: `${process.env.PUBLIC_URL}/slide3.jpg`,
      alt: 'AIESEC Experience 3',
      description: 'Global Village 2023'
    },
    {
      image: `${process.env.PUBLIC_URL}/slide4.jpg`,
      alt: 'AIESEC Experience 4',
      description: 'Global Goal Runs'
    },
    {
      image: `${process.env.PUBLIC_URL}/slide5.jpg`,
      alt: 'AIESEC Experience 5',
      description: 'Global Village 2024'
    },
    {
      image: `${process.env.PUBLIC_URL}/slide6.jpg`,
      alt: 'AIESEC Experience 6',
      description: 'Trekkers Local Conference'
    }, 
    {
      image: `${process.env.PUBLIC_URL}/slide7.jpg`,
      alt: 'AIESEC Experience 7',
      description: 'IGV MB 2024'
    }, 
    {
      image: `${process.env.PUBLIC_URL}/slide8.jpg`,
      alt: 'AIESEC Experience 8',
      description: 'Global Village OC 2023'
    }, 
    {
      image: `${process.env.PUBLIC_URL}/slide9.jpg`,
      alt: 'AIESEC Experience 9',
      description: 'Global Village 2023'
    }, 
    {
      image: `${process.env.PUBLIC_URL}/slide10.jpg`,
      alt: 'AIESEC Experience 10',
      description: 'Management Body Meet 2023'
    }, 
    {
      image: `${process.env.PUBLIC_URL}/slide11.jpg`,
      alt: 'AIESEC Experience 11',
      description: 'GGR 2023 Recognition'
    }, 
    {
      image: `${process.env.PUBLIC_URL}/slide12.jpg`,
      alt: 'AIESEC Experience 12',
      description: 'Business Development Manager 2023'
    }, 
    {
      image: `${process.env.PUBLIC_URL}/slide14.jpg`,
      alt: 'AIESEC Experience 14',
      description: 'MB Andaaz 2023'
    }, 
    {
      image: `${process.env.PUBLIC_URL}/slide15.jpg`,
      alt: 'AIESEC Experience 15',
      description: 'IGV CX Manager 2024'
    }, 
    {
      image: `${process.env.PUBLIC_URL}/slide16.jpg`,
      alt: 'AIESEC Experience 16',
      description: 'GV 2024 EB x CC'
    }, 
    {
      image: `${process.env.PUBLIC_URL}/slide17.jpg`,
      alt: 'AIESEC Experience 17',
      description: 'GV 2024 EBC x CC'
    }, 
    {
      image: `${process.env.PUBLIC_URL}/slide18.jpg`,
      alt: 'AIESEC Experience 18',
      description: 'GV 2024 CCP x Interns'
    }, 
    {
      image: `${process.env.PUBLIC_URL}/slide19.jpg`,
      alt: 'AIESEC Experience 19',
      description: 'Business Development Manager 2024'
    },    {
      image: `${process.env.PUBLIC_URL}/slide20.jpg`,
      alt: 'AIESEC Experience 20',
      description: 'Balkalaakar 2024'
    }, 
    {
      image: `${process.env.PUBLIC_URL}/slide21.jpg`,
      alt: 'AIESEC Experience 21',
      description: 'Global Village OC 2024'
    }
  ]);
  const [currentAiesecIndex, setCurrentAiesecIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAutoPlaying) {
        setCurrentAiesecIndex((prevIndex) => (prevIndex + 1) % aiesecImages.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  useEffect(() => {
    // Preload the next image
    const preloadNextImage = async () => {
      const nextIndex = (currentAiesecIndex + 1) % aiesecImages.length;
      try {
        await preloadImage(aiesecImages[nextIndex].image);
      } catch (error) {
        console.error('Error preloading image:', error);
      }
    };

    preloadNextImage();
  }, [currentAiesecIndex, aiesecImages]);

  const currentAiesecImage = aiesecImages[currentAiesecIndex];

  // 5. Implement virtualization for long lists
  const visibleCertificates = useMemo(() => 
    certificates.slice(certStartIndex, certStartIndex + 3),
    [certStartIndex, certificates]
  );
  const totalSlides = Math.ceil(certificates.length / 3);

  const featuredItems = [
    {
      title: 'Core Committee President | Global Village 2024 - AIESEC in Dehradun',
      description: 'Leading the team behind Global Village 2024 was an incredible journey! As the Core Committee President, I had the opportunity to drive collaborations, manage operations, and ensure a seamless cultural exchange experience. From strategic planning to execution, it was all about teamwork, leadership, and creating an unforgettable event that celebrated diversity and global unity.',
      image: `${process.env.PUBLIC_URL}/slide5.jpg`,
      icon: <CodeIcon sx={{ color: '#00ff9f', fontSize: '2rem' }} />
    },
    {
      title: 'Best Performer of the Month at Digital Nomadians',
      description: 'Thrilled to be awarded Best Performer of the Month at Digital Nomadians! Grateful for the opportunity to contribute as a Web Development Intern and for the recognition from the team. Excited to keep learning, growing, and building impactful digital solutions! ',
      image: `${process.env.PUBLIC_URL}/molly testimonial.png`,
      icon: <CodeIcon sx={{ color: '#00ff9f', fontSize: '2rem' }} />
    },
  ];

  return (
    <Box>
      {/* Single Navbar */}
      <Box 
        component="nav"
        sx={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0, 255, 159, 0.2)',
          zIndex: 1000,
          height: '64px'
        }}
      >
        <Container>
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%'
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#00ff9f',
                fontFamily: "'Fira Code', monospace",
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              {'<DN />'}
            </Typography>

            {/* Desktop Menu */}
            <Box sx={{ 
              display: { xs: 'none', md: 'flex' },
              gap: 4
            }}>
              {['Home', 'About', 'Projects', 'Certificates', 'PESE', 'Contact'].map((item) => (
                <Button
                  key={item}
                  sx={{
                    color: '#00ff9f',
                    textTransform: 'none',
                    fontFamily: "'Fira Code', monospace",
                    '&:hover': {
                      backgroundColor: 'rgba(0, 255, 159, 0.1)'
                    }
                  }}
                  onClick={() => document.getElementById(item.toLowerCase()).scrollIntoView({ behavior: 'smooth' })}
                >
                  {item}
                </Button>
              ))}
            </Box>

            {/* Mobile Menu Icon */}
            <IconButton
              sx={{ 
                display: { xs: 'flex', md: 'none' },
                color: '#00ff9f'
              }}
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Container>
      </Box>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            width: 240,
            backgroundColor: 'rgba(0, 0, 0, 0.95)', // Darkened background
            backdropFilter: 'blur(10px)',
            borderLeft: '1px solid rgba(0, 255, 159, 0.2)'
          }
        }}
      >
        <List sx={{ pt: 2 }}>
          {['Home', 'About', 'Projects', 'Certificates', 'PESE', 'Contact'].map((item) => (
            <ListItem 
              button 
              key={item}
              onClick={() => {
                document.getElementById(item.toLowerCase()).scrollIntoView({ behavior: 'smooth' });
                setMobileMenuOpen(false);
              }}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(0, 255, 159, 0.1)'
                }
              }}
            >
              <ListItemText 
                primary={item} 
                sx={{ 
                  '.MuiListItemText-primary': {
                    fontFamily: "'Fira Code', monospace",
                    fontWeight: 500,
                    fontSize: '1.1rem',
                    color: '#00ff9f' // Changed to match the theme color
                  }
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ pt: '6px', pb: 0, px: 0 }}>
        {/* Home Section */}
        <Box id="home" sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          position: 'relative',
          overflow: 'hidden',
          pt: 8
        }}>
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 1,
              opacity: 0.5
            }}
          />
          <Container sx={{ 
            position: 'relative', 
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 4, md: 0 }
          }}>
            <Box sx={{ 
              flex: 1,
              pr: { md: 4 },
              textAlign: { xs: 'center', md: 'left' }
            }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: '#00ff9f',
                  fontFamily: "'Fira Code', monospace",
                  mb: 2,
                  fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' }
                }}
              >
                {'// Hello World, I am'}
              </Typography>
              <Typography 
                variant="h2" 
                component="h1" 
                sx={{ 
                  color: '#e6f1ff',
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  mb: 3,
                  fontWeight: 'bold'
                }}
              >
                {'<Daksh Nautiyal />'}
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontFamily: "'Fira Code', monospace",
                  color: '#8892b0',
                  fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
                  '& span': { color: '#00ff9f' }
                }}
              >
                const aboutMe = {'{'}
                <br />
                &nbsp;&nbsp;role: <span>"Computer Science Student"</span>,
                <br />
                &nbsp;&nbsp;passion: <span>"Developer"</span>
                <br />
                {'};'}
              </Typography>
            </Box>
            
            <Box sx={{ 
              position: 'relative',
              width: { xs: '280px', sm: '320px', md: '350px' },
              height: { xs: '320px', sm: '360px', md: '400px' },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '20px',
                left: '20px',
                right: '-20px',
                bottom: '-20px',
                border: '2px solid #00ff9f',
                borderRadius: '10px',
                zIndex: 0,
                transition: 'all 0.3s ease-in-out',
                animation: 'borderPulse 3s infinite'
              },
              '&:hover::before': {
                top: '10px',
                left: '10px',
                right: '-10px',
                bottom: '-10px',
                borderColor: '#8a2be2'
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(45deg, rgba(138, 43, 226, 0.2), rgba(0, 255, 159, 0.2))',
                borderRadius: '10px',
                zIndex: 2,
                opacity: 0.5,
                transition: 'opacity 0.3s ease-in-out',
                boxShadow: '0 0 20px rgba(0, 255, 159, 0.3)'
              },
              '&:hover::after': {
                opacity: 0.2,
              },
              '@keyframes borderPulse': {
                '0%': {
                  boxShadow: '0 0 10px rgba(0, 255, 159, 0.2)',
                },
                '50%': {
                  boxShadow: '0 0 20px rgba(0, 255, 159, 0.4)',
                },
                '100%': {
                  boxShadow: '0 0 10px rgba(0, 255, 159, 0.2)',
                },
              }
            }}>
              <Box
                component="img"
                src={`${process.env.PUBLIC_URL}/IMG_20250128_154947.jpg`}
                alt="Profile"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'relative',
                  zIndex: 1,
                  borderRadius: '10px',
                  filter: 'contrast(1.1) brightness(1.1)',
                  transition: 'all 0.5s ease-in-out',
                  boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.5)',
                  '&:hover': {
                    transform: 'scale(1.02) translateY(-5px)',
                    boxShadow: '0 20px 40px -20px rgba(0, 0, 0, 0.7)',
                    filter: 'contrast(1.2) brightness(1.1)',
                  }
                }}
              />
            </Box>
          </Container>
        </Box>

        {/* About Section */}
        <Box id="about" sx={{ 
          minHeight: '80vh', 
          py: 2, 
          mt: 2, 
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'radial-gradient(rgba(0, 255, 159, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            opacity: 0.5,
            pointerEvents: 'none'
          }
        }}>
          <Container sx={{ position: 'relative', zIndex: 2, mt: 2 }}>
            <Typography variant="h3" gutterBottom sx={{ 
              color: '#00ff9f',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              textAlign: 'center'
            }}>
              {'// About Me'}
            </Typography>
            <Paper elevation={3} sx={{ 
              p: 3, 
              backgroundColor: 'rgba(17, 34, 64, 0.8)',
              border: '1px solid rgba(0, 255, 159, 0.2)'
            }}>
              <Typography paragraph sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}>
              Hey there! I'm Daksh Nautiyal, a B.Tech CSE student passionate about web development, artificial intelligence, and business growth. I have a strong foundation in frontend development (React.js, JavaScript, CSS, and more) and a growing interest in backend technologies and AI-driven solutions.
              <br></br>
              <br></br>
              Beyond tech, I’ve honed my business development and leadership skills through my journey at AIESEC, where I worked as the Senior Manager for Business Development and led high-impact initiatives. I also organized large-scale events like Global Village 2024 as the Core Committee President. Currently, I’m a Web Development Intern at Digital Nomadians, where I work on crafting impactful digital solutions.
              </Typography>
            </Paper>
          </Container>
        </Box>

        {/* Featured Section */}
        <Box id="featured" sx={{ 
          mt: 8, 
          mb: 8,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, rgba(0, 255, 159, 0.1) 0%, transparent 70%)',
            zIndex: 0
          }
        }}>
          <Typography 
            variant="h3" 
            gutterBottom 
            sx={{ 
              textAlign: 'center', 
              color: '#00ff9f',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              position: 'relative',
              '&::after': {
                content: '""',
                display: 'block',
                width: '60px',
                height: '4px',
                background: 'linear-gradient(90deg, #00ff9f, #8a2be2)',
                margin: '20px auto',
                borderRadius: '2px'
              }
            }}
          >
            Achievements & Recognition
          </Typography>
          <Grid container spacing={4} sx={{ 
            mt: 2, 
            px: { xs: 2, sm: 3, md: 4 }, 
            position: 'relative',
            justifyContent: 'center'
          }}>
            {getVisibleItems(featuredItems, featuredStartIndex, 'featured').map((item, index) => (
              <Grid item xs={12} md={6} key={index} sx={{ 
                maxWidth: '500px',
                width: '100%',
                mx: 'auto' 
              }}>
                <Card sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0, 255, 159, 0.2)',
                  borderRadius: '16px',
                  transition: 'all 0.4s ease-in-out',
                  transform: 'translateY(0)',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 20px 40px rgba(0, 255, 159, 0.2)',
                    '& .MuiCardMedia-root': {
                      transform: 'scale(1.05)',
                      filter: 'brightness(1.2)'
                    }
                  }
                }}>
                  <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    <Suspense fallback={<LoadingPlaceholder />}>
                      <CardMedia
                        component="img"
                        image={item.image}
                        alt={item.title}
                        loading="lazy"
                        sx={{
                          height: { xs: 250, sm: 350 }, // Reduced height to maintain aspect ratio
                          objectFit: 'cover',
                          transition: 'all 0.5s ease-in-out',
                          filter: 'brightness(0.9)',
                        }}
                      />
                    </Suspense>
                    <Box sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.8) 100%)'
                    }} />
                  </Box>
                  <CardContent sx={{ 
                    flexGrow: 1, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 2,
                    p: 3
                  }}>
                    <Typography variant="h5" sx={{ 
                      color: '#00ff9f',
                      fontSize: { xs: '1.2rem', sm: '1.4rem' },
                      fontWeight: 600,
                      lineHeight: 1.4
                    }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body1" sx={{
                      color: '#e6f1ff',
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      lineHeight: 1.6
                    }}>
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: 4,
            gap: 2
          }}>
            <Button 
              onClick={() => handlePrevClick('featured')}
              sx={{ 
                color: '#00ff9f',
                borderColor: '#00ff9f',
                px: 4,
                py: 1,
                borderRadius: '8px',
                '&:hover': { 
                  backgroundColor: 'rgba(0, 255, 159, 0.1)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
              variant="outlined"
            >
              Previous
            </Button>
            <Button 
              onClick={() => handleNextClick('featured')}
              sx={{ 
                color: '#00ff9f',
                borderColor: '#00ff9f',
                px: 4,
                py: 1,
                borderRadius: '8px',
                '&:hover': { 
                  backgroundColor: 'rgba(0, 255, 159, 0.1)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
              variant="outlined"
            >
              Next
            </Button>
          </Box>
        </Box>

        {/* Projects Section */}
        <Box id="projects" sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h3" gutterBottom sx={{ 
            textAlign: 'center', 
            color: '#00ff9f',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
          }}>
            Mini Projects
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2, px: { xs: 2, sm: 3, md: 4 } }}>
            {getVisibleItems(projects, projectStartIndex).map((project, index) => (
              <Grid item xs={12} sm={12} md={4} key={index}>
                <Card sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0, 255, 159, 0.2)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 0 20px rgba(0, 255, 159, 0.3)',
                    '& .MuiCardMedia-root': {
                      filter: 'brightness(1.1)'
                    }
                  }
                }}>
                  <Suspense fallback={<LoadingPlaceholder />}>
                    <CardMedia
                      component="img"
                      image={project.image}
                      alt={project.title}
                      loading="lazy"
                      sx={{
                        height: { xs: 200, sm: 250, md: 200 },
                        objectFit: 'contain',
                        padding: '2rem',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        transition: 'all 0.3s ease-in-out',
                        filter: 'brightness(0.9)',
                      }}
                    />
                  </Suspense>
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      {project.icon}
                      <Typography variant="h6" sx={{ 
                        color: '#00ff9f',
                        fontSize: { xs: '1.1rem', sm: '1.25rem' }
                      }}>
                        {project.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{
                      color: '#8892b0',
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}>
                      {project.description}
                    </Typography>
                    <Button
                      component="a"
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        mt: 'auto',
                        color: '#00ff9f',
                        borderColor: '#00ff9f',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 255, 159, 0.1)',
                          borderColor: '#00ff9f'
                        }
                      }}
                      variant="outlined"
                      startIcon={<GitHubIcon />}
                    >
                      View Code
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button 
              onClick={() => handlePrevClick('projects')}
              sx={{ 
                color: '#00ff9f',
                '&:hover': { backgroundColor: 'rgba(0, 255, 159, 0.1)' }
              }}
            >
              Previous
            </Button>
            <Button 
              onClick={() => handleNextClick('projects')}
              sx={{ 
                color: '#00ff9f',
                '&:hover': { backgroundColor: 'rgba(0, 255, 159, 0.1)' }
              }}
            >
              Next
            </Button>
          </Box>
        </Box>

        {/* Certificates Section */}
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h3" gutterBottom sx={{ 
            textAlign: 'center', 
            color: '#00ff9f',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
          }}>
            Certificates
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2, px: { xs: 2, sm: 3, md: 4 } }}>
            {visibleCertificates.map((cert, index) => (
              <Grid item xs={12} sm={12} md={4} key={index}>
                <Card sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0, 255, 159, 0.2)',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 0 20px rgba(0, 255, 159, 0.3)'
                  }
                }}>
                  <Suspense fallback={<LoadingPlaceholder />}>
                    <CardMedia
                      component="img"
                      image={cert.image}
                      alt={cert.title}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `${process.env.PUBLIC_URL}/logo512.png`;
                      }}
                      sx={{
                        height: { xs: 200, sm: 300, md: 200 },
                        objectFit: 'contain',
                        padding: '1rem',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)'
                      }}
                    />
                  </Suspense>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ 
                      color: '#00ff9f',
                      fontSize: { xs: '1.1rem', sm: '1.25rem' }
                    }}>
                      {cert.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}>
                      {cert.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button 
              onClick={() => handlePrevClick('certificates')}
              sx={{ 
                color: '#00ff9f',
                '&:hover': { backgroundColor: 'rgba(0, 255, 159, 0.1)' }
              }}
            >
              Previous
            </Button>
            <Button 
              onClick={() => handleNextClick('certificates')}
              sx={{ 
                color: '#00ff9f',
                '&:hover': { backgroundColor: 'rgba(0, 255, 159, 0.1)' }
              }}
            >
              Next
            </Button>
          </Box>
        </Box>

        {/* AIESEC Section */}
        <Box sx={{ 
          py: { xs: 4, md: 6 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', 
          textAlign: 'center'
        }}>
          <Typography 
            variant="h3" 
            sx={{ 
              mb: 2, 
              color: '#00ff9f'
            }}
          >
            AIESEC Experience
          </Typography>
          <Box sx={{ 
            width: '100%', 
            height: 'auto', 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, // Changed breakpoint from 'sm' to 'md'
            alignItems: 'center', 
            justifyContent: 'space-between', 
            px: { xs: 2, md: 4 } // Changed breakpoint from 'sm' to 'md'
          }}>
            <Box sx={{ 
              width: { xs: '100%', md: '60%' }, // Changed breakpoint from 'sm' to 'md'
              height: { xs: '400px', md: '400px' }, // Made mobile height consistent
              backgroundColor: 'black', 
              position: 'relative', 
              overflow: 'hidden',
              mb: { xs: 4, md: 0 } // Added margin bottom for mobile
            }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentAiesecIndex}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%'
                  }}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ 
                    type: "tween",
                    duration: 0.4,
                    ease: "easeInOut"
                  }}
                >
                  <Suspense fallback={
                    <Box sx={{ 
                      width: '100%', 
                      height: '100%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.7)'
                    }}>
                      <Typography sx={{ color: '#00ff9f' }}>Loading...</Typography>
                    </Box>
                  }>
                    <CardMedia
                      component="img"
                      image={aiesecImages[currentAiesecIndex].image}
                      alt={aiesecImages[currentAiesecIndex].alt}
                      loading="eager"
                      sx={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                        filter: 'none',
                        willChange: 'transform',
                      }}
                      onMouseEnter={() => setIsAutoPlaying(false)}
                      onMouseLeave={() => setIsAutoPlaying(true)}
                    />
                  </Suspense>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Box sx={{
                      position: 'absolute',
                      bottom: 16,
                      left: 16,
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      backdropFilter: 'blur(4px)',
                      color: '#00ff9f',
                      textAlign: 'center'
                    }}>
                      <Typography variant="subtitle1">
                        {aiesecImages[currentAiesecIndex].description}
                      </Typography>
                    </Box>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </Box>
            <Box sx={{ 
              width: { xs: '100%', md: '40%' }, // Changed breakpoint from 'sm' to 'md'
              textAlign: 'center', 
              mt: { xs: 2, md: 0 }, 
              ml: { md: 2 }, // Changed breakpoint from 'sm' to 'md'
              padding: '16px', 
              backgroundColor: 'rgba(255, 255, 255, 0.1)', 
              borderRadius: '8px', 
              backdropFilter: 'blur(10px)'
            }}>
              <Typography variant="h7" sx={{ color: '#00ff9f', textAlign: 'center' }}>
                I embarked on my AIESEC journey on July 29, 2023, as a Team Member in the Business Development Department.
              </Typography>
              <Typography variant="h7" sx={{ color: '#00ff9f', textAlign: 'center' }}>
                This role became a turning point in my life, helping me develop leadership, communication, and management skills, along with the ability to perform under pressure.
              </Typography>
              <Typography variant="h7" sx={{ color: '#00ff9f', textAlign: 'center' }}>
                In my very first term, I was promoted to Manager of Business Development, and in the following term, I transitioned to IGV Customer Experience Manager, where my team and I were responsible for managing international interns arriving from different countries. Later, I took on the role of Senior Manager for Business Development, where I led and supervised two Team Leads and their respective teams.
              </Typography>
              <Typography variant="h7" sx={{ color: '#00ff9f', textAlign: 'center' }}>
                Through every transition and challenge, AIESEC transformed my personality and the way I connect with people, shaping me into a more dynamic and impactful individual.
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ 
          display: 'flex',
          justifyContent: 'center',
          mt: 4,
          mb: 6
        }}>
          <Button
            component={RouterLink}
            to="/pese"
            sx={{
              position: 'relative',
              padding: '15px 30px',
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              color: '#00ff9f',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              border: '2px solid #00ff9f',
              borderRadius: '8px',
              overflow: 'hidden',
              transition: 'all 0.3s ease-in-out',
              textTransform: 'none',
              fontFamily: "'Fira Code', monospace",
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(120deg, transparent, rgba(0, 255, 159, 0.2), transparent)',
                transition: 'all 0.5s ease-in-out',
              },
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 20px rgba(0, 255, 159, 0.3)',
                backgroundColor: 'rgba(0, 255, 159, 0.1)',
                '&::before': {
                  left: '100%',
                }
              },
              '&:active': {
                transform: 'translateY(-2px)',
              }
            }}
          >
            View Practical for Employability and Skill Enhancement Section →
          </Button>
        </Box>

        {/* Contact Section */}
        <Box 
          component="footer" 
          id="contact"
          sx={{ 
            mt: 6, 
            py: 4, 
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderTop: '1px solid rgba(0, 255, 159, 0.2)'
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

            <Typography 
              variant="body2" 
              sx={{ 
                color: '#00ff9f', 
                textAlign: 'center',
                mt: 4,
                opacity: 0.7,
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }}
            >
              &copy; {new Date().getFullYear()} Daksh Nautiyal. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
