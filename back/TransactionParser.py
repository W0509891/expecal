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


    def write(self, financial_institution: str, account_id: int = 1):
        transactions = self.parser.spit()
        db_cursor = self.database.cursor(dictionary=True)

        try:
            query = ('INSERT INTO transactions (account_id, date, amount, description, type, currency, balance) '
                     'VALUES (%s, %s, %s, %s, %s, %s, %s)')

            for transaction in transactions:
                # Use .get() to handle missing keys and provide defaults
                data = (
                    account_id,
                    transaction.get("date"),
                    float(transaction.get("amount", 0)),
                    transaction.get("description"),
                    transaction.get("type") or transaction.get("transaction"),
                    transaction.get("currency"),
                    float(transaction.get("balance", 0))
                )

                db_cursor.execute(query, data)
            self.database.commit()
            return f"Successfully inserted {len(transactions)} transactions into the database."


        except mysql.connector.Error as err:
            self.database.rollback()
            return f"Error: {err}"

        finally:
            db_cursor.close()
            self.parser.close()



def main():
    statementPath = pathlib.Path("/home/nagant/PhpstormProjects/expecal/expecal-back/uploads/statements/")
    # tw.write("W")

    statements = os.listdir(statementPath)
    statements.sort()

    for statement in statements:
        print(f"{statements.index(statement)} - {statement}")
    while True:
        option = int(input("what statment do you want to parse?\n"))
        if option > len(statements):
            print("Invalid option")
            continue
        else:
            print(os.path.join(statementPath, statements[option]))
            break

    tw = TransactionWriter(os.path.join(statementPath, statements[option]))
    tw.write("")
    # print(os.listdir(path))
if __name__ == "__main__":
    main()
