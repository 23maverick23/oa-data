import json
import pandas as pd

from flask import (jsonify)
from . import get_report_by_id

json_data = get_report_by_id(87)
print('\nraw -->> ', json_data)
value = json_data['value']
print('\nvalue -->> ', json_data)

df = pd.DataFrame(value)
grouped = df.groupby('Employee - Job code').mean().reset_index()
grouped = grouped.groupby('Employee - Job code').mean()
grouped_json_string = grouped.to_json(orient='split')
grouped_json = json.loads(grouped_json_string)

# print(grouped_json)

data = [{'name': job, 'data': grouped_json['data'][i]} for i, job in enumerate(grouped_json['index'])]

# print(data)

final_data = {'columns': grouped_json['columns'], 'values': data}

# print(final_data)

def get_data():
    return final_data
