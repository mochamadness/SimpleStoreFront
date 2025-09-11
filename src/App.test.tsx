import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppProvider } from './context/AppContext';
import App from './App';

const theme = createTheme();

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <AppProvider>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </AppProvider>
  </ThemeProvider>
);

test('renders storefront header', () => {
  render(<App />, { wrapper: TestWrapper });
  const headerElement = screen.getByText(/CosmeticStore/i);
  expect(headerElement).toBeInTheDocument();
});
