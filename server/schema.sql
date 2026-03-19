-- schema.sql — Portfolio database schema
-- Run this once to initialize the database.

-- ─── Create Tables ─────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS projects (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  tech_stack  TEXT[],                    -- array of tech names e.g. ARRAY['React', 'Node']
  github_url  VARCHAR(500),
  live_url    VARCHAR(500),
  featured    BOOLEAN DEFAULT false,
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(200) NOT NULL,
  message    TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ─── Seed Sample Projects ──────────────────────────────────────────────────

INSERT INTO projects (title, description, tech_stack, github_url, live_url, featured) VALUES
(
  'Vedic Astro',
  'A web application for exploring Vedic astrology principles and generating personalized birth charts.',
  ARRAY['Java', 'Spring Boot', 'React', 'PostgreSQL'],
  'https://github.com/hi-8055/Vedic-Astro',
  '',
  true
),
(
  'Task management app',
  'A full-stack task management app with real-time collaboration features. Users can create projects, assign tasks, and track progress with a Kanban board interface.',
  ARRAY['React', 'Node.js', 'PostgreSQL'],
  'https://github.com/hi-8055/task-management-api',
  'https://chat-demo.up.railway.app',
  true
),
(
  'Trackfolio: Stock portfolio Tracker',
  'A web application for tracking and analyzing stock portfolios with real-time price updates. Group projects built with Django and PostgreSQL.',
  ARRAY['html', 'css', 'javascript', 'django', 'postgresql'],
  'https://github.com/Bhagirath369/Portfolio-Tracker',
  NULL,
  true
),
(
  'Consciousness in AI using IIT',
  'A research project exploring the application of Integrated Information Theory (IIT) to different types of artificial intelligence systems, aiming to understand and quantify consciousness in AI.',
  ARRAY['Vue.js', 'Node.js', 'Docker', 'AWS', 'Chart.js'],
  NULL,
  NULL,
  false
),
(
  'Decentralized Donation Platform with Customized Blockchain',
  'A decentralized donation platform built on a custom blockchain, allowing users to securely donate to causes and track the impact of their contributions in real-time. A group project utilizing Go for blockchain development and React for the frontend interface.',
  ARRAY['Go'],
  'https://github.com/Roshan310/DaanVeer',
  NULL,
  false
);
