import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Alert,
  Snackbar
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useApp } from '../context/AppContext';
import ProductGrid from '../components/ProductGrid';
import { Product } from '../types/Product';

const HomePage: React.FC = () => {
  const { products } = useApp();
  const [cart, setCart] = useState<Product[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleAddToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
    setSnackbarMessage(`${product.name} added to cart!`);
    setSnackbarOpen(true);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            Premium Cosmetics & Skincare
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Discover pharmaceutical-grade beauty products for radiant, healthy skin
          </Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            <Button 
              variant="contained" 
              size="large" 
              sx={{ 
                bgcolor: 'white', 
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'grey.100'
                }
              }}
            >
              Shop Now
            </Button>
            {cart.length > 0 && (
              <Button
                variant="outlined"
                size="large"
                startIcon={<ShoppingCart />}
                sx={{ 
                  borderColor: 'white', 
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Cart ({cart.length})
              </Button>
            )}
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 6, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" textAlign="center" gutterBottom>
            Why Choose Our Products?
          </Typography>
          <Box display="flex" justifyContent="center" flexWrap="wrap" gap={4} sx={{ mt: 4 }}>
            <Box textAlign="center" sx={{ maxWidth: 300 }}>
              <Typography variant="h6" gutterBottom color="primary">
                🧪 Pharmaceutical Grade
              </Typography>
              <Typography variant="body2" color="text.secondary">
                All products are formulated with pharmaceutical-grade ingredients for maximum efficacy
              </Typography>
            </Box>
            <Box textAlign="center" sx={{ maxWidth: 300 }}>
              <Typography variant="h6" gutterBottom color="primary">
                🌿 Natural & Safe
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Carefully selected natural ingredients, tested for safety and effectiveness
              </Typography>
            </Box>
            <Box textAlign="center" sx={{ maxWidth: 300 }}>
              <Typography variant="h6" gutterBottom color="primary">
                🎯 Targeted Solutions
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Products designed for specific skin types and concerns for optimal results
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Products Section */}
      <ProductGrid
        products={products}
        title="Featured Products"
        onAddToCart={handleAddToCart}
      />

      {/* Snackbar for cart notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HomePage;