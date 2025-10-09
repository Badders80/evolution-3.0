# 🧾 Evolution Stables Release Notes

Use this log to capture each production deployment for https://www.evolutionstables.nz. Add a new entry every time a feature branch merges into `main` and Vercel promotes it to production.

## Template

### 🗓 Release [version or date]
Date: YYYY-MM-DD  
Deployed by: [Name or initials]  
Branch merged: feature/<branch-name>  
Environment: Production

#### 🔍 Summary
A concise description of the release contents. Example: *Refreshed homepage layout, added new mission section, and adjusted hero animation timings.*

#### 🧩 Components Updated
- `/src/app/page.tsx` — updated hero and section order
- `/components/Navbar.tsx` — fixed mobile overflow
- `/public/images/*` — optimised hero assets

#### 🧪 Testing & Verification
✅ Desktop layout verified (Chrome / Edge)  
✅ Mobile responsive check (iPhone 13 / Android Pixel)  
✅ Supabase login tested and confirmed  
❌ No API or database schema changes  

#### 🧠 Notes / Future Work
- Consider adding animated counters to the stats section.
- Next sprint: integrate podcast preview component.

---

## Example Entry

### 🗓 Release 1.2.3
Date: 2025-10-10  
Deployed by: AB  
Branch merged: feature/update-homepage  
Environment: Production

#### 🔍 Summary
Implemented dual-column layout for Marketplace section and added new typography scale.

#### 🧩 Components Updated
- `/src/components/MarketplaceSection.tsx`
- `/tailwind.config.js`
- `/styles/globals.css`

#### 🧪 Testing & Verification
✅ Desktop and mobile verified  
✅ Image optimisation confirmed  
✅ Login and routing tested  

#### 🧠 Notes / Future Work
- Next build: add horse detail modal with Framer Motion transitions.
