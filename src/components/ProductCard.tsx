import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  Rating,
  Button,
  CardActions
} from '@mui/material';
import { ShoppingCart, LocalPharmacy } from '@mui/icons-material';
import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  showAdminActions?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  showAdminActions = false,
  onEdit,
  onDelete 
}) => {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3
        }
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.imageUrl}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <LocalPharmacy color="primary" fontSize="small" />
          <Typography variant="caption" color="text.secondary">
            {product.brand}
          </Typography>
        </Box>
        
        <Typography variant="h6" component="h2" gutterBottom>
          {product.name}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {product.description}
        </Typography>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Rating value={product.rating || 0} readOnly size="small" precision={0.1} />
          <Typography variant="caption" color="text.secondary">
            ({product.reviews || 0} reviews)
          </Typography>
        </Box>

        <Chip 
          label={product.category} 
          size="small" 
          variant="outlined" 
          sx={{ mb: 1 }}
        />

        {product.volume && (
          <Typography variant="caption" display="block" color="text.secondary">
            Volume: {product.volume}
          </Typography>
        )}

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Typography variant="h6" color="primary" fontWeight="bold">
            ${product.price.toFixed(2)}
          </Typography>
          <Chip 
            label={product.inStock ? 'In Stock' : 'Out of Stock'} 
            color={product.inStock ? 'success' : 'error'}
            size="small"
          />
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        {!showAdminActions ? (
          <Button
            variant="contained"
            startIcon={<ShoppingCart />}
            onClick={() => onAddToCart?.(product)}
            disabled={!product.inStock}
            fullWidth
          >
            Add to Cart
          </Button>
        ) : (
          <Box display="flex" gap={1} width="100%">
            <Button
              variant="outlined"
              onClick={() => onEdit?.(product)}
              fullWidth
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => onDelete?.(product.id)}
              fullWidth
            >
              Delete
            </Button>
          </Box>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;