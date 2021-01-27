import psycopg2
import os

conn = psycopg2.connect(host='190.155.140.58',
                       dbname='sisport_utmach',
                       user='server',
                       password='Server2021',
                       port='5432'
)

cur = conn.cursor()