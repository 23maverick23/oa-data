from flask import (jsonify)
from . import get_report_by_id

json_data = get_report_by_id(85).json()
value = json_data['value']

def get_data():
    return value
