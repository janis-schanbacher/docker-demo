from flask.json import JSONEncoder

class Task:
    def __init__(self, id, description, done):
        self.id = id
        self.description = description
        self.done = done

class TaskJSONEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Task):
            return obj.__dict__
        return JSONEncoder.default(self, obj)