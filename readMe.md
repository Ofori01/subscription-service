# Subscription Service

A Node.js/Express application for managing user subscriptions, with authentication, workflow automation, and email reminders.  
Features integration with MongoDB, Arcjet for security, and QStash for workflow/event handling.

---

## Features

- User registration and authentication (JWT)
- Subscription CRUD operations
- Automated email reminders for renewals
- Rate limiting and bot protection via Arcjet
- Workflow automation with QStash
- Environment-based configuration
- Modular code structure

---

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Ofori01/subscription-service.git
   cd subscription-service
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.development.local` and fill in your credentials (MongoDB URI, JWT secret, Arcjet, QStash, etc.)

---

## Usage

1. **Start the server:**

   ```sh
   npm start
   ```

   The server will run on the port specified in your `.env` file (default: 5050 or 8080).

2. **API Endpoints:**

   - `POST   /api/v1/auth/sign-up` — Register a new user
   - `POST   /api/v1/auth/sign-in` — User login
   - `GET    /api/v1/users/:id` — Get user profile
   - `POST   /api/v1/subscriptions` — Create a subscription
   - `GET    /api/v1/subscriptions/:id` — Get a user's subscriptions
   - `POST   /api/v1/workflow/send-reminders` — Trigger reminder workflow (internal)
   - `GET    /api-docs` — Swagger API documentation (if enabled)

---

## Project Structure

```plaintext
.
├── controllers/
│   ├── auth.controller.js
│   ├── subscription.controller.js
│   └── workflow.controller.js
├── database/
│   └── mongodb.js
├── middlewares/
│   ├── arcjet.middleware.js
│   └── authorization.middleware.js
├── models/
│   ├── user.model.js
│   └── subscription.model.js
├── routes/
│   ├── auth.routes.js
│   ├── user.routes.js
│   └── subscription.routes.js
├── utils/
│   ├── auth.utils.js
│   └── email.js
├── config/
│   ├── env.js
│   ├── arcjet.js
│   └── qtsash.workflow.js
├── app.js
├── package.json
└── .env.development.local
```

---

## Environment Variables

Example `.env.development.local`:

```plaintext
PORT=5050
SERVER_URL=http://localhost:5050
NODE_ENV=development
DB_URI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
QSTASH_URL=http://127.0.0.1:8080
QSTASH_TOKEN=your_qstash_token
NODEMAILER_EMAIL=your_email@example.com
```

---

## Development

- **MongoDB Atlas:** Make sure your IP is whitelisted.
- **Arcjet:** Used for rate limiting and bot detection.
- **QStash:** Used for workflow automation and reminders.
- **Swagger:** (Optional) Add Swagger UI for API docs.

---

## License

MIT

---

## Author

Amoah Ofori Darkwah
