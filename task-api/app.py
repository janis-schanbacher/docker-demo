from flask import Flask, json, request, abort
from task import Task, TaskJSONEncoder

app = Flask(__name__)
app.json_encoder = TaskJSONEncoder

tasks = {
    1: Task("Add user authentication", False),
    2: Task("Connect database", False),
    3: Task("Write tests ", False)
}

max_id = 3

def get_next_id():
    global max_id
    max_id += 1
    return max_id

@app.route('/tasks', methods=['GET'])
def index():
    response = app.response_class(
        response=json.dumps(tasks),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route('/tasks/<int:task_id>', methods=['GET'])
def get(task_id):
    if max_id < task_id or not task_id in tasks:
        abort(404)

    response = app.response_class(
        response=json.dumps(tasks[task_id]),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route("/tasks", methods=["POST"])
def create_task():
    if not request.is_json:
        return "Could not parse request data, invalid JSON", 400
    
    req_data = request.get_json()  
    if not 'description' in req_data:
        return "Required field 'description' is missing", 400

    done = req_data['done'] if 'done' in req_data else False
    id = get_next_id()
    tasks[id] = Task(req_data['description'], done)
    response = app.response_class(
        response=json.dumps({'id' : id}),
        status=201,
        mimetype='application/json'
    )
    return response
        

@app.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    global max_id
    if not request.is_json:
        return "Could not parse request data, invalid JSON", 400
    
    req_data = request.get_json()  
    if not 'description' in req_data:
        return "Required field 'description' is missing", 400

    if max_id <= task_id:
        max_id = task_id

    done = req_data['done'] if 'done' in req_data else False
    tasks[task_id] = Task(req_data['description'], done)
    return app.response_class(
        status=204
    )


@app.route('/tasks/<int:task_id>', methods = ['DELETE'])
def delete_task(task_id):
    if max_id < task_id  or not task_id in tasks:
        abort(404)

    del tasks[task_id]

    return app.response_class(
        status=204
    )