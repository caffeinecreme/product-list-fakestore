# Product Management System

A simple product management interface built with Vue 3, TypeScript, Pinia, and Tailwind CSS.

## Features

- View a list of products
- Add new products with name and price
- Edit existing products
- Delete products
- Search functionality to filter products
- Responsive design that works on all devices

## Technology Stack

- **Vue 3**: Frontend framework
- **TypeScript**: Type checking
- **Pinia**: State management
- **Tailwind CSS**: Styling
- **Vite**: Build tool
- **Axios**: API requests

## Project Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/product-manager.git
cd product-manager

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
product-manager/
├── src/
│   ├── components/         # UI Components
│   ├── services/           # API services
│   ├── stores/             # Pinia stores
│   ├── types/              # TypeScript types
│   ├── App.vue             # Main component
│   ├── main.ts             # Entry point
│   └── style.css           # Global styles
```

## API Integration

This project uses the [Fake Store API](https://fakestoreapi.com/products) to fetch initial product data. Create, update, and delete operations are simulated in the frontend.

## License

Open source, free to use and modify as needed.
