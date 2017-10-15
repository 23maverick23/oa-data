from collections import OrderedDict
from datetime import datetime
from flask import (jsonify)
from . import get_report_by_id

json_data = get_report_by_id(93)
value = json_data['value'][0]
del value['Company']
dates = [datetime.strptime(key, '%b-%Y').date() for key in value]
sorted_dates = sorted(dates)
ordered_values = [value[item.strftime('%b-%Y')] for item in sorted_dates]
ordered_dates = [item.strftime('%b-%Y') for item in sorted_dates]

final = {}
final["keys"] = ordered_dates
final["values"] = ordered_values

def get_data():
    return final
