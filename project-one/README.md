# Order Summary Dashboard (Next.js)

## Overview

This project is a **Next.js (App Router)** application built to display and analyze **order summary data** with advanced filtering and drill-down capabilities.

### Key Features
- Server-side data fetching with **Next.js App Router**
- Order summary table with:
  - Category / Subcategory grouping
  - Buy / Sell / Remaining quantity & amount
  - Expandable rows (by grade)
- Advanced filters:
  - Date range
  - Order ID
  - Category / Subcategory
  - Grade (A–D)
  - Price range
- Filter state synced via **URL search params**
- Clean UI using **Material UI (MUI)**

---

## Tech Stack

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **Material UI (MUI)**
- Server Components + Client Components

---

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Install dependencies
```bash
npm install
```

---

## Development
### Start development server
```bash
npm run dev
```

Open your browser at:
```bash
http://localhost:3000
```

---

## Notes

- Filters are applied via URL query parameters, so:

    - Sharing a URL preserves filter state

    - Refreshing the page resets filters (by design)

- UI components follow MUI best practices for consistency and accessibility