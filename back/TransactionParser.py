import csv
import mysql.connector
import os
import pathlib
import dotenv

class TransactionParser:
    # Constructor
    def __init__(self, file):
        self.statement = open(file, "r+")

    # Method to print the contents of the file
    def spit(self, format_type: str = "json"):

        match format_type:
            case "json":
                dict_list = []
                reader = csv.DictReader(self.statement)
                for row in reader:
                    dict_list.append(row)

                self.close()
                return dict_list

            case default:
                return "Invalid type"

    def getHeaders(self):
        headers = self.statement.readline().replace('\"', "").strip().split(",")
        return headers

    def close(self):
        self.statement.close()


class TransactionWriter:
    def __init__(self, fileName: str):
        dotenv.load_dotenv()
        self.parser = TransactionParser(fileName)
        self.database = mysql.connector.connect(
            user = os.getenv("USERNAME"),
            password = os.getenv("PASSWORD"),
            database = os.getenv("DATABASE"),
            host = os.getenv("HOST")
        )


    def write(self, financial_institution: str):
        transactions = self.parser.spit()
        db_cursor = self.database.cursor(dictionary=True)

        try:
            query = ('INSERT INTO transactions (account_id, date, amount, description, type, currency, balance) '
                     'VALUES (%s, %s, %s, %s, %s, %s, %s)')

            for transaction in transactions:
                data = (1, transaction["date"], float (transaction["amount"]), transaction["description"],
                        transaction["transaction"], transaction["currency"], float(transaction["balance"]))


                db_cursor.execute(query, data)
            self.database.commit()
            print(f"Sucessfully inserted {len(transactions)} transactions into the database.")


        except mysql.connector.Error as err:
            print(f"Error: {err}")
            self.database.rollback()

        finally:
            db_cursor.close()
            self.parser.close()



def main():
    statementPath = pathlib.Path("/home/nagant/Downloads/Main-2022-01-to-2026-01-monthly-statements")
    # tw.write("W")

    statements = os.listdir(statementPath)
    statements.sort()

    for statement in statements:
        tw = TransactionWriter(os.path.join(statementPath, statement))
        tw.write("")
        print(os.path.join(statementPath, statement))

    # print(os.listdir(path))
if __name__ == "__main__":
    main()
