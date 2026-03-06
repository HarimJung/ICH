# ICH Website Redesign — Prototype

## PROJECT CONTEXT
This is a working prototype for the ICH (International Council for Harmonisation) website redesign RFP.
Client: ICH — a global regulatory body whose members include FDA, EMA, PMDA, Health Canada.
Purpose: Demonstrate our understanding of the RFP scope and our execution capability.
This is NOT a charity/donation nonprofit. ICH is a regulatory institution. Design must reflect authority, trust, and information accessibility — like WHO, EMA, or OECD websites.

## TECH STACK (STRICT)
- Next.js 14 (App Router, TypeScript)
- Tailwind CSS 4
- Inter font (Google Fonts) + JetBrains Mono for guideline IDs
- Lucide React icons
- D3.js for any data visualization
- Local JSON mock data (NO external API calls, NO database)
- Deploy target: Vercel

## DESIGN SYSTEM (FOLLOW EXACTLY)

### Colors (Tailwind config)
primary: '#003B5C' // ICH Blue — header, nav, main buttons, section titles
secondary: '#00838F' // ICH Teal — links, accents, badges, category icons
accent: '#D4A843' // Warm Gold — "What's New" badge, highlights (minimal use)
background: '#F7F8FA' // Off-White — main content background
surface: '#FFFFFF' // White — cards, modals, search results
textPrimary: '#1A1A2E' // Charcoal — body text, headings
textSecondary: '#5A6275' // Mid Gray — metadata, dates, subtitles
border: '#DDE1E6' // Light Gray — card borders, dividers, tables
success: '#198754' // Green — Step 5 badge
warning: '#E6930A' // Amber — Step 2b badge
error: '#DC3545' // Red — error states

### Typography
- H1: Inter Bold 32px, color textPrimary, line-height 1.25
- H2: Inter SemiBold 24px, color textPrimary, line-height 1.3
- H3: Inter SemiBold 20px, color textPrimary, line-height 1.35
- Body: Inter Regular 16px, color textPrimary, line-height 1.6
- Small/Meta: Inter Regular 14px, color textSecondary, line-height 1.5
- Guideline ID: JetBrains Mono Regular 14px, color secondary
- Nav: Inter Medium 15px

### Spacing
8px base grid: 8, 16, 24, 32, 48, 64, 96
- Section gap: 64px
- Card padding: 24px
- Card gap: 16px
- Max content width: 1200px, horizontal padding 24px

### Cards
- Background: surface (#FFFFFF)
- Border: 1px solid border (#DDE1E6)
- Border-radius: 8px
- Shadow: 0 1px 3px rgba(0,0,0,0.06)
- Hover: shadow 0 4px 12px rgba(0,0,0,0.1)

### Step Badges (pill shape, rounded-full, px-3 py-1, text-xs font-semibold)
- Step 1: bg-gray-100 text-gray-600
- Step 2a: bg-amber-50 text-amber-700
- Step 2b: bg-amber-100 text-amber-800
- Step 3: bg-teal-50 text-teal-700
- Step 4: bg-blue-50 text-blue-800
- Step 5: bg-green-50 text-green-800

### Category Badges
- Quality: bg-blue-50 text-primary border-blue-200
- Safety: bg-red-50 text-red-700 border-red-200
- Efficacy: bg-purple-50 text-purple-700 border-purple-200
- Multidisciplinary: bg-teal-50 text-secondary border-teal-200

## MOCK DATA REQUIREMENTS

### guidelines.json — 40 real ICH guidelines
Each entry:
```json
{
  "id": "Q1A(R2)",
  "title": "Stability Testing of New Drug Substances and Products",
  "category": "Quality",
  "step": 5,
  "currentVersion": "R2",
  "dateReached": "2003-02-06",
  "lastUpdated": "2003-02-06",
  "description": "Provides guidance on stability testing protocols...",
  "pdfUrl": "#",
  "relatedGuidelines": ["Q1B", "Q1C", "Q1D", "Q1E"],
  "relatedTraining": ["TRN-Q1A-01"],
  "hasActiveConsultation": false,
  "implementationStatus": { "FDA": true, "EMA": true, "PMDA": true, "HC": true, "ANVISA": true },
  "tags": ["stability", "new drug substance", "photostability", "ICH"]
}
```

Include ALL of these real ICH guidelines with accurate IDs, titles, categories, and steps:

Quality (Q): Q1A(R2), Q1B, Q1C, Q1D, Q1E, Q2(R2), Q3A(R2), Q3B(R2), Q3C(R8), Q3D(R2), Q5A(R2), Q5C, Q5E, Q6A, Q6B, Q7, Q8(R2), Q9(R1), Q10, Q11, Q12, Q13, Q14
Safety (S): S1A, S1B(R1), S2(R1), S3A, S5(R3), S6(R1), S7A, S7B(R2), S8, S9, S10, S11, S12
Efficacy (E): E2A, E6(R2), E8(R1), E9(R1), E14, E17, E19, E20
Multidisciplinary (M): M1(R1), M2, M3(R2), M4(R4), M7(R2), M10, M13A

### training.json — 15 training modules
Each entry:
```json
{
  "id": "TRN-Q8-01",
  "title": "Pharmaceutical Development (Q8) — Implementation Guide",
  "type": "video",
  "duration": "45 min",
  "relatedGuideline": "Q8(R2)",
  "category": "Quality",
  "language": "English",
  "datePublished": "2024-03-15",
  "thumbnail": "/placeholder-training.svg"
}
```
