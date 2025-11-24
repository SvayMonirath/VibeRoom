import os
from dotenv import load_dotenv

from flask import Flask
from flask_jwt_extended import JWTManager

from .models.users import db
from .configs.config import Config

load_dotenv()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    jwt.init_app(app)
    db.init_app(app)

    from .controllers.auth import auth_blp
    app.register_blueprint(auth_blp)

    return app
