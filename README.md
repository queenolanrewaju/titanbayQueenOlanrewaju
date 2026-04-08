# titanbayQueenOlanrewaju
Titanbay interview take home task
# Titanbay Private Markets API

A RESTful API for managing private market funds, investors, and investments.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Database**: PostgreSQL
- **Language**: TypeScript

## Prerequisites
- Node.js
- PostgreSQL
- pgAdmin 4

For full request/response details refer to the [API Specification](https://storage.googleapis.com/interview-api-doc-funds.wearebusy.engineering/index.html)

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/queenolanrewaju/titanbayQueenOlanrewaju.git
cd titanbayQueenOlanrewaju
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up the database
Create a PostgreSQL database in pgAdmin, then run the following SQL to create the tables:

```sql
CREATE TABLE funds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    vintage_year INTEGER NOT NULL,
    target_size_usd DECIMAL NOT NULL,
    status TEXT CHECK (status IN ('Fundraising', 'Investing', 'Closed')) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE investor (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    investor_type TEXT CHECK (investor_type IN ('Individual', 'Institution', 'Family Office')) NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE investment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fund_id UUID REFERENCES funds(id) NOT NULL,
    investor_id UUID REFERENCES investor(id) NOT NULL,
    amount_usd DECIMAL NOT NULL,
    investment_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. Configure environment variables
Create a `.env.local` file in the root of the project:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=postgres
DB_PASSWORD=your_password
```

### 5. Run the development server
```bash
npm run dev
```
API will be available at `http://localhost:3000`

## API Endpoints

### Funds
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/funds` | Get all funds |
| GET | `/api/funds/:fund_id` | Get a specific fund |
| POST | `/api/funds` | Create a new fund |
| PUT | `/api/funds/:fund_id` | Update an existing fund |

### Investors
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/investors` | Get all investors |
| POST | `/api/investors` | Create a new investor |

### Investments
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/funds/:fund_id/investments` | Get all investments for a fund |
| POST | `/api/funds/:fund_id/investments` | Create a new investment for a fund |

## Design Decisions
- Used **Next.js App Router** with Route Handlers for a modern, clean API structure
- Used **UUID** as primary keys for security and scalability
- Used **foreign key constraints** to ensure data integrity between tables
- Used **CHECK constraints** to validate status and investor_type fields

## AI Tools Used
## AI Tools Used
I used **Claude** throughout this task to assist with:
- Setting up the Next.js and PostgreSQL project structure
- Database SQL queries
- API route implementation and debugging
- Identifying and fixing errors during development
- Filling out missing README documentation

## Testing the API
A Postman collection and environment are included in the repository.
### How to import
1. Open Postman
2. Click **Import**
3. Import both `postman_collection.json` and `postman_environment.json`
4. Select the **Local** environment from the top right dropdown in Postman
5. Update the environment variables with your own values:
    - `base_url` → `http://localhost:3000`
    - `fund_id` → a valid fund UUID from your database
    - `investor_id` → a valid investor UUID from your database

### Recommended testing order
1. Create an investor (`POST /api/investors`)
2. Create a fund (`POST /api/funds`)
3. Create an investment (`POST /api/funds/:fund_id/investments`)
4. Get all funds (`GET /api/funds`)
5. Get all investments for a fund (`GET /api/funds/:fund_id/investments`)

## What I Would Have Done With More Time
### Testing
I would have added Jest integration tests covering:
- Happy path for all 8 endpoints (correct data returns correct response)
- Error cases such as invalid UUIDs, missing fields, and invalid status values
- Foreign key constraint validation (e.g. creating an investment with a non-existent investor)
- Edge cases such as empty tables returning empty arrays

### Other Improvements
- Input validation middleware to validate request bodies before hitting the database
- Pagination for GET all endpoints
- More detailed error messages