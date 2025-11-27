from .users import db, User
from .musics import Music

# MANY TO MANY  RELATIONSHIP BETWEEN MUSIC AND ROOM VIA ASSOCIATION TABLE
class RoomMusicAssociation(db.Model):
    __tablename__ = 'room_music_association'

    room_id = db.Column(db.Integer, db.ForeignKey('rooms.id'), primary_key=True)
    music_id = db.Column(db.Integer, db.ForeignKey('musics.id'), primary_key=True)

# Room Model
class Room(db.Model):
    __tablename__ = 'rooms'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.String(255), nullable=True)

    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # 1 user can have many rooms
    owner = db.relationship('User', backref=db.backref('rooms', lazy=True))

    # many rooms have many musics, same music can be in many rooms
    musics = db.relationship('Music', secondary='room_music_association', backref=db.backref('rooms', lazy=True))
