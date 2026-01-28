# UltraCAD: Architectural Vector Drafting Suite

## 1. Project Overview
Build a professional-grade, vector-based architectural drafting suite. The application must handle precision vector math, dynamic dimensioning, and layer management with zero placeholders.

### Tech Stack:
- **Next.js 14+** (App Router)
- **Tailwind CSS** (Styling)
- **Paper.js** (Vector Engine)
- **Lucide React** (Icons)
- **Zustand** (State)

---

## 2. Core Engine Logic (`/src/lib/cad-engine.ts`)
Implement the following mathematical utilities:

- **Grid System**: 40px base grid.
- **Scaling**: 10px = 1mm.
- **Snapping**: `snap(point)` function to round coordinates to the nearest 40px.
- **Measurements**:
  - `getLength(path)`: `(path.length / 10)` in mm.
  - `getArea(path)`: `(Math.abs(path.area) / 100) / 10000` in $m^2$.
  - `getAngle(p1, p2)`: Polar angle calculation for HUD display.

---

## 3. UI Framework & Styling

### Color Palettes
- **Dark Mode (Default)**:
  - BG: `#050505`
  - Sidebar: `#0a0a0a`
  - Accents: `#fbbf24` (Amber)
  - Grid: `#111`
- **Light Mode**:
  - BG: `#fcfcfc`
  - Sidebar: `#f4f4f5`
  - Accents: `#d97706` (Deep Orange)
  - Grid: `#e5e5e5`

### Layout
- **Header**: Title, Tool Switcher (Select, Line, Rect, Circle, Poly, Eraser), Mode Toggle, Export PNG.
- **Left Sidebar**:
  - **Layer Manager**: Walls, Furniture, Electrical (Toggle Visibility/Active).
  - **Project Tree**: List of all drawn paths with unique IDs.
- **Right Sidebar**:
  - **Properties Inspector**: Inputs for Width/Length and Rotation.
  - **Action Buttons**: Rotate 90°, Perspective Skew (Shear Matrix), Purge.

---

## 4. Functional Requirements (The "Blind" Build)

### Dynamic Dimensioning
- When drawing a line, a `paper.PointText` must appear exactly at the segment center showing `[length]mm`.
- When drawing a rectangle/shape, the label must show `[area]m²`.
- Labels must update in real-time during `onMouseDrag`.

### Connectivity & Selection
- Selected items must show Blue Anchors at every vertex (`item.fullySelected = true`).
- Selecting an item must populate the Properties Inspector with its current dimensions.

### Layer System
- **Walls**: Amber strokes (3px).
- **Furniture**: Blue strokes (1.5px).
- **Electrical**: Green strokes (1.5px).

### Image Export
- The **Export PNG** button must capture the `canvas.toDataURL()` and trigger a browser download.

---

## 5. File Structure to Generate

### `src/store/useCadStore.ts` (TypeScript)
```typescript
import { create } from 'zustand';

export const useCadStore = create((set) => ({
  tool: 'select',
  activeLayer: 'Walls',
  mode: 'dark',
  setTool: (tool) => set({ tool }),
  setActiveLayer: (layer) => set({ activeLayer: layer }),
  toggleMode: () => set((state) => ({ mode: state.mode === 'dark' ? 'light' : 'dark' })),
}));
```

### `src/components/Editor.tsx`
Full implementation of Paper.js `useEffect` hook, handling tool events, grid rendering, and reactive updates to the React UI.

---
### make sure to use 
- rotation 90
- perspective skew (shear matrix)
- purge
- export png
- RADIO ANGLE
- MEASURING SCALE
- project tree is important 
- smart snapping
- text tool is important

## 6. Verification Checklist
- [ ] Does the grid change color when toggling Light/Dark mode?
- [ ] Do dimensions move with the shapes?
- [ ] Does the "Apply" button in the Properties Inspector change the object size?
- [ ] Does the "Export PNG" button capture the canvas and trigger a download?
- [ ] Does the "Purge" button remove all selected objects?
- [ ] Does the "Rotate 90°" button rotate the selected object by 90 degrees?
- [ ] Does the "Perspective Skew" button apply a shear matrix to the selected object?
- [ ] Does the "Radio Angle" button allow the user to select an angle for rotation?
- [ ] Does the "Measuring Scale" button allow the user to select a scale for measurements?
- [ ] Does the "Project Tree" display all objects in the canvas?
- [ ] Does the "Smart Snapping" button enable snapping to other objects?
- [ ] Does the "Layer Manager" allow the user to toggle visibility and active state of layers?
- [ ] Does the "Properties Inspector" display the current dimensions of the selected object?
- [ ] Does the "Properties Inspector" allow the user to change the dimensions of the selected object?
- [ ] Does the "Properties Inspector" allow the user to change the rotation of the selected object?
- [ ] Does the "Properties Inspector" allow the user to change the perspective skew of the selected object?
- [ ] Does the "Properties Inspector" allow the user to change the measuring scale of the selected object?
- [ ] Does the "Properties Inspector" allow the user to change the text of the selected object?
