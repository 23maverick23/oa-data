from flask import (Flask, render_template, request, jsonify)
from flask_restful import (Resource, Api)

from .reports import report83, report85, report87, report88, report91


app = Flask(__name__)
api = Api(app)

class Report83(Resource):
    def get(self):
        return jsonify(report83.get_data())

class Report85(Resource):
    def get(self):
        return jsonify(report85.get_data())

class Report87(Resource):
    def get(self):
        return jsonify(report87.get_data())

class Report88(Resource):
    def get(self):
        return jsonify(report88.get_data())

class Report91(Resource):
    def get(self):
        return jsonify(report91.get_data())

api.add_resource(Report83, '/api/report83')
api.add_resource(Report85, '/api/report85')
api.add_resource(Report87, '/api/report87')
api.add_resource(Report88, '/api/report88')
api.add_resource(Report91, '/api/report91')

if __name__ == '__main__':
    app.run(debug=True)
