from collections import OrderedDict
from flask import (jsonify)
from . import get_report_by_id

json_data = get_report_by_id(91)
value = json_data['value']

# TODO: This puts the count before the stage name, which is wrong
# data = [[item[key] for key in item] for item in value]
data = {}

ordered = [OrderedDict(sorted(item.items(), key=lambda t: t[0])) for item in value]
keys = [key for key in ordered[0].keys()]

data['value'] = [{"client": item[keys[0]],

"revenue_total":  "${:0,.2f}".format(item[keys[1]] + item[keys[4]] + item[keys[7]] + item[keys[10]]),
"revenue_spark": ", ".join(
    [str(item[keys[1]]), str(item[keys[4]]), str(item[keys[7]]), str(item[keys[10]])]
),

"cost_total": "${:0,.2f}".format(item[keys[3]] + item[keys[6]] + item[keys[9]] + item[keys[12]]),
"cost_spark": ", ".join(
    [str(item[keys[3]]), str(item[keys[6]]), str(item[keys[9]]), str(item[keys[12]])]
),

"margin_total": "${:0,.2f}".format(item[keys[2]] + item[keys[5]] + item[keys[8]] + item[keys[11]]),
"margin_spark": ", ".join(
    [str(item[keys[2]]), str(item[keys[5]]), str(item[keys[8]]), str(item[keys[11]])]
)

} for item in ordered]

def get_data():
    return data
