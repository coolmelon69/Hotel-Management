# Hotel Management System

## Project Overview

The Hotel Management System Assessment is a modern, responsive web application designed to streamline hotel operations. It provides an intuitive dashboard for managing bookings, rooms, guests, and other administrative tasks. This project was developed as part of an assessment for a front-end job interview.

## Features

- **Dashboard Overview**: Real-time stats & insights
- **Room Management**: Monitor availability, occupancy, and maintenance
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark/Light Mode**: Theme toggle for better usability

## Technologies Used

- **Frontend**: [Next.js 14](https://nextjs.org/) with App Router
- **UI**: [React 18](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- **Type Safety**: [TypeScript](https://www.typescriptlang.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: React Context API
- **Date Handling**: [date-fns](https://date-fns.org/)

## Installation Guide

### Prerequisites

- Node.js 18.x+
- npm 9.x+
- Git

### Setup

1. **Clone the Repository**
   ```sh
   git clone https://github.com/yourusername/hotel-management-system.git
   cd hotel-management-system
   ```

2. **Install Dependencies**
   ```sh
   npm install or npm install --legacy-peer-deps (if npm install doesn't work)
   ```

3. **Run Development Server**
   ```sh
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000)

4. **Build for Production**
   ```sh
   npm run build
   npm start
   ```

## Usage Guide

### Authentication (For Demo Purposes)

- **Login**: Use any email/password
- **Social Login**: Google, Apple, Facebook button
- **Registration**: Sign up from the login page

### Navigation

- **Sidebar**: Bookings, Rooms, Guests, Settings
- **Theme Toggle**: Light/Dark mode switch
- **User Menu**: Profile & Logout

### Booking Management

1. Go to **Bookings** from the sidebar
2. Filter by status (All, Confirmed, Pending, etc.)
3. Click **New Booking** to add a new booking 
4. View details by clicking **View Details**
5. Use the dropdown for additional actions

### Coding Standards

- Use TypeScript
- Write clear, descriptive comments
- Ensure UI is responsive
- Test across devices

## Troubleshooting & FAQs

### Common Issues

#### App Won't Start
**Solution**:
```sh
node -v  # Ensure Node.js 18.x or higher
npm install
```

#### Login Issues
**Solution**: For demo, any email/password works. 

#### Dark Mode Doesn't Persist
**Solution**: Ensure browser allows localStorage.

## Acknowledgements

- UI: [shadcn/ui](https://ui.shadcn.com/)
- Icons: [Lucide React](https://lucide.dev/)
- Demo data for educational use
- Developed by Adam Danial (https://github.com/coolmelon69)


