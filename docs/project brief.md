# Turkey Oven Timer - Project Brief

## Vision
Eliminate the stress of holiday meal timing by providing intelligent backwards scheduling and conflict resolution for home cooks managing complex multi-dish meals.

## Problem Statement
The intense complexity of coordinating a holiday meal, particularly one centered around a large item like a turkey, creates significant stress and logistical challenges for home cooks, especially those hosting for the first time. The process requires non-intuitive backwards scheduling, precise temperature management for multiple dishes, and meticulous oven capacity management, leading to **75% of hosts stressing about the schedule** and the risk of serving a flawed meal.

Existing manual methods and basic timers fail to adequately manage the multi-variable conflict resolution necessary for a perfect meal. For instance:

* **Temperature Conflicts**: Solving scenarios where the turkey needs a low 325°F for five hours, but the casserole requires 400°F for the final 45 minutes.
* **Sequencing and Time Allocation**: Accounting for the critical "resting time" of the turkey, which temporarily frees up valuable oven space just before dinner, while simultaneously timing pies and other sides to finish at the exact moment of serving.
* **Oven Capacity**: Ensuring that all required dishes can physical fit onto the available rack space at their necessary cooking times.

These challenges are compounded by the host's lack of experience with large-group cooking, making this a "Super Bowl" event with no practice.

## Target User
Home cooks preparing holiday meals, particularly:
- First-time hosts feeling overwhelmed
- Anyone cooking for larger groups than usual
- Hosts managing multiple dishes with a single oven

## Lean Startup Approach
We will build iteratively, starting with the smallest possible viable product to validate our core hypothesis before adding complexity.

### Build-Measure-Learn Cycle

**Iteration v0.1: Turkey Timer Only (MVP)**
- **Build**: Single turkey backwards scheduler with thaw time calculation
- **Measure**: Can users successfully time one turkey? Do they feel less stressed?
- **Learn**: Is backwards scheduling the key stressor, or is it multi-dish coordination?

**Iteration v0.2: Temperature Conflicts**
- **Build**: Add 2-3 common sides, detect temperature conflicts
- **Measure**: Does this solve the temperature juggling problem?
- **Learn**: What conflict resolution strategies work best?

**Iteration v0.3: Oven Capacity**
- **Build**: Add rack space constraints and physical capacity planning
- **Measure**: Does capacity planning reduce stress?
- **Learn**: How important is spatial planning vs. time planning?

**Iteration v0.4+: Full Coordination**
- Multiple ovens, stovetop integration, custom dishes

## Core Hypothesis (v0.1)
"If we solve backwards scheduling for just the turkey (including thaw time and rest time), hosts will feel significantly less stressed about holiday meal timing."

This is our riskiest assumption because:
- If this alone doesn't reduce stress, we know multi-dish coordination is essential
- If this DOES reduce stress, we validate the backwards scheduling approach before building complexity
- It's the smallest possible test of our core value proposition

## Success Criteria (v0.1)
- User can input: turkey weight, fresh/frozen status, desired serving time
- System accurately calculates: thaw start time, cook start time, ready time
- User completes the flow without confusion
- Qualitative feedback: "This made me feel more confident about timing"

## What We Learned from V1
V1 attempted to build all features at once, leading to:
- Scope creep and never launching
- Unable to validate core assumptions
- Overwhelming complexity for both builder and users

V2 will ship the smallest possible version first, then iterate based on real user feedback.

## Platform
Mobile-friendly web application for maximum accessibility and ease of distribution.

## Next Steps
1. Create detailed PRD for v0.1
2. Define UX flow and interface spec
3. Define technical architecture
4. Build v0.1 MVP
5. Test with real users before Thanksgiving season
6. Iterate based on feedback
