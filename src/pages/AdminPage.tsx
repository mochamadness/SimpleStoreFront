import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Alert,
  Snackbar,
  Paper,
  Fab
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useApp } from '../context/AppContext';
import ProductGrid from '../components/ProductGrid';
import ProductForm from '../components/ProductForm';
import { Product } from '../types/Product';

const AdminPage: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, isAdmin } = useApp();
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  if (!isAdmin) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error">
          <Typography variant="h6">Access Denied</Typography>
          <Typography>You need admin privileges to access this page.</Typography>
        </Alert>
      </Container>
    );
  }

  const handleAddProduct = () => {
    setEditingProduct(undefined);
    setFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      setSnackbarMessage('Product deleted successfully!');
      setSnackbarOpen(true);
    }
  };

  const handleSaveProduct = (product: Product) => {
    if (editingProduct) {
      updateProduct(product);
      setSnackbarMessage('Product updated successfully!');
    } else {
      addProduct(product);
      setSnackbarMessage('Product added successfully!');
    }
    setSnackbarOpen(true);
  };

  return (
    <Box>
      {/* Admin Header */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            Admin Dashboard
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Manage your cosmetics and skincare products
          </Typography>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" gap={3} flexWrap="wrap" sx={{ mb: 4 }}>
          <Paper sx={{ p: 3, textAlign: 'center', minWidth: 200 }}>
            <Typography variant="h4" color="primary" fontWeight="bold">
              {products.length}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Total Products
            </Typography>
          </Paper>
          <Paper sx={{ p: 3, textAlign: 'center', minWidth: 200 }}>
            <Typography variant="h4" color="success.main" fontWeight="bold">
              {products.filter(p => p.inStock).length}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              In Stock
            </Typography>
          </Paper>
          <Paper sx={{ p: 3, textAlign: 'center', minWidth: 200 }}>
            <Typography variant="h4" color="error.main" fontWeight="bold">
              {products.filter(p => !p.inStock).length}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Out of Stock
            </Typography>
          </Paper>
        </Box>
      </Container>

      {/* Products Management */}
      <ProductGrid
        products={products}
        title="Product Management"
        showAdminActions={true}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />

      {/* Add Product FAB */}
      <Fab
        color="primary"
        aria-label="add product"
        onClick={handleAddProduct}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24
        }}
      >
        <Add />
      </Fab>

      {/* Product Form Dialog */}
      <ProductForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminPage;