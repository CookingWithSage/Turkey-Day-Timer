# Turkey Timer v0.1 MVP - Build Plan

## Overview

**Goal**: Ship a single-turkey backwards scheduler in ~6-7 days to validate the core hypothesis: that backwards scheduling alone reduces holiday meal stress.

**Tech Stack**: React + Vite + Tailwind CSS, deployed to GitHub Pages (zero cost, zero backend)

---

## Phase 1: Project Setup (Day 1 - ~2 hours)

### 1. Initialize project
- `npm create vite@latest turkey-oven-timer -- --template react`
- Install dependencies: `tailwindcss`, `date-fns`, `gh-pages`
- Configure Tailwind CSS with custom theme (warm orange/autumn palette)
- Set up base path in `vite.config.js` for GitHub Pages

### 2. Project structure
```
src/
  components/
    TurkeyForm.jsx
    TurkeySchedule.jsx
    WarningMessage.jsx
    Button.jsx
  utils/
    calculations.js
    validation.js
  constants/
    turkey.js
  App.jsx
  main.jsx
  index.css
```

### 3. Git setup
- Add deploy script to `package.json`
- Create `.gitignore` (already done)
- Initial commit

---

## Phase 2: Core Logic & Tests (Day 2 - ~4 hours)

### 4. Constants (`src/constants/turkey.js`)
- Cook time: 13 min/lb at 325°F
- Preheat: 30 minutes
- Rest: 25 minutes
- Thaw: 6 hours/lb (24hr per 4lbs)

### 5. Calculation functions (`src/utils/calculations.js`)
- `calculateCookTime(weightLbs)` → total minutes including preheat
- `calculateThawTime(weightLbs)` → hours needed
- `calculateSchedule(weight, isFrozen, servingTime)` → full timeline
- `hasEnoughThawTime(startThaw, now)` → boolean
- `isCookingImminent(startCook, now)` → boolean

### 6. Validation functions (`src/utils/validation.js`)
- `validateWeight(weight)` → 8-30 lbs check
- `validateServingTime(time)` → future time check
- `validateInputs(weight, status, time)` → combined validation

### 7. Unit tests (`__tests__/calculations.test.js`)
- Test 16lb turkey: 238 min cook (208 + 30 preheat)
- Test 16lb frozen: 96hr thaw (4 days)
- Test backwards scheduling accuracy
- Test edge cases (8lb, 30lb turkeys)

---

## Phase 3: UI Components (Days 3-4 - ~8 hours)

### 8. TurkeyForm.jsx (Screen 1)
- Number input for weight (8-30 lbs)
- Radio buttons: Fresh | Frozen
- Date + time picker (future only)
- Real-time validation on blur
- Disabled submit until valid
- Helper text: "Typically 1-1.5 lbs per person"

### 9. TurkeySchedule.jsx (Screen 2)
- Summary header (weight, status, serving time)
- Chronological timeline with emojis:
  - ❄️ Start Thawing (frozen only)
  - 🔥 Start Cooking (preheat to 325°F)
  - ⏰ Remove from Oven
  - 🍗 Ready to Serve
- Educational note about resting
- "Start Over" button

### 10. WarningMessage.jsx
- ⚠️ Insufficient thaw time → suggest fresh turkey or cold water thaw
- 🚨 Cooking imminent (<1hr) → "Start cooking soon!"
- Actionable next steps

### 11. Button.jsx
- Reusable primary/secondary button component
- Disabled state styling

### 12. App.jsx
- State management: `useState` for form inputs + results
- Flow: Form → Validate → Calculate → Results
- Simple two-screen transition

---

## Phase 4: Styling & Responsive Design (Day 5 - ~4 hours)

### 13. Tailwind theme (`tailwind.config.js`)
- Primary: `#D97706` (warm orange)
- Warning: `#DC2626` (red)
- Success: `#059669` (green)
- Background: `#FFFBF5` (warm off-white)

### 14. Mobile-first responsive
- Mobile (<768px): Full width, single column
- Tablet/Desktop: Max-width 600px, centered
- Touch-friendly targets (min 44px)

### 15. Accessibility
- ARIA labels for icons
- Keyboard navigation
- Focus states
- WCAG AA color contrast
- Screen reader announcements

---

## Phase 5: Testing & Polish (Day 6 - ~4 hours)

### 16. Manual test scenarios
- Fresh 12lb turkey, serve in 2 days ✓
- Frozen 20lb turkey, serve in 1 week ✓
- Invalid weight (7lbs, 35lbs) ✓
- Past serving time ✓
- Insufficient thaw time warning ✓
- Imminent cooking warning ✓

### 17. Cross-browser testing
- iOS Safari, Chrome Android
- Desktop Chrome, Firefox, Safari

### 18. Performance optimization
- Run production build: `npm run build`
- Check bundle size (<100KB gzipped target)
- Lighthouse audit (>90 score target)

---

## Phase 6: Deployment (Day 7 - ~2 hours)

### 19. GitHub Pages setup
- Configure base path in `vite.config.js`
- Add deploy script: `"deploy": "vite build && gh-pages -d dist"`
- Enable GitHub Pages in repo settings

### 20. Deploy
- `npm run deploy`
- Test production URL
- Verify all features work on live site

### 21. Documentation
- Update README with live demo link
- Add usage instructions
- Document known limitations

---

## Success Criteria

- ✅ User can calculate turkey schedule in <30 seconds
- ✅ Zero confusion about backwards scheduling
- ✅ Page loads in <2 seconds
- ✅ Works perfectly on mobile
- ✅ No bugs in core flow
- ✅ Deployed and publicly accessible

---

## What's Explicitly Out of Scope

- ❌ Multiple dishes
- ❌ Temperature conflicts
- ❌ Oven capacity planning
- ❌ User accounts
- ❌ Saving schedules
- ❌ Notifications
- ❌ Backend/database

---

## Build Strategy

**Ship fast → Validate hypothesis → Iterate based on real feedback**

**Estimated Timeline**: 6-7 days full-time, or 2-3 weeks part-time

---

## Technical Dependencies

### Required packages
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "date-fns": "^3.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "gh-pages": "^6.1.0",
    "vitest": "^1.0.0",
    "@testing-library/react": "^14.1.0"
  }
}
```

---

## Key Learning Questions to Answer

1. **Is backwards scheduling alone valuable?** Or do users immediately ask for multi-dish features?
2. **Do users trust the calculated times?** Are they confident enough to follow the schedule?
3. **What questions do users still have?** What's missing from v0.1 that's essential?
4. **Mobile vs Desktop usage?** Where are people actually using this?
5. **Return visits?** Do users come back to check their schedule multiple times?

---

## Next Steps After v0.1

If validation is successful (>70% users find it valuable), proceed to:

**v0.2: Multi-dish coordination**
- Add 2-3 common sides
- Temperature conflict detection
- Smarter scheduling algorithm

**v0.3: Oven capacity**
- Rack space constraints
- Physical capacity planning

**v0.4+: Advanced features**
- Multiple ovens
- Stovetop integration
- User accounts & saving
- Notifications

---

## Notes

- All calculations are client-side (no backend needed)
- Uses USDA-recommended cooking times
- Conservative estimates for safety
- Mobile-first design philosophy
- Zero infrastructure costs
