import codecs
import json
import os
import requests

BASE_URL = 'https://trunk.qastack.openair1.com/odata/v4/reports'
REPORT_URL = BASE_URL + '/report'
OA_USER = os.environ['OA_USER']
OA_PASS = os.environ['OA_PASS']


def get_report_by_id(int):
    try:
        if int:
            r = requests.get(REPORT_URL + str(int), auth=(OA_USER, OA_PASS))
            # return r.json()
            return json.loads(r.text)
            # return json.load(codecs.decode(r.text, 'utf-8'))
        else:
            return None
    except:
        return None
