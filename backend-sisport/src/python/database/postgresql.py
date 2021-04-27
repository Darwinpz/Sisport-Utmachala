import psycopg2
import os

conn = psycopg2.connect(host='localhost',
                       dbname='Sisport',
                       user='postgres',
                       password='123',
                       port='5432'
)

cur = conn.cursor()