# Resilient Email Service
## Overview
This project implements a resilient email service in TypeScript. It ensures reliable email sending through retry logic, fallback mechanisms between providers, rate limiting, and status tracking. The service simulates email sending using mock providers and allows easy configuration for future integration with real email services.
## Features
- *Retry mechanism* with exponential backoff
- *Fallback* between email providers in case of failure
- *Rate limiting* to prevent excessive email sends
- *Status tracking* for each email attempt
## Prerequisites
- *Node.js* 
- *npm* (>=6.x)
- *Git* for version control
### Setup Instructions
Follow these steps to set up the project locally:
1. *Clone the Repository*:
   First, clone this repository to your local machine:
   ```bash
   git clone https://github.com/your-username/resilient-email-service.git
   cd resilient-email-service
###Run the Project
    npx ts-node ./src/index.ts
