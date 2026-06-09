# Grid Development Standard

## Overview
This document outlines the standard structure, design conventions, and guidelines for developing new decision matrix frameworks within the RuralUtilityCost application.

## Component Structure
Each decision framework MUST adhere to the following principles:
1. **Self-Contained**: Be implemented as a self-contained functional React component.
2. **State Management**: Use standalone `useState` for interactive and transient elements. Use `useGridStore` when data persistence is required across the application.
3. **Styling**: Rely exclusively on Tailwind CSS utility classes. Avoid creating custom CSS classes unless absolutely necessary (e.g., complex keyframe animations).
4. **Animation**: Utilize consistent entrance animations (e.g., `animate-fade-in` wrapper) to provide a polished feel.

## Color Palette & Typography
- **Backgrounds**: `bg-stone-50`, `bg-stone-100`, `bg-white` for clean slate aesthetics.
- **Text / Primary Elements**: Standardize on `stone-800` and `stone-900` for heavy contrast.
- **Positive / Action / Winners**: `emerald-500`, `emerald-600`, `emerald-700` and `emerald-50` for backgrounds.
- **Warnings / Caution**: `amber-500`, `amber-600`
- **Negative / Risks / Cons**: `red-500`, `red-600`, `red-50` for backgrounds.
- **Informational / Neutral Options**: `blue-500`, `purple-500`

## Grid Component Pattern
```tsx
import React, { useState } from 'react';

export const MyNewFramework = () => {
    // 1. Initial State
    const [data, setData] = useState([...]);

    // 2. Handlers
    const handleUpdate = () => { ... }

    // 3. Render logic
    return (
        <div className="animate-fade-in mx-auto bg-white p-6 rounded-xl shadow-sm border border-stone-200">
            {/* Headers, Inputs, Grid layout here */}
        </div>
    );
};
```

## Adding to the Frameworks Library
When adding a new framework format, ensure it is added to the `tabs` array in `/src/pages/GridTemplates.tsx` with its required metadata:
- `name`
- `shortName`
- `icon`
- `desc`
- `whenToUse`
- `whenNotToUse`
- `component` (The React Element)
