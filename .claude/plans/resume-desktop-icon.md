# Implementation Plan: Resume.pdf Desktop Icon

## Context
The user wants a comprehensive "Resume.pdf" desktop icon that:
- Displays a classic XP document icon with PDF badge
- Has selection highlighting (blue) on single click
- On double-click: (1) downloads the PDF, (2) opens a Notepad window showing resume text
- Notepad window includes functional menu items: File > Print, Edit > Copy All
- Icon label "Resume.pdf" with XP-style text wrapping

## Current State Analysis

### Existing Components
- **DesktopIcon** (`src/components/DesktopIcon.jsx`): Basic icon with hover but NO selection state
- **XPDesktop** (`src/components/XPDesktop.jsx`): Manages `activeWindows` state, opens windows via `handleOpenWindow`
- **XPWindow** (`src/components/XPWindow.jsx`): Window wrapper with title bar, menu bar placeholder, content area
- **MyComputer** & **StartMenu**: Already have resume links pointing to `'/New%20Resume.pdf'`

### Icon Assets
- `public/icons/notepad.png`: Classic notepad icon available
- Need to create a composite icon: document + PDF badge (will create inline SVG component)

## Design Decisions

### Icon Selection State
- Track `selectedIconId` in `XPDesktop` state
- Pass `isSelected` prop to `DesktopIcon`
- Selection styling: blue border and background similar to XP selected icons (`bg-[#316AC5]/80 border-[#316AC5]`)

### Double-Click Behavior
- Must trigger TWO actions: download + open notepad window
- Use `onDoubleClick` handler on DesktopIcon
- **Download**: Create a temporary `<a>` tag with `href="/New%20Resume.pdf"` and `download` attribute, programmatically click
- **Notepad Window**: Call `handleOpenWindow` with a new unique ID (e.g., `'resume-notepad'`) and a new `ResumeNotepad` component

### ResumeNotepad Component
- **New file**: `src/components/ResumeNotepad.jsx`
- Uses `XPWindow` structure with:
  - Menu bar with functional File > Print and Edit > Copy All
  - Text area with resume contents (plain text)
- **Text content**: The actual resume content will be displayed as plain text. Since we have a PDF, we'll either:
  - Embed a static text version in the component (simplest)
  - Fetch and convert PDF to text (complex, requires library)
  - **Decision**: Embed a placeholder text structure; user can replace with actual content later

### PDF Document Icon
- Create a new `ResumeDocumentIcon` component (inline in XPDesktop or separate)
- Combines: document base shape + PDF red badge with "PDF" text
- Use SVG for crisp rendering, similar to XP style

## Implementation Steps

### Step 1: Create ResumeNotepad Component
`src/components/ResumeNotepad.jsx`
- Import React, useState
- Define static resume text content (multi-line string)
- Implement menu handlers:
  - `handlePrint`: `window.print()` (or print content area specifically)
  - `handleCopyAll`: `navigator.clipboard.writeText(resumeText)` with error feedback (status bar)
- Render:
  - Menu bar (already in XPWindow, but we need to make it functional)
  - Status bar (already in XPWindow, can show "X characters selected")
  - Content area: `<pre>` or `<textarea>` with resume text
  - Add custom CSS to make it look like Notepad (monospace font, black text, white bg, margins)

### Step 2: Create PDF Document Icon
`src/components/ResumeDocumentIcon.jsx` OR inline SVG in XPDesktop
- SVG with:
  - White page with slight shadow
  - Folded corner (classic XP document look)
  - Red rounded badge in bottom-right with "PDF" text in white
- Size: 40x40 viewport, scales properly

### Step 3: Update DesktopIcon
`src/components/DesktopIcon.jsx`
- Accept `isSelected` boolean prop
- Change conditional classes:
  - If selected: `bg-[#316AC5]/80 border border-[#316AC5]` (XP selection blue)
  - Default: `border border-transparent hover:bg-[#316AC5]/40 hover:border-[#316AC5]/40`
- Remove hover group styling conflict if needed

### Step 4: Update XPDesktop
`src/components/XPDesktop.jsx`

**State additions:**
```javascript
const [selectedIconId, setSelectedIconId] = useState(null);
```

**New icon in desktop grid:**
Add after existing icons:
```jsx
<DesktopIcon
    label="Resume.pdf"
    icon={<ResumeDocumentIcon />}  // or "/icons/notepad.png" with badge overlay
    isSelected={selectedIconId === 'resume-pdf'}
    onClick={() => setSelectedIconId('resume-pdf')}
    onDoubleClick={() => {
        handleOpenWindow('resume-notepad', 'Resume.pdf - Notepad', <ResumeNotepad />);
        triggerDownload();
    }}
/>
```

**triggerDownload helper:**
```javascript
const triggerDownload = () => {
    const link = document.createElement('a');
    link.href = '/New%20Resume.pdf';
    link.download = 'Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
```

**Add to defaultContent:**
```javascript
'resume-notepad': <ResumeNotepad />,
```

## Files to Modify
1. `src/components/DesktopIcon.jsx` - Add `isSelected` prop support
2. `src/components/XPDesktop.jsx` - Add icon, state, handlers
3. `src/components/ResumeNotepad.jsx` - New component (create)
4. `src/components/ResumeDocumentIcon.jsx` - New component (create) OR inline

## Testing Strategy
1. Run dev server (`npm run dev`)
2. Verify "Resume.pdf" icon appears on desktop
3. Single-click: Icon should get blue highlight
4. Double-click:
   - Browser should download `New Resume.pdf`
   - Notepad window opens titled "Resume.pdf - Notepad"
5. In Notepad:
   - Menu bar shows File, Edit, etc.
   - Click File > Print: opens browser print dialog
   - Click Edit > Copy All: copies all text to clipboard, status bar shows confirmation
6. Text content is readable, monospace
7. Clicking other icons deselects Resume.pdf

## Notes
- The resume text will be static until manually updated; recommend adding a `resumeText.js` constant later
- PDF icon will be custom SVG to match XP aesthetic
- Selection state is exclusive (only one icon selected at a time)
- No external dependencies needed
