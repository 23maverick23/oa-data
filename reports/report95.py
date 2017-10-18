from collections import OrderedDict
from flask import (jsonify)
from . import get_report_by_id

json_data = get_report_by_id(95)
value = json_data['value']
title = next(k for k, v in value[0].items() if k.startswith('Week '))
for d in value:
    d['Week'] = d.pop(title)
    d['Class'] = 'error' if d['Week'] == 'X' else 'warning'
final = {}
final['data'] = value
final['title'] = title

def get_data():
    return final
