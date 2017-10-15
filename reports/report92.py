from collections import OrderedDict
from flask import (jsonify)
from . import get_report_by_id

json_data = get_report_by_id(92)

def get_data():
    return json_data
