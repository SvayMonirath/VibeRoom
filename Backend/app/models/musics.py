from .users import db

class Music(db.Model):
    __tablename__ = 'musics'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    artist = db.Column(db.String(100), nullable=False)
    album = db.Column(db.String(100), nullable=True)
    genre = db.Column(db.String(50), nullable=True)

    audio_file_path = db.Column(db.String(500), nullable=False)  # Path to the audio file
    cover_image_path = db.Column(db.String(500), nullable=True)  # Path to the cover image file
