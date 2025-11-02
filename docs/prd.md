# Product Requirements Document (PRD)
## Turkey Oven Timer v0.1 - MVP

**Version:** 0.1
**Status:** Planning
**Target Launch:** Pre-Thanksgiving 2025
**Product Owner:** [Your Name]
**Last Updated:** November 2, 2025

---

## Executive Summary

Turkey Oven Timer v0.1 is the absolute minimum viable product to test our core hypothesis: that backwards scheduling for a single turkey (including thaw and rest times) will significantly reduce host stress during holiday meal preparation.

This version intentionally excludes all multi-dish coordination, temperature conflicts, and oven capacity features to focus solely on validating the backwards scheduling value proposition.

---

## Goals & Success Metrics

### Primary Goal
Validate that backwards scheduling reduces stress and provides value to users before building additional complexity.

### Key Results (Success Metrics)

**Quantitative:**
- 80% of users successfully complete the turkey timing flow
- <5% error rate in user inputs (validation working)
- Users return to check their schedule at least 2 times

**Qualitative:**
- Users report feeling "more confident" about timing (post-use survey)
- Users understand when to start thawing and cooking
- Zero confusion about what the output times mean

**Learning Goals:**
- Is backwards scheduling alone valuable, or do users immediately ask for multi-dish features?
- Do users trust the calculated times?
- What questions do users still have after using v0.1?

---

## User Stories

### Core User Story
**As a** holiday host preparing a turkey
**I want to** know exactly when to start thawing and cooking
**So that** my turkey is perfectly ready at serving time without stress

### Detailed User Flows

**Flow 1: Fresh Turkey**
1. User enters turkey weight (lbs)
2. User selects "Fresh"
3. User enters desired serving time
4. System displays:
   - When to start cooking
   - When turkey will be done cooking
   - When turkey will be ready to serve (after resting)

**Flow 2: Frozen Turkey**
1. User enters turkey weight (lbs)
2. User selects "Frozen"
3. User enters desired serving time
4. System displays:
   - When to start thawing (refrigerator method)
   - When to start cooking
   - When turkey will be done cooking
   - When turkey will be ready to serve (after resting)

---

## Functional Requirements

### Required Inputs
| Input | Type | Validation | Default |
|-------|------|------------|---------|
| Turkey Weight | Number | 8-30 lbs | None (required) |
| Fresh/Frozen | Radio | Must select one | None (required) |
| Serving Time | Time Picker | Future time only | None (required) |

### Calculation Logic

**Thaw Time (Frozen Turkey Only):**
- Formula: 24 hours per 4-5 lbs (refrigerator method)
- Example: 16 lb turkey = 4 days (96 hours)

**Cook Time:**
- Formula: 13 minutes per pound at 325°F (unstuffed turkey)
- Example: 16 lb turkey = 208 minutes (3 hours 28 minutes)
- Add 30 minutes for oven preheat

**Rest Time:**
- Fixed: 20-30 minutes (use 25 minutes)
- Turkey continues cooking and redistributes juices

**Backwards Scheduling:**
- Start from serving time
- Subtract rest time = when to remove from oven
- Subtract cook time = when to start cooking
- Subtract thaw time (if frozen) = when to start thawing

### Output Display

**Fresh Turkey Output:**
```
Your turkey will be ready!

=P Start cooking: [Day] at [Time]
<W Remove from oven: [Day] at [Time]
( Ready to serve: [Day] at [Time]

Note: Your turkey will rest for 25 minutes after cooking.
```

**Frozen Turkey Output:**
```
Your turkey will be ready!

D Start thawing: [Day] at [Time]
   (Keep refrigerated for [X] days)

=P Start cooking: [Day] at [Time]
<W Remove from oven: [Day] at [Time]
( Ready to serve: [Day] at [Time]

Note: Your turkey will rest for 25 minutes after cooking.
```

### Edge Cases & Validation

1. **Weight out of range:** Display error "Please enter a weight between 8-30 lbs"
2. **Past serving time:** Display error "Serving time must be in the future"
3. **Insufficient thaw time:** Display warning "  Not enough time to safely thaw! Consider cold water thaw method or buy fresh."
4. **Cooking starts in <1 hour:** Display warning "  You should start cooking very soon!"

---

## Non-Functional Requirements

### Performance
- Page load: <2 seconds
- Calculation response: Instant (<100ms)

### Compatibility
- Mobile responsive (primary use case)
- Works on iOS Safari, Chrome, Firefox
- No login/authentication required
- Works offline after initial load (optional nice-to-have)

### Accessibility
- WCAG 2.1 AA compliant
- Keyboard navigable
- Screen reader friendly
- High contrast for readability

---

## Out of Scope (v0.1)

The following are explicitly **not included** in v0.1 to maintain focus:

- L Multiple dishes/sides
- L Temperature conflict detection
- L Oven capacity planning
- L Custom cooking temperatures
- L Stuffed turkey calculations
- L User accounts or saving schedules
- L Notifications/reminders
- L Multiple ovens
- L Stovetop coordination
- L Recipe suggestions
- L Shopping lists

These will be considered for v0.2+ based on v0.1 learnings.

---

## Technical Constraints

- Mobile-friendly web app
- Simple, fast, no backend required for v0.1
- Pure client-side calculation
- No database needed
- Can be hosted on static site (Vercel, Netlify, GitHub Pages, etc.)

---

## Open Questions

1. Should we show a visual timeline/schedule graphic, or just text times?
2. Do we need to explain WHY (educational content about resting, etc.)?
3. Should we support both 12-hour and 24-hour time formats?
4. Do we need a "print schedule" feature?

---

## Success Criteria for Moving to v0.2

We will proceed to v0.2 (multi-dish) only if:
-  >70% of test users successfully use the tool
-  Users report reduced stress/increased confidence
-  Users express desire for multi-dish features
-  Core calculation logic is validated as accurate

If users don't find backwards scheduling valuable, we'll pivot before adding complexity.

---

## Appendix: Research & Assumptions

### Cooking Time Sources
- USDA guidelines: 13-15 min/lb at 325°F for unstuffed turkey
- We use 13 min/lb (conservative, safer)

### Thaw Time Sources
- USDA refrigerator thaw: 24 hours per 4-5 lbs
- We use 24 hours per 4 lbs (more conservative)

### Rest Time Sources
- Most recipes: 20-30 minutes
- We use 25 minutes (middle ground)

### Key Assumptions to Validate
1. Users trust automated calculations
2. Backwards scheduling is more intuitive than forward planning
3. A single turkey timer provides enough value to be useful
4. Users will return to app after initial planning
