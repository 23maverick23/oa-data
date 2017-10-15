from flask import (Flask, render_template, request, jsonify)
from flask_restful import (Resource, Api)

from .reports import report87, report88, report91, report92, report93, report94


app = Flask(__name__)
api = Api(app)

class Home(Resource):
    def get(self):
        return jsonify({"hello": "world"})

class Report87(Resource):
    def get(self):
        return jsonify(report87.get_data())

class Report88(Resource):
    def get(self):
        return jsonify(report88.get_data())

class Report91(Resource):
    def get(self):
        return jsonify(report91.get_data())

class Report92(Resource):
    def get(self):
        return jsonify(report92.get_data())

class Report93(Resource):
    def get(self):
        return jsonify(report93.get_data())

class Report94(Resource):
    def get(self):
        return jsonify(report94.get_data())

api.add_resource(Home, '/')
api.add_resource(Report87, '/api/report87')
api.add_resource(Report88, '/api/report88')
api.add_resource(Report91, '/api/report91')
api.add_resource(Report92, '/api/report92')
api.add_resource(Report93, '/api/report93')
api.add_resource(Report94, '/api/report94')

if __name__ == '__main__':
    app.run(
        debug=True,
        host='0.0.0.0',
        use_reloader=True
    )
