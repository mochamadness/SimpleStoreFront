import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';

// Create a custom theme for the cosmetics store
const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
      light: '#9aa7ec',
      dark: '#4c63d2',
    },
    secondary: {
      main: '#764ba2',
      light: '#9575cd',
      dark: '#512da8',
    },
    background: {
      default: '#fafafa',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

const AppContent: React.FC = () => {
  const { user, isAdmin } = useApp();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/admin" 
            element={
              user ? (
                isAdmin ? <AdminPage /> : <Navigate to="/" replace />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <Router>
          <AppContent />
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
