# Salesforce Validation Rule Manager

A full-stack web application to manage Salesforce Account object validation rules through a modern dashboard. Built with React.js, Node.js, Express.js, and Salesforce OAuth 2.0.

---

## Live Demo

- **Frontend:** [[Your Vercel URL](https://sales-force-full-stack.vercel.app/)]
- **Backend:** [[Your Render URL](https://salesforce-fullstack-backend.onrender.com/)]

---

## Features

- Salesforce OAuth 2.0 Authentication
- Fetch all validation rules from Salesforce using Tooling API
- Toggle individual validation rules (activate/deactivate)
- Enable or disable all rules at once
- Deploy changes directly to Salesforce
- Real-time stats dashboard (Total, Active, Inactive counts)
- Production-ready architecture with clean folder structure

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js + Vite |
| Styling | Tailwind CSS v3 |
| Backend | Node.js + Express.js |
| Salesforce Integration | jsforce |
| Salesforce API | Tooling API + Metadata API |
| Authentication | OAuth 2.0 |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |

---

## Project Structure

```
SalesForce-FullStack/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── env.js
│   │   │   └── salesforce.js
│   │   ├── constants/
│   │   │   └── messages.js
│   │   ├── controllers/
│   │   │   └── salesforceController.js
│   │   ├── middleware/
│   │   │   ├── asyncHandler.js
│   │   │   └── errorMiddleware.js
│   │   ├── routes/
│   │   │   └── salesforceRoutes.js
│   │   ├── services/
│   │   │   └── salesforceService.js
│   │   ├── utils/
│   │   │   ├── ApiResponse.js
│   │   │   └── logger.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   └── Navbar.jsx
│   │   │   ├── layout/
│   │   │   │   ├── DashboardLayout.jsx
│   │   │   │   └── Sidebar.jsx
│   │   │   └── validationRules/
│   │   │       ├── ValidationRuleCard.jsx
│   │   │       ├── ValidationRuleTable.jsx
│   │   │       └── ValidationToggle.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   └── useValidationRules.js
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── salesforceService.js
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
└── README.md
```

---

## Prerequisites

- Node.js v18+
- Git
- Salesforce Developer Org
- Salesforce Connected App with OAuth 2.0 enabled

---

## Local Development Setup

### Step 1 — Clone the Repository

```bash
git clone https://github.com/MuqhtadeerM/SalesForce-FullStack.git
cd SalesForce-FullStack
```

### Step 2 — Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
SF_LOGIN_URL=https://test.salesforce.com
SF_CLIENT_ID=your_salesforce_consumer_key
SF_CLIENT_SECRET=your_salesforce_consumer_secret
SF_REDIRECT_URI=http://localhost:5000/api/salesforce/auth/callback
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Start the backend server:

```bash
npm run dev
```

Backend runs on: `http://localhost:5000`

### Step 3 — Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## Salesforce Setup

### Step 1 — Create a Developer Org

Sign up at [developer.salesforce.com/signup](https://developer.salesforce.com/signup)

### Step 2 — Create Validation Rules

Go to **Setup → Object Manager → Account → Validation Rules → New**

Create these 5 rules:

| Rule Name | Formula | Error Message |
|---|---|---|
| Phone_Required | `ISBLANK(Phone)` | Phone number is required |
| Website_Required | `ISBLANK(Website)` | Website is required |
| Annual_Revenue_Check | `AnnualRevenue <= 0` | Annual Revenue must be greater than 0 |
| Account_Name_Length | `LEN(Name) < 5` | Account name must be at least 5 characters |
| Billing_City_Required | `ISBLANK(BillingCity)` | Billing city is required |

### Step 3 — Create Connected App

1. Go to **Setup → App Manager → New Connected App**
2. Fill in basic details (App Name, Contact Email)
3. Check **Enable OAuth Settings**
4. Set Callback URL:
   ```
   http://localhost:5000/api/salesforce/auth/callback
   ```
5. Add OAuth Scopes:
   - Manage user data via APIs (api)
   - Full access (full)
   - Perform requests at any time (refresh_token, offline_access)
6. Under **Flow Enablement**, check **Enable Authorization Code and Credentials Flow**
7. Under **Security**, uncheck **Require Proof Key for Code Exchange (PKCE)**
8. Save and wait 2-10 minutes for activation
9. Click **Manage Consumer Details** to get your Consumer Key and Secret

### Step 4 — Update .env

```env
SF_CLIENT_ID=your_consumer_key
SF_CLIENT_SECRET=your_consumer_secret
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/salesforce/login` | Redirect to Salesforce OAuth login |
| GET | `/api/salesforce/auth/callback` | OAuth callback handler |
| GET | `/api/salesforce/validation-rules` | Fetch all validation rules |
| POST | `/api/salesforce/toggle/:id` | Toggle a single rule by ID |
| POST | `/api/salesforce/toggle-all` | Enable or disable all rules |
| POST | `/api/salesforce/deploy` | Deploy and confirm changes in Salesforce |

---

## Deployment

### Backend — Render

1. Go to [render.com](https://render.com) and sign up with GitHub
2. Click **New → Web Service**
3. Connect your GitHub repository
4. Configure:

| Field | Value |
|---|---|
| Root Directory | `backend` |
| Build Command | `npm install` |
| Start Command | `npm start` |

5. Add environment variables:

```
PORT=5000
SF_LOGIN_URL=https://test.salesforce.com
SF_CLIENT_ID=your_consumer_key
SF_CLIENT_SECRET=your_consumer_secret
SF_REDIRECT_URI=https://your-render-url.onrender.com/api/salesforce/auth/callback
CLIENT_URL=https://your-vercel-url.vercel.app
NODE_ENV=production
```

6. Click **Create Web Service** and copy your Render URL

### Frontend — Vercel

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click **New Project** and import your repository
3. Configure:

| Field | Value |
|---|---|
| Root Directory | `frontend` |
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |

4. Click **Deploy** and copy your Vercel URL

### After Both Deployments — Update These 3 Places

1. **Render Environment** — update `SF_REDIRECT_URI` and `CLIENT_URL` with real URLs
2. **Salesforce Connected App** — update Callback URL with your Render URL
3. **frontend/src/services/api.js** — update `BASE_URL` with your Render URL

---

## Assignment Requirements Checklist

- Salesforce Developer Org created
- 5 Validation Rules created on Account object
- Connected App created with OAuth 2.0
- Login button to connect to Salesforce org
- Fetch all validation rules using Tooling API
- Show validation rules list with Active/Inactive status
- Toggle single validation rule
- Enable all / Disable all rules
- Deploy changes to Salesforce
- Application deployed on online server

---

## Environment Variables Reference

| Variable | Description | Example |
|---|---|---|
| `PORT` | Server port | `5000` |
| `SF_LOGIN_URL` | Salesforce login URL | `https://test.salesforce.com` |
| `SF_CLIENT_ID` | Connected App Consumer Key | `3MVG9...` |
| `SF_CLIENT_SECRET` | Connected App Consumer Secret | `1D76C...` |
| `SF_REDIRECT_URI` | OAuth callback URL | `http://localhost:5000/api/salesforce/auth/callback` |
| `CLIENT_URL` | Frontend URL | `http://localhost:5173` |
| `NODE_ENV` | Environment | `development` or `production` |

---

## Author

**Muhammed Muzawar**
- Email: muhammedmuzawar9@gmail.com
- GitHub: [MuqhtadeerM](https://github.com/MuqhtadeerM)

---

## License

MIT
