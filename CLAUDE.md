# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack (runs on port 3001 if 3000 is occupied)
- `npm run build` - Build production bundle with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Project Architecture

This is a Next.js 15 real estate calculator application with the following structure:

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4.1.13
- **Fonts**: Geist Sans & Geist Mono from Google Fonts
- **Locale**: Korean (ko) - UI text is primarily in Korean

### Application Structure

**Main Calculator Types**:
1. **Purchase Cost Calculator** (`/calculators/purchase-cost`) - Calculates all costs involved in real estate purchases including acquisition tax, registration tax, brokerage fees
2. **DSR Calculator** (`/calculators/dsr`) - Calculates Debt Service Ratio for mortgage eligibility
3. **Subscription Calculator** (`/calculators/subscription`) - Provides information about Korean housing subscription system

**Key Pages**:
- `/` - Landing page with calculator overview and navigation
- `/calculators` - Calculator listing page with detailed feature descriptions
- `/calculators/[type]` - Individual calculator implementations
- `/info` - Real estate information page
- `/about` - About page

### Code Patterns

**Component Structure**:
- Uses functional components with TypeScript interfaces
- Client components are marked with `'use client'` directive
- State management uses React hooks (useState)
- Consistent header/footer layout across pages

**Styling Conventions**:
- Tailwind CSS with gradient backgrounds (`bg-gradient-to-br from-blue-50 to-indigo-100`)
- Consistent color scheme: blue primary, gray text, white cards
- Responsive design with `md:`, `lg:` breakpoints
- Card-based UI with `rounded-xl shadow-lg` styling
- Hover effects with `transition-all duration-300 transform group-hover:-translate-y-1`

**Calculator Implementation Pattern**:
- Form inputs with number formatting and validation
- Real-time calculation with detailed breakdown
- Results display with formatted Korean currency (`toLocaleString('ko-KR')`)
- Reference information sections with disclaimers

**Navigation**:
- Consistent header with logo link to home and navigation menu
- Uses Next.js `Link` component for client-side routing
- Active page highlighting in navigation

### Domain-Specific Logic

**Tax Calculations** (Purchase Cost Calculator):
- Acquisition tax rates based on property price tiers (1-4%)
- First-time buyer discounts and multiple property owner surcharges
- Registration tax and education tax calculated as percentages of acquisition tax
- Stamp tax based on property value brackets
- Korean tax law compliance (2024 standards)

**Korean Real Estate Context**:
- All monetary values in Korean Won (원)
- Korean housing subscription system (청약)
- DSR (Debt Service Ratio) calculations for Korean banking regulations
- Korean tax brackets and regulations

### Development Notes

- Development server uses Turbopack for faster builds
- No existing test framework detected
- No linting configuration beyond basic ESLint
- Application targets Korean users with Korean language UI
- All calculator results include disclaimers about consulting professionals