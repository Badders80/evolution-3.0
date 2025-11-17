# Evolution Engine — Module Overview

This folder contains all internal application modules for Evolution Stables.

Each module lives in its own folder and follows strict architectural rules defined in `/ENGINE_DEV_BRIEF.md`.

## Current Modules

### `/owners`
Handles:
- Owner onboarding  
- Horse submission  
- Term Sheet entry  
- Validation  
- Document generation triggers  
- NZTR + Tokinvest metadata creation  

### `/valuation`
Reserved for the lease/return modelling engine.

### `/studio`
Reserved for media + content pipelines (Evolution Studios module).

---

## Rules

1. Do not place business logic inside components.  
2. Only write Engine code inside this folder or companion folders:  
   - `/lib/owners`  
   - `/services/owners`  
   - `/types/owners`  
3. All fields must originate from `termSheetSchema.ts`.  
4. No module may depend on another module.  
5. Follow architecture in ENGINE_DEV_BRIEF.md.  

---

## Purpose

This folder represents the functional core of Evolution Stables.  
Everything here must be predictable, structured, and compliant — built to scale.
