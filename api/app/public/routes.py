from flask import request, Response
from app.models import User
from . import public_bp
from flask_socketio import emit, send
from app import socketio
import json

def validUserObject(userObject):
    if ("firstName" in userObject and
        "lastName" in userObject):
        return True
    return False

# SocketIO


# public_bp Routes
@public_bp.route("/api/users/")
def get_users():
    print("Request to get all users.")
    return {'users': User.get_all()}

@public_bp.route("/api/users/", methods=["POST"])
def add_user():
    request_data = request.get_json()
    if validUserObject(request_data):
        User.add_user(request_data["firstName"], request_data["lastName"])
        return {"resp": "User created successfully"}
    else:
        InvalidUserObjectErrorMsg = {
            "error": "Invalid user object passed in request"
        }
        return {"resp": InvalidUserObjectErrorMsg}


# SocketIO Events
@socketio.on('connect')
def connect():
    print("Connected")
    
@socketio.on('disconnect')
def disconnect():
    print('Disconnect')
    
@socketio.on('UserAdded')
def userAdded(message):
    print('User Added')
    print(message)
    # emit('userAddedResponse', {'data': message}, broadcast=True)
    send('userAddedResponse', {'data': message}, broadcast=True)