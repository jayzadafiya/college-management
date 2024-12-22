# College Data Management API

This project is a backend application built using **NestJS** and **PostgreSQL** to manage and query college-related data. The application allows querying college placement information, college courses, and filtering colleges by city and state. The system is designed to handle millions of rows of data with optimized performance.

## Live Deployment

- **API URL**: [https://college-management-uzav.onrender.com](https://college-management-uzav.onrender.com)
- **Swagger Documentation**: [https://college-management-uzav.onrender.com/api](https://college-management-uzav.onrender.com/api)

## Technologies Used

- **NestJS**: Framework for building efficient, scalable Node.js server-side applications.
- **Prisma ORM**: A powerful ORM for database interactions.
- **PostgreSQL**: Relational database used to store the data.
- **TypeScript**: Language for building the application.
- **Docker** (Optional for deployment): For containerization of the application.

## Database Design

The database consists of the following tables:

1. **Colleges Table**:

   - `id` (Primary Key)
   - `name`
   - `score`
   - `city_id` (Foreign Key to `Cities` table)
   - `state_id` (Foreign Key to `States` table)

2. **College_Placement Table**:

   - `id` (Primary Key)
   - `college_id` (Foreign Key to `Colleges` table)
   - `year`
   - `highest_placement`
   - `average_placement`
   - `median_placement`
   - `placement_rate`

3. **College_Wise_Course Table**:

   - `id` (Primary Key)
   - `college_id` (Foreign Key to `Colleges` table)
   - `course_name`
   - `course_duration`
   - `course_fee`

4. **Cities Table**:

   - `id` (Primary Key)
   - `name`

5. **States Table**:
   - `id` (Primary Key)
   - `name`

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or higher)
- **PostgreSQL**
- **Prisma CLI**: `npm install @prisma/cli --save-dev`

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your PostgreSQL database:

   - Create a PostgreSQL database and note down the connection credentials.
   - Update the `.env` file with your database connection URL:

   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME?schema=public"
   ```

4. Run Prisma migrations to set up the database schema:

   ```bash
   npx prisma migrate dev
   ```

5. Seed the database (Optional):

   If you have seed data, you can seed the database using:

   ```bash
   npx prisma db seed
   ```

### Running the Application

1. Start the application:

   ```bash
   npm run start
   ```

2. The API should now be available at `http://localhost:3000`.

### API Endpoints

1. **College Placements Data**

   - **Endpoint**: `/college_data/[college_id]`
   - **Section 1**: `avg_section`

     - Returns the average of placement fields grouped by year (excluding null or 0 values).

   - **Section 2**: `placement_section`
     - Returns all placement rows for the college, with an additional `placement_trend` field that compares the placement rate for the last two years and indicates if it increased (UP) or decreased (DOWN).

2. **College Courses Data**

   - **Endpoint**: `/college_courses/{college_id}`
     - Returns all rows from the `College_Wise_Course` table for the given `college_id`.
     - Results are sorted in descending order of `course_fee`.

3. **City and State Filter for Colleges**
   - **Endpoint**: `/colleges`
     - **Query Parameters**:
       - `city`: Filters colleges by the specified city.
       - `state`: Filters colleges by the specified state.
   - Example usage:
     - `/colleges?city=New York`
     - `/colleges?state=California`

### Optimizing for Millions of Rows

This application is designed to handle millions of rows in the database by:

- Using **Prisma ORM** to efficiently query the database.
- Indexing key columns (e.g., `college_id`, `year`, `city_id`, `state_id`) in the PostgreSQL database to speed up queries.
- Ensuring that complex calculations, such as averages and trends, are done efficiently in the database layer, avoiding unnecessary computation on the application side.
