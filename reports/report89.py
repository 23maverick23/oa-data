from flask import (jsonify)
from . import get_report_by_id

json_data = get_report_by_id(83).json()
value = json_data['value']

# TODO: This puts the count before the stage name, which is wrong
# data = [[item[key] for key in item] for item in value]
data = [[item['Project stage'], item['Count']] for item in value]

def get_data():
    return data
