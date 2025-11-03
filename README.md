# Turkey Timer

A smart turkey cooking calculator that helps you plan the perfect holiday meal by calculating exact timing for thawing, cooking, and serving your turkey.

## Live Demo

**[Try it now](https://cookingwithsage.github.io/Turkey-Day-Timer/)**

## Features

- **Precise Timing Calculations**: Based on USDA guidelines (13 min/lb at 325°F)
- **Frozen Turkey Support**: Automatic thaw time calculation (6 hours/lb)
- **Backwards Scheduling**: Enter your desired serving time and get the complete timeline
- **Smart Warnings**:
  - Alerts if thaw time is insufficient
  - Urgent notifications when cooking time is imminent (<1 hour)
- **Complete Timeline**:
  - Start thawing (frozen only)
  - Start preheating oven
  - Put turkey in oven
  - Remove from oven
  - Ready to serve
- **Educational Content**: Learn why resting your turkey matters
- **Mobile-First Design**: Fully responsive across all devices
- **Accessibility**: WCAG AA compliant with full keyboard navigation and screen reader support

## Usage

1. **Enter Turkey Weight**: 8-30 pounds (typically 1-1.5 lbs per person)
2. **Select Status**: Fresh or Frozen
3. **Choose Serving Time**: Pick your desired serving date and time
4. **Calculate**: Get your complete cooking schedule

The app will:
- Calculate backwards from your serving time
- Account for resting period (25 minutes)
- Include cooking time (13 min/lb)
- Add preheat time (30 minutes)
- Calculate thaw time if frozen (6 hours/lb)
- Warn you if you don't have enough time to thaw

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **date-fns** - Date calculations
- **Vitest** - Unit testing (31 tests)
- **GitHub Pages** - Deployment

## Development

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/CookingWithSage/Turkey-Day-Timer.git
cd Turkey-Day-Timer

# Install dependencies
npm install
```

### Available Scripts

```bash
# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

### Project Structure

```
Turkey-Day-Timer/
├── src/
│   ├── components/
│   │   ├── Button.jsx           # Reusable button component
│   │   ├── TurkeyForm.jsx       # Input form with validation
│   │   ├── TurkeySchedule.jsx   # Timeline display
│   │   └── WarningMessage.jsx   # Alert component
│   ├── utils/
│   │   ├── calculations.js      # Core timing logic
│   │   └── validation.js        # Input validation
│   ├── constants/
│   │   └── turkey.js            # Cooking constants
│   ├── App.jsx                  # Main app component
│   └── main.jsx                 # Entry point
├── __tests__/
│   └── calculations.test.js     # Unit tests
└── public/                      # Static assets
```

## Cooking Guidelines

All calculations are based on USDA recommended guidelines:

- **Oven Temperature**: 325°F
- **Cook Time**: 13 minutes per pound
- **Preheat Time**: 30 minutes
- **Rest Time**: 25 minutes
- **Thaw Time**: 6 hours per pound (refrigerator method)
- **Internal Temperature**: Turkey should reach 165°F

**Important**: Always verify the internal temperature with a meat thermometer. This calculator provides timing estimates, but actual cooking times may vary based on your oven and turkey.

## Known Limitations

- **Timing Estimates Only**: Actual cooking times vary by oven, turkey shape, and other factors
- **Single Cooking Method**: Optimized for unstuffed turkey at 325°F only
- **Temperature Not Tracked**: Does not monitor actual internal temperature
- **Refrigerator Thawing Only**: Cold water or microwave thawing methods not included
- **No Timer Functionality**: App calculates schedule but doesn't provide live countdown timers

## Accessibility

This app is built with accessibility in mind:

- WCAG AA compliant color contrast
- Full keyboard navigation support
- ARIA labels for screen readers
- Touch-friendly targets (minimum 44px)
- Responsive text sizing
- Semantic HTML structure

## Contributing

This is a personal learning project, but suggestions and feedback are welcome! Feel free to open an issue on GitHub.

## License

MIT License - feel free to use this project for learning or personal use.

## Acknowledgments

- Cooking guidelines from USDA Food Safety and Inspection Service
- Built as part of a React learning project
