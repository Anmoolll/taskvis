# 💰 Personal Finance Visualizer

A simple and responsive web application to help users track their personal finances, categorize spending, and visualize monthly expenses.

## 🚀 Features

### ✅ Stage 1: Basic Transaction Tracking

- ➕ Add, ✏️ Edit, and ❌ Delete financial transactions
- 📄 View a list of all transactions (amount, date, description)
- 📊 Visualize monthly expenses using a Recharts bar chart
- 🧪 Basic form validation with helpful error messages
- 🏷️ Assign transactions to predefined categories (e.g., Food, Rent, Utilities)

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [shadcn/ui](https://ui.shadcn.com)
- **Charts**: [Recharts](https://recharts.org/)
- **Backend / Database**: [MongoDB](https://www.mongodb.com/)
- **Styling**: Tailwind CSS (via shadcn/ui)
- **Validation**: Zod or built-in form checks

---

## 📱 Responsive Design

- Fully responsive across devices
- Clean UI with consistent spacing and layout
- Includes error states for form and API interactions

---

## 📦 Getting Started

### 1. Clone the repo
```bash
https://github.com/Anmoolll/taskvis.git
cd taskvisul
```

2. Install dependencies

```bash
npm install
# or
yarn
```

3. Set up environment variables
Create a .env.local file and configure:
```bash
MONGODB_URI=your_mongodb_connection_string
```

4. Run the development server
``` bash
npm run dev
```
Visit http://localhost:3000 to view the app.

🧪 Scripts
```bash

npm run dev       # Run development server
npm run build     # Build for production
npm run lint      # Run ESLint checks

```
