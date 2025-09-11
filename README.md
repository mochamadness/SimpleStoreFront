# SimpleStoreFront - Cosmetics & Pharmaceutical Store

A modern, responsive React.js web application for displaying cosmetics and pharmaceutical products with admin capabilities for product management.

## 🌟 Features

### Customer Features
- **Product Browsing**: View a curated collection of cosmetics and pharmaceutical products
- **Advanced Filtering**: Filter products by category, skin type, and search terms
- **Detailed Product Information**: View ingredients, benefits, usage instructions, and customer ratings
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Shopping Cart**: Add products to cart with visual feedback

### Admin Features
- **Product Management**: Add, edit, and delete products
- **Inventory Control**: Manage stock status and product details
- **Admin Dashboard**: View product statistics and manage catalog
- **Rich Product Forms**: Comprehensive form with all product attributes

### Technical Features
- **React TypeScript**: Modern React application with TypeScript for type safety
- **Material-UI**: Professional UI components with cosmetics-themed styling
- **Local Storage**: Data persistence using browser local storage
- **Responsive Design**: Mobile-first responsive design
- **Route Protection**: Admin routes protected by role-based authentication

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mochamadness/SimpleStoreFront.git
   cd SimpleStoreFront
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

## 🛠️ Available Scripts

### `npm start`
Runs the app in development mode at `http://localhost:3000`. The page will reload automatically when you make changes.

### `npm run build`
Builds the app for production to the `build` folder. The build is optimized and ready for deployment.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run eject`
**Note: This is a one-way operation. Once you eject, you can't go back!**

## 🔐 User Authentication

The application includes a demo authentication system:

### Customer Login
- Use any email address
- Select "Customer" role
- Access: Product browsing and shopping features

### Admin Login
- Use any email address
- Select "Admin" role  
- Access: All customer features + product management dashboard

**Demo Credentials**: Use any email address (e.g., `admin@example.com`) and select the appropriate role.

## 📱 Product Categories

The store specializes in:
- **Skincare**: Cleansers, moisturizers, serums
- **Anti-aging**: Retinol treatments, peptide creams
- **Sun Care**: SPF protection, after-sun care
- **Acne Treatment**: Targeted solutions for problem skin
- **Supplements**: Skin health vitamins and minerals

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation and authentication
│   ├── ProductCard.tsx # Individual product display
│   ├── ProductGrid.tsx # Product listing with filters
│   └── ProductForm.tsx # Admin product management form
├── context/            # React Context for state management
│   └── AppContext.tsx  # Global application state
├── data/              # Sample data and data utilities
│   └── products.ts    # Product data and storage functions
├── pages/             # Main application pages
│   ├── HomePage.tsx   # Customer storefront
│   └── AdminPage.tsx  # Admin dashboard
├── types/             # TypeScript type definitions
│   └── Product.ts     # Product and user interfaces
└── App.tsx           # Main application component
```

## 🎨 Design Philosophy

- **Clean & Professional**: Minimalist design focusing on product presentation
- **Cosmetics-Focused**: Color scheme and styling appropriate for beauty products
- **User-Friendly**: Intuitive navigation and clear product information
- **Mobile-First**: Responsive design that works great on all devices

## 💾 Data Storage

The application uses browser Local Storage for data persistence:
- Products are stored in `localStorage` under the key `products`
- User sessions are maintained in `localStorage` under the key `user`
- Sample data is automatically loaded on first visit

## 🔧 Customization

### Adding New Products
1. Login as an admin
2. Navigate to the Admin dashboard
3. Click the "+" floating action button
4. Fill out the product form with all details
5. Save the product

### Modifying Sample Data
Edit `src/data/products.ts` to change the initial product catalog.

### Styling Changes
The application uses Material-UI with a custom theme defined in `App.tsx`. Modify the theme configuration to change colors, typography, and spacing.

## 📦 Dependencies

### Core Dependencies
- **React**: UI library
- **TypeScript**: Type safety and developer experience
- **React Router**: Client-side routing
- **Material-UI**: UI component library
- **Material-UI Icons**: Icon components

### Development Dependencies
- **React Scripts**: Build and development tools
- **Testing Library**: Testing utilities

## 🚀 Deployment

### Production Build
```bash
npm run build
```

This creates a `build` folder with optimized production files.

### Deployment Options
- **Static Hosting**: Deploy to Netlify, Vercel, or GitHub Pages
- **Web Servers**: Serve the build folder with any web server
- **CDN**: Upload to any CDN for global distribution

### Environment Variables
No environment variables are required for basic functionality. All configuration is handled through the source code.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/mochamadness/SimpleStoreFront/issues) page
2. Create a new issue with a detailed description
3. Include steps to reproduce any bugs

## 🔄 Future Enhancements

Potential features for future development:
- User registration and persistent accounts
- Shopping cart persistence and checkout flow
- Product reviews and ratings system
- Image upload for products
- Inventory management
- Order history
- Email notifications
- Payment integration
- Advanced search and filtering
- Product recommendations

---

**Built with ❤️ using React, TypeScript, and Material-UI**