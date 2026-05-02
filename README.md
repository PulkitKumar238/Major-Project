# Event Sphere: A Unified Academic Event Aggregation Portal

> A comprehensive web-based platform that leverages web scraping and machine learning to consolidate, classify, and recommend academic events—reducing event search time by 70%.

---

## Project Report

**Title:** Event Sphere: A Unified Academic Event Aggregation Portal
**Session:** 2025-26
**Project Guide:** Mr. Omprakash Kushwaha (Assistant Professor, CSE)
**Developed By:** 
- Pulkit Kumar (2200290100125)
- Drishan Drishy (2200290100066)
- Harshita Mishra (2200290100083)
- Rishabh Gupta (2200290100128)
**Institution:** Department of Computer Science and Engineering, KIET Group of Institutions, Ghaziabad, India
**Affiliation:** Dr. A.P.J. Abdul Kalam Technical University, Lucknow

---

## Description

Locating suitable academic events (conferences, seminars, workshops, symposia) is often a challenging and time-consuming process. Information is heavily dispersed across various university websites, emails, and social media platforms, leading to missed opportunities and inefficient use of valuable academic time. Studies indicate researchers can spend up to 8–12 hours a month searching for events, with nearly 30% of that time wasted due to fragmented sources.

**Event Sphere** addresses this by providing an automated, centralized platform that aggregates scholarly events into one unified interface. The system gathers, sorts, and displays events automatically, utilizing **web scraping**, **machine learning-based classification**, and **recommendation techniques** to provide personalized event suggestions tailored to individual interests.

### Key Objectives & Results

| Feature / Objective | Description & Impact |
|---|---|
| **Automated Aggregation** | Consolidates national and international events from diverse fragmented sources. |
| **ML Classification** | Automatically categorizes events by subject area/domain using ML and NLP techniques. |
| **Smart Recommendations** | Provides personalized event suggestions based on user profiles and past interactions. |
| **Time Efficiency** | Test results indicate that Event Sphere reduces the time spent searching for events by **70%**. |

---

## Repository Structure

```
Major-Project/
├── backend/                              # Node.js + Express Backend
│   ├── src/                              # API routes, controllers, models
│   ├── .env.example                      # Environment variables template
│   ├── package.json                      # Backend dependencies
│   └── index.js                          # Server entry point
├── frontend/                             # Next.js Frontend
│   ├── app/                              # Next.js App Router
│   ├── components/                       # Reusable React components
│   ├── lib/                              # ML integration & utilities
│   ├── package.json                      # Frontend dependencies
│   └── next.config.ts                    # Next.js configuration
├── Literature/                           # Reference Materials
│   └── .keep                             # Placeholder for literature files
├── README.md                             # Project documentation
├── Instruction to run.txt                # Detailed setup instructions
├── Event Sphere_ A Unified Academic Event Aggregation Portal -2.pdf  # Final Project Report
├── Major-Project-Synopsis.docx           # Project Synopsis
└── EventSphere Presentation Final.pptx   # Project Presentation
```

---

## Requirements

### Software

| Requirement | Version | Notes |
|---|---|---|
| Node.js | v18.0 or later | Required for running both the frontend and backend |
| npm | v8.0 or later | Standard Node Package Manager |
| MongoDB | 6.0 or later | Local installation or MongoDB Atlas cluster |

### Hardware

| Component | Minimum | Recommended |
|---|---|---|
| RAM | 4 GB | 8 GB |
| CPU | Dual-core 2.0 GHz | Quad-core |
| Storage | 500 MB | 1 GB SSD |

---

## Quick Start

Please refer to the `Instruction to run.txt` file in this repository for detailed setup and installation instructions.

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env   # Update PORT, MONGO_URI, JWT_SECRET
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

**Access the application:** Open your browser and navigate to `http://localhost:3000`.

---

## Technologies Used

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js 15 (React 19), Tailwind CSS, Framer Motion, Lucide React |
| **Backend** | Node.js, Express.js, Mongoose, JWT |
| **Database** | MongoDB |
| **Data Processing** | Machine Learning, NLP, Web Scraping |

---

## Contact

| Name | Role | Email |
|---|---|---|
| Pulkit Kumar | Developer | - |
| Drishan Drishy | Developer | - |
| Harshita Mishra | Developer | - |
| Rishabh Gupta | Developer | - |
| Mr. Omprakash Kushwaha | Project Guide | - |

---

## License

This project was developed for academic research purposes as part of a B.Tech final year project at KIET Group of Institutions, Ghaziabad (Session 2025-26), affiliated to Dr. A.P.J. Abdul Kalam Technical University, Lucknow.
