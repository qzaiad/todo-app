# Todo App ?

A lightweight, accessible Arabic-first Todo app built with vanilla JavaScript and Vite.

---

## Features

### Add Tasks
Type a task in the search bar and click **?????** or press **Enter** to add it to the list.

### Delete Tasks
Click the basket icon on any task to delete it. A confirmation prompt prevents accidental deletions.

### Complete Tasks
Click or press **Enter** on the checkbox to mark a task as done. Completed tasks are visually styled and automatically moved to the bottom of the list.

### Reorder Tasks
Drag and drop tasks using the drag handle (?) on the left to rearrange them in any order.

### Hide / Show Completed Tasks
Toggle the **????? / ????? ?????? ????????** button to show or hide completed tasks.

### Dark Mode
Click the **????? ??????** button in the header to switch between light and dark themes. Your preference is saved and restored on the next visit.

### Persistent Storage
All tasks and theme preferences are saved to `localStorage` ? your data survives page reloads and browser restarts.

### Accessibility
- Checkboxes are fully keyboard-navigable (Tab to move, Enter to toggle)
- Focus is preserved after toggling a task
- Proper `role`, `tabindex`, and `alt` attributes throughout

---

## Tech Stack

- Vanilla JavaScript (ES Modules)
- SCSS
- Vite
- localStorage

---

## Getting Started

```bash
# Install dependencies
npm install

# Start server
npm run start

# Build for production
npm run build
```