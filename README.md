# smart-tracker

# 📊 SmartTracker - Business Income & Expense Tracker

[![React](https://img.shields.io/badge/React-18.0+-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0+-green.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> 🚀 A modern, intuitive business tracker for managing income and expenses with smart features like voice input and receipt scanning.

## ✨ Features

### 💰 Financial Tracking
- **Income & Expense Management** - Track all your business transactions
- **Real-time Profit Calculations** - See your profit/loss instantly
- **Category Organization** - Organize transactions by business categories
- **Privacy Controls** - Hide/show financial amounts with one click

### 📊 Analytics & Insights
- **Interactive Charts** - Beautiful 7-day profit & loss trends
- **Category Breakdown** - Visual analysis of spending patterns
- **Responsive Design** - Works perfectly on desktop and mobile
- **Dark/Light Theme** - Modern UI with gradient designs

### 🎙️ Smart Input Methods
- **Voice Recording** 🎤 - Add transactions by speaking
- **Receipt Scanning** 📷 - Take photos of receipts for automatic entry
- **Quick Add Buttons** - Fast transaction entry
- **Manual Entry** - Traditional form-based input

### 📱 User Experience
- **Real-time Updates** - Instant UI updates
- **Smooth Animations** - Modern hover effects and transitions
- **Intuitive Navigation** - Easy-to-use interface
- **Mobile Responsive** - Perfect on all screen sizes

## 🛠️ Tech Stack

- **Frontend**: React 18+ with Hooks
- **Styling**: Tailwind CSS
- **Charts**: Recharts Library
- **Icons**: Lucide React
- **State Management**: React useState/useEffect
- **Audio**: Web Audio API
- **Camera**: MediaDevices API

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ 
- npm or yarn
- Modern web browser with microphone/camera permissions

### Installation

1. **Clone or create React app**:
   ```bash
   npx create-react-app smarttracker
   cd smarttracker
   ```

2. **Install dependencies**:
   ```bash
   npm install lucide-react recharts
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

3. **Configure Tailwind** in `tailwind.config.js`:
   ```javascript
   module.exports = {
     content: ["./src/**/*.{js,jsx,ts,tsx}"],
     theme: { extend: {} },
     plugins: [],
   }
   ```

4. **Add Tailwind to** `src/index.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

5. **Replace** `src/App.js` with the SmartTracker component

6. **Start the app**:
   ```bash
   npm start
   ```

## 📖 Usage Guide

### 🏠 Dashboard Overview
- **Summary Cards**: View total income, expenses, and profit at a glance
- **Privacy Toggle**: Click the eye icon to hide/show amounts
- **Recent Transactions**: See your latest 10 transactions

### 📈 Charts & Analytics
- Switch to **Charts View** to see:
  - 7-day profit & loss trend line
  - Category breakdown bar chart
  - Financial summary cards

### ➕ Adding Transactions

#### Method 1: Quick Add Button
1. Click **"Add Sale"** button
2. Choose Income/Expense
3. Enter amount and description
4. Select category
5. Click **"Add Transaction"**

#### Method 2: Voice Input 🎤
1. Click the **microphone button**
2. Speak your transaction details
3. Review and confirm the auto-filled form

#### Method 3: Receipt Scanning 📷
1. Click the **camera button**
2. Take a photo of your receipt
3. Review and confirm the extracted data

### 🗂️ Categories

**Income Categories**:
- 💼 Sales
- 🔧 Services  
- 💰 Other Income

**Expense Categories**:
- 📦 Inventory
- 🏠 Rent
- ⚡ Utilities
- 📢 Marketing
- 🚗 Transport
- 📄 Other Expense

## 🎨 Screenshots

### Dashboard Overview
![Dashboard](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=SmartTracker+Dashboard)

### Charts & Analytics
![Charts](https://via.placeholder.com/800x400/10B981/FFFFFF?text=Charts+%26+Analytics)

### Add Transaction Form
![Add Form](https://via.placeholder.com/400x600/EF4444/FFFFFF?text=Add+Transaction)

## 🔧 Customization

### Adding New Categories
```javascript
const categories = {
  income: ['sales', 'services', 'consulting', 'other income'],
  expense: ['inventory', 'rent', 'utilities', 'marketing', 'transport', 'office', 'other expense']
};
```

### Changing Color Themes
Modify the gradient classes in the component:
```javascript
// Example: Change primary gradient
className="bg-gradient-to-r from-green-500 to-blue-600"
```

### Adding New Chart Types
The app uses Recharts - you can easily add:
- Pie charts for category distribution
- Area charts for cumulative totals
- Multi-axis charts for complex data

## 🌟 Advanced Features

### 🔊 Voice Recognition (Future Enhancement)
- Currently simulates voice input
- Can be integrated with Web Speech API
- Supports multiple languages

### 🤖 OCR Receipt Scanning (Future Enhancement)
- Currently simulates receipt processing
- Can be integrated with Tesseract.js or cloud OCR services
- Automatic data extraction from receipts

### 💾 Data Persistence
- Currently uses in-memory storage
- Can be extended with:
  - localStorage for client-side persistence
  - Firebase for cloud sync
  - REST API for backend integration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Recharts** for beautiful, responsive charts
- **Lucide React** for clean, modern icons
- **Tailwind CSS** for rapid UI development
- **React Team** for the amazing framework

## 📞 Support

Need help? Here are some resources:

- 📚 **Documentation**: Check the inline code comments
- 🐛 **Issues**: Report bugs via GitHub issues
- 💬 **Discussions**: Join our community discussions
- 📧 **Contact**: Reach out for enterprise support

---

<div align="center">

**Made with ❤️ by developers, for small businesses**

⭐ If you found this helpful, please give it a star!

</div>