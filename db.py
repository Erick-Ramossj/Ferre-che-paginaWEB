# db.py
import mysql.connector
from mysql.connector import Error
from config import DB_CONFIG

def get_connection():
    """Crea y retorna una conexión a MySQL"""
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        if conn.is_connected():
            print("[DB] Conexión establecida correctamente ✅")
            return conn
    except Error as e:
        print(f"[DB] Error de conexión: {e}")
        return None
