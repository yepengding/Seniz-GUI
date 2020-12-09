import React from 'react';
import './App.css';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function App() {
  return (
      <Container maxWidth="sm">
          <Box my={4}>
              <Typography variant="h4" component="h1" gutterBottom>
                  Seniz GUI
              </Typography>
          </Box>
      </Container>
  );
}

export default App;
