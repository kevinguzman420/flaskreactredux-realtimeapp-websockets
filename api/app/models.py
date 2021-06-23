from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app import db
import json

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(80), nullable=False)
    lastName = db.Column(db.String(80), nullable=False)

    def json(self):
        return {'id': self.id, 'firstName': self.firstName, 'lastName': self.lastName}

    def add_user(_firstName, _lastName):
        new_user = User(firstName=_firstName, lastName=_lastName)
        db.session.add(new_user)
        db.session.commit()

    def get_all():
        return [User.json(user) for user in User.query.all()]

    def __repr__(self):
        user_object = {
            'id': self.id,
            'firstName': self.firstName,
            'lastName': self.lastName
        }
        return json.dumps(user_object)