import json
import pandas as pd

from flask import (jsonify)
from operator import itemgetter
from . import get_report_by_id

json_data = get_report_by_id(88).json()
value = json_data['value']

FLD = {
    "ID": "Project - Internal id",
    "PR": "Project",
    "CL": "Project - Client",
    "PM": "Project - Project manager",
    "TME": "Total - Timesheets - All actual cost [salary] (USD)",
    "EXP": "Total - Expenses - Total USD",
    "PUR": "Total - Purchases - USD",
    "TOT": "Total - Projects - Total cost (USD)"
}

summary = [{
        'name': item[FLD['PR']],
        'y': item[FLD['TOT']],
        'drilldown': item[FLD['ID']]
    } for item in value
]

summary_sorted = sorted(summary, key=itemgetter('y'), reverse=True)

detail = [{
    'name': item[FLD['PR']],
    'id': item[FLD['ID']],
    'data': [
        [FLD['TME'], item[FLD['TME']]],
        [FLD['EXP'], item[FLD['EXP']]],
        [FLD['PUR'], item[FLD['PUR']]]
    ]} for item in value
]

def get_data():
    return (summary_sorted, detail)
