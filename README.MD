
# Expecal (work in progress)

Expecal is a project with an Angular frontend and a FastAPI backend designed for managing and tracking financial transactions.

## Project Structure

- `front/`: Angular-based frontend application.
- `back/`: FastAPI-based backend application with MySQL integration.

---

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- **Node.js** (v18 or later recommended) and **npm**
- **Python** (v3.9 or later)
- **MySQL** database server

---

### Backend Setup (`/back`)

1. **Navigate to the back directory:**
   ```bash
   cd back
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   - On Windows:
     ```bash
     .\venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Configure Environment Variables:**
   Create a `.env` file in the `back/` directory with the following variables:
   ```env
   USERNAME=your_db_user
   PASSWORD=your_db_password
   DATABASE=your_db_name
   HOST=localhost
   ```

6. **Run the Backend:**
   ```bash
   uvicorn main:app --reload
   ```
   The backend will be available at `http://127.0.0.1:8000`. You can access the API documentation at `http://127.0.0.1:8000/docs`.

---

### Frontend Setup (`/front`)

1. **Navigate to the front directory:**
   ```bash
   cd ../front
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the Frontend:**
   ```bash
   npm start
   ```
   The frontend will be available at `http://localhost:4200`.

---

## Features

#### Current Features
- **Transaction Management:** View and upload financial statements in a calendar view.

#### Planned Features
- **Dynamic Dashboard:** Interactive calendar and data visualization.
- **Transaction Categorization:** Automatic categorization of transactions.
- **Budgeting:** Track and manage spending goals.
- **Multi-Account Support:** Manage multiple financial accounts in one place.
