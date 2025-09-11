import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Chip,
  Alert
} from '@mui/material';
import { Product, ProductCategory, SkinType } from '../types/Product';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title: string;
  showAdminActions?: boolean;
  onAddToCart?: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  title,
  showAdminActions = false,
  onAddToCart,
  onEdit,
  onDelete
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | 'all'>('all');
  const [skinTypeFilter, setSkinTypeFilter] = useState<SkinType | 'all'>('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    const matchesSkinType = skinTypeFilter === 'all' || 
                           (product.skinType && product.skinType.includes(skinTypeFilter));

    return matchesSearch && matchesCategory && matchesSkinType;
  });

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategoryFilter(event.target.value as ProductCategory | 'all');
  };

  const handleSkinTypeChange = (event: SelectChangeEvent) => {
    setSkinTypeFilter(event.target.value as SkinType | 'all');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center" sx={{ mb: 4 }}>
        {title}
      </Typography>

      {/* Filters */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, 
          gap: 2, 
          alignItems: 'center' 
        }}>
          <TextField
            fullWidth
            label="Search products..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              label="Category"
              onChange={handleCategoryChange}
            >
              <MenuItem value="all">All Categories</MenuItem>
              {Object.values(ProductCategory).map(category => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Skin Type</InputLabel>
            <Select
              value={skinTypeFilter}
              label="Skin Type"
              onChange={handleSkinTypeChange}
            >
              <MenuItem value="all">All Skin Types</MenuItem>
              {Object.values(SkinType).map(skinType => (
                <MenuItem key={skinType} value={skinType}>{skinType}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Active filters */}
        {(categoryFilter !== 'all' || skinTypeFilter !== 'all' || searchTerm) && (
          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {searchTerm && (
              <Chip
                label={`Search: "${searchTerm}"`}
                onDelete={() => setSearchTerm('')}
                color="primary"
                variant="outlined"
              />
            )}
            {categoryFilter !== 'all' && (
              <Chip
                label={`Category: ${categoryFilter}`}
                onDelete={() => setCategoryFilter('all')}
                color="primary"
                variant="outlined"
              />
            )}
            {skinTypeFilter !== 'all' && (
              <Chip
                label={`Skin Type: ${skinTypeFilter}`}
                onDelete={() => setSkinTypeFilter('all')}
                color="primary"
                variant="outlined"
              />
            )}
          </Box>
        )}
      </Box>

      {/* Results count */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Showing {filteredProducts.length} of {products.length} products
      </Typography>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <Alert severity="info" sx={{ mt: 4 }}>
          No products found matching your criteria. Try adjusting your filters.
        </Alert>
      ) : (
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { 
            xs: '1fr', 
            sm: 'repeat(2, 1fr)', 
            md: 'repeat(3, 1fr)', 
            lg: 'repeat(4, 1fr)' 
          }, 
          gap: 3 
        }}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              showAdminActions={showAdminActions}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </Box>
      )}
    </Container>
  );
};

export default ProductGrid;