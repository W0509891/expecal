import json
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
async def get_transactions(date_from: str = None, date_to: str = None, date_on: str = None):
    db = get_db()
    db_cursor = db.cursor(dictionary=True)

    try:
        if date_on:
            query = f"SELECT * FROM transactions WHERE transactions.date = '{date_on}'"
            db_cursor.execute(query)

        elif date_from and not date_to:
            return {"message": "only from"}

        elif date_to and not date_from:
            return {"message": "only to"}

        elif date_from and date_to:
            query = f"""
            SELECT JSON_OBJECTAGG( d.`date`, d.txns ) AS transactions
            FROM (
                    SELECT t.`date`, JSON_ARRAYAGG(
                    JSON_OBJECT(
                                'id', t.id,
                                'type', t.type,
                                'description', t.description,
                                'amount', t.amount,
                                'balance', t.balance,
                                'currency', t.currency,
                                'account_name', a.type,
                                'bank_name', fi.name
                )
            ) AS txns
            FROM saveify.transactions t
            join saveify.accounts a on t.account_id = a.id
            join saveify.financial_institution fi on a.bank_id = fi.id
            WHERE t.`date` BETWEEN '{date_from}' AND '{date_to}'
            GROUP BY t.`date`
            ) AS d;"""

            db_cursor.execute(query)
            result = db_cursor.fetchall()

            result = json.loads(result[0]["transactions"])
            return result

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