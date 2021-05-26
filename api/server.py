import time, string, os, json
from flask import Flask
from random import *
from connection import *
from dotenv import load_dotenv, find_dotenv

from database_def import entity_attributes_lut

# Load our environment variables from the .env file in the root of our project.
load_dotenv()

app = Flask(__name__)

login_name = str(os.environ.get('LOGIN', 'your_login'))
login_pswd = str(os.environ.get('DB_PASS', 'your_password'))
login_db = str(os.environ.get('DATABASE', 'login_again'))

# data string looks like
# a=1&b=2&c=3&
# returns output as [[a,1], [b,2], [c,3]]
def decode_data_string(data):
    return [x.split('=') for x in data.split('&') if x]

def get_table(table_name):
    query = 'SELECT * FROM %s;' % table_name
    with connect(login_name, login_pswd, login_db) as connection:
        with execute_query(connection, query) as cursor:
            res = json.loads(json.dumps(cursor.fetchall()))
            return [e for e in res]

@app.route('/<table_name>/insert/<data>')
def insert_row(table_name, data):
    data = decode_data_string(data)
    print("%s: %s" % (table_name, data))
    table_token = ('%s %s' % (table_name, tuple([x[0] for x in data]))).replace("'", '')
    values_token = '%s' % [x[1] for x in data]
    values_token = values_token.replace("", '').replace('[', '(').replace(']', ')')
    query = "INSERT INTO %s VALUES %s;" % (table_token, values_token)
    print(query)
    with connect(login_name, login_pswd, login_db) as connection:
        with execute_query(connection, query) as cursor:
            pass
    return {}

@app.route('/<table_name>/delete/<id>')
def delete_row(table_name, id):
    query = "DELETE FROM %s WHERE %s=%s;"
    id_name = '%s_%s' % (table_name if table_name != 'items' else 'item', 'id')
    query = query % (table_name, id_name, id)
    print(query)
    with connect(login_name, login_pswd, login_db) as connection:
        with execute_query(connection, query) as cursor:
            pass
    return {}

@app.route('/<table_name>/update/<id>/<data>')
def update_row(table_name, id, data):
    query = 'UPDATE %s SET %s WHERE %s=%s;'
    data = decode_data_string(data)
    set_query = ', '.join(["%s='%s'" % tuple(pair) for pair in data])
    query %= (table_name, set_query, '%s_id' % (table_name if table_name != 'items' else 'item'), id)
    with connect(login_name, login_pswd, login_db) as connection:
        with execute_query(connection, query) as cursor:
            pass
    return {}

@app.route('/<table_name>')
def table_page(table_name):
    table = get_table(table_name)
    return {
        'table': table,
        'attributes': entity_attributes_lut[table_name]['visible'],
        'editable': entity_attributes_lut[table_name]['editable'],
        'table_name': table_name
    }