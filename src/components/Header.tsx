import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Tabs,
  Tab
} from '@mui/material';
import { LocalPharmacy, AdminPanelSettings, ExitToApp, AccountCircle, Store, Settings } from '@mui/icons-material';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types/Product';

const Header: React.FC = () => {
  const { user, login, logout, isAdmin } = useApp();
  const [loginOpen, setLoginOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.CUSTOMER);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    if (email.trim()) {
      login(email, role);
      setLoginOpen(false);
      setEmail('');
      setRole(UserRole.CUSTOMER);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
        <Toolbar>
          <LocalPharmacy sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CosmeticStore
          </Typography>

          {/* Navigation Tabs */}
          {user && (
            <Tabs
              value={location.pathname}
              onChange={handleTabChange}
              textColor="inherit"
              indicatorColor="secondary"
              sx={{ mr: 3 }}
            >
              <Tab 
                icon={<Store />} 
                label="Store" 
                value="/" 
                sx={{ color: 'inherit', minHeight: 48 }}
              />
              {isAdmin && (
                <Tab 
                  icon={<Settings />} 
                  label="Admin" 
                  value="/admin" 
                  sx={{ color: 'inherit', minHeight: 48 }}
                />
              )}
            </Tabs>
          )}

          <Box display="flex" alignItems="center" gap={2}>
            {user ? (
              <>
                <Box display="flex" alignItems="center" gap={1}>
                  <AccountCircle />
                  <Typography variant="body2">
                    {user.name}
                  </Typography>
                  {isAdmin && (
                    <Chip 
                      label="Admin" 
                      size="small" 
                      color="secondary"
                      icon={<AdminPanelSettings fontSize="small" />}
                    />
                  )}
                </Box>
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  startIcon={<ExitToApp />}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                color="inherit"
                onClick={() => setLoginOpen(true)}
                startIcon={<AccountCircle />}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Login Dialog */}
      <Dialog open={loginOpen} onClose={() => setLoginOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Login to CosmeticStore</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
              autoFocus
            />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={role}
                label="Role"
                onChange={(e) => setRole(e.target.value as UserRole)}
              >
                <MenuItem value={UserRole.CUSTOMER}>Customer</MenuItem>
                <MenuItem value={UserRole.ADMIN}>Admin</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ mt: 2, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
              <Typography variant="body2" color="info.dark">
                <strong>Demo Login:</strong><br />
                • Use any email address<br />
                • Select "Admin" role to access product management<br />
                • Select "Customer" role for shopping experience
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoginOpen(false)}>Cancel</Button>
          <Button onClick={handleLogin} variant="contained" disabled={!email.trim()}>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;