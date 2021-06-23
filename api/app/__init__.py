from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_socketio import SocketIO
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()
socketio = SocketIO()

def create_app(settings_module):
    app = Flask(__name__)
    
    app.config.from_object(settings_module)
    
    db.init_app(app)
    migrate.init_app(app, db)
    socketio.init_app(app, cors_allowed_origins="*")
    CORS(app) #, resources={r"/api/*": {"origins": "*"}})
    
    # Register blueprints
    from .public import public_bp
    app.register_blueprint(public_bp)
    
    return app