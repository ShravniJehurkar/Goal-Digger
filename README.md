# Goal Digger

**Discover · Plan · Grow**

Goal Digger is an Ikigai-inspired career discovery platform that helps individuals understand their interests, strengths, values, and personality to explore suitable career directions.

## Features

- **Self-Discovery Assessment:** 14-question assessment across Passion, Mission, Profession, Vocation, and Personality.
- **Ikigai Profiling:** Generates a personalized profile from assessment responses.
- **Career Recommendations:** Suggests career directions based on user responses.
- **Career Analysis:** Processes interests, education, experience, and career goals.
- **Responsive UI:** Purple-themed interface with glassmorphism and Framer Motion animations.

## Tech Stack

**Frontend:** React, TypeScript, Vite, Tailwind CSS, Framer Motion, Radix UI, Recharts, Wouter.

**Backend:** Node.js, Express.js, TypeScript, Zod.

**Deployment:** Vercel, GitHub.

## How It Works

1. Users complete the self-discovery questionnaire.
2. Responses are submitted to the Express backend.
3. The backend validates and processes the information.
4. The application generates an Ikigai profile and career recommendations.

Career recommendations use application logic, not a trained machine-learning model.

## Getting Started
**1. Install dependencies**

```bash
npm install
```

**2. Start the development server**

```bash
npm run dev
```

Open `http://localhost:5000`.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run check` | Run TypeScript checks |
| `npm run build` | Build frontend and backend |
| `npm start` | Start production server |

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/ikigai-profile` | Process Ikigai assessment responses |
| POST | `/api/career-recommendations` | Generate career recommendations |
| POST | `/api/career-analysis` | Process career-related information |

## Deployment

The application is deployed on Vercel.

- Frontend is built using Vite.
- Backend routes are exposed through a Vercel serverless function.
- GitHub integration enables automatic deployments.

## Future Enhancements

- Detailed career exploration pages.
- Career comparison.
- Personalized skill-gap analysis.
- Learning roadmaps with progress tracking.
- AI-powered career advisor.
- Resume analysis.

## Author

**Shravni Jehurkar**

Computer Science | Artificial Intelligence & Machine Learning

---
## Live Demo

[View Goal Digger](https://goaldigger.vercel.app/)

*Discover your strengths. Find your direction. Build your future.*
