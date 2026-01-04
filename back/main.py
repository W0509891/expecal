import os
import dotenv

import starlette.status as status
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

import mysql.connector
from transactionParser import TransactionParser
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    dotenv.load_dotenv()
    db = mysql.connector.connect(
            user=os.getenv("USERNAME"),
            password=os.getenv("PASSWORD"),
            database=os.getenv("DATABASE"),
            host=os.getenv("HOST")
        )
    return db
@app.get("/")
async def root():
    return RedirectResponse(url="/docs")


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


@app.get("/transactions")
async def get_transactions(date: str = None):
    db = get_db()
    db_cursor = db.cursor(dictionary=True)

    try:
        if date:
            query = ("SELECT * FROM transactions WHERE transactions.date = %s")
            db_cursor.execute(query, date)

        else:
            query = "SELECT * FROM transactions"
            db_cursor.execute(query)


        result = db_cursor.fetchall()

        return result

    except Exception as e:
        return {"error": e}

    finally:
        db.close()

@app.get("/financial_inst")
async def get_financial_inst():
    db = get_db()
    db_cursor = db.cursor(dictionary=True)
    try:
        query = "SELECT * FROM financial_institution"
        db_cursor.execute(query)
        result = db_cursor.fetchall()

    except Exception as e:
        return {"error": e}

    return result

@app.get("/accounts")
async def get_accounts(institution: int = None):
    db = get_db()
    db_cursor = db.cursor(dictionary=True)
    query = [
        "SELECT * FROM accounts a JOIN financial_institution f_i ON a.bank_id = f_i.id",
        f"SELECT * FROM accounts a JOIN financial_institution f_i ON a.bank_id = f_i.id WHERE accounts.bank_id = {institution}"
        ][institution is not None]

    try:
        db_cursor.execute(query)
        result = db_cursor.fetchall()

        return result

    except Exception as e:
        return {"error": e}

    finally:
        db.close()