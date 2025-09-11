import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
  OutlinedInput,
  FormControlLabel,
  Switch
} from '@mui/material';
import { Product, ProductCategory, SkinType } from '../types/Product';

interface ProductFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  product?: Product;
}

const ProductForm: React.FC<ProductFormProps> = ({ open, onClose, onSave, product }) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: ProductCategory.SKINCARE,
    brand: '',
    imageUrl: '',
    inStock: true,
    ingredients: [],
    skinType: [],
    benefits: [],
    usage: '',
    volume: '',
    rating: 0,
    reviews: 0
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        name: '',
        description: '',
        price: 0,
        category: ProductCategory.SKINCARE,
        brand: '',
        imageUrl: '',
        inStock: true,
        ingredients: [],
        skinType: [],
        benefits: [],
        usage: '',
        volume: '',
        rating: 0,
        reviews: 0
      });
    }
  }, [product, open]);

  const handleInputChange = (field: keyof Product) => (event: any) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: field === 'price' || field === 'rating' || field === 'reviews' ? 
        Number(value) : value
    }));
  };

  const handleArrayFieldChange = (field: 'ingredients' | 'benefits') => (value: string) => {
    if (value.trim()) {
      const items = value.split(',').map(item => item.trim()).filter(item => item);
      setFormData(prev => ({
        ...prev,
        [field]: items
      }));
    }
  };

  const handleSkinTypeChange = (event: any) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      skinType: value
    }));
  };

  const handleSubmit = () => {
    const productToSave: Product = {
      id: product?.id || Math.random().toString(36).substr(2, 9),
      name: formData.name || '',
      description: formData.description || '',
      price: formData.price || 0,
      category: formData.category || ProductCategory.SKINCARE,
      brand: formData.brand || '',
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      inStock: formData.inStock ?? true,
      ingredients: formData.ingredients || [],
      skinType: formData.skinType || [],
      benefits: formData.benefits || [],
      usage: formData.usage || '',
      volume: formData.volume || '',
      rating: formData.rating || 0,
      reviews: formData.reviews || 0
    };
    onSave(productToSave);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {product ? 'Edit Product' : 'Add New Product'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' }, 
          gap: 3, 
          mt: 1 
        }}>
          <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 6' } }}>
            <TextField
              fullWidth
              label="Product Name"
              value={formData.name}
              onChange={handleInputChange('name')}
              required
            />
          </Box>
          <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 6' } }}>
            <TextField
              fullWidth
              label="Brand"
              value={formData.brand}
              onChange={handleInputChange('brand')}
              required
            />
          </Box>
          <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 12' } }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={formData.description}
              onChange={handleInputChange('description')}
              required
            />
          </Box>
          <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 4' } }}>
            <TextField
              fullWidth
              label="Price"
              type="number"
              inputProps={{ min: 0, step: 0.01 }}
              value={formData.price}
              onChange={handleInputChange('price')}
              required
            />
          </Box>
          <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 4' } }}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                label="Category"
                onChange={handleInputChange('category')}
              >
                {Object.values(ProductCategory).map(category => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 4' } }}>
            <TextField
              fullWidth
              label="Volume"
              value={formData.volume}
              onChange={handleInputChange('volume')}
              placeholder="e.g., 30ml, 50g"
            />
          </Box>
          <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 12' } }}>
            <TextField
              fullWidth
              label="Image URL"
              value={formData.imageUrl}
              onChange={handleInputChange('imageUrl')}
              placeholder="https://example.com/image.jpg"
            />
          </Box>
          <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 6' } }}>
            <FormControl fullWidth>
              <InputLabel>Skin Types</InputLabel>
              <Select
                multiple
                value={formData.skinType || []}
                onChange={handleSkinTypeChange}
                input={<OutlinedInput label="Skin Types" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </Box>
                )}
              >
                {Object.values(SkinType).map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 6' } }}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.inStock}
                  onChange={(e) => setFormData(prev => ({ ...prev, inStock: e.target.checked }))}
                />
              }
              label="In Stock"
            />
          </Box>
          <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 12' } }}>
            <TextField
              fullWidth
              label="Ingredients (comma-separated)"
              value={formData.ingredients?.join(', ') || ''}
              onChange={(e) => handleArrayFieldChange('ingredients')(e.target.value)}
              placeholder="Vitamin C, Hyaluronic Acid, Vitamin E"
            />
          </Box>
          <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 12' } }}>
            <TextField
              fullWidth
              label="Benefits (comma-separated)"
              value={formData.benefits?.join(', ') || ''}
              onChange={(e) => handleArrayFieldChange('benefits')(e.target.value)}
              placeholder="Anti-aging, Hydrating, Brightening"
            />
          </Box>
          <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 12' } }}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Usage Instructions"
              value={formData.usage}
              onChange={handleInputChange('usage')}
              placeholder="Apply to clean skin twice daily..."
            />
          </Box>
          <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 6' } }}>
            <TextField
              fullWidth
              label="Rating"
              type="number"
              inputProps={{ min: 0, max: 5, step: 0.1 }}
              value={formData.rating}
              onChange={handleInputChange('rating')}
            />
          </Box>
          <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 6' } }}>
            <TextField
              fullWidth
              label="Number of Reviews"
              type="number"
              inputProps={{ min: 0 }}
              value={formData.reviews}
              onChange={handleInputChange('reviews')}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {product ? 'Update' : 'Add'} Product
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductForm;