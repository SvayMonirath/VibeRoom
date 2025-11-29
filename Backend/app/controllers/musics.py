from flask_smorest import Blueprint, abort
from flask_jwt_extended import jwt_required, get_jwt_identity

from ..schemas.music_schemas import AddMusicDB
from ..models.models import Music, db
# BASIC MUSIC operation
musics_blp = Blueprint("Musics", __name__, url_prefix="/api/v1/musics")
@musics_blp.route('/add_songs_to_database', methods=['POST'])
@musics_blp.response(201, AddMusicDB)
def add_songs_to_database(musicData):
    title = musicData.get('title')
    artist = musicData.get('artist')
    album = musicData.get('album')
    genre = musicData.get('genre')
    audio_file_path = musicData.get('audio_file_path')
    cover_image_path = musicData.get('cover_image_path')

    new_music = Music(
        title=title,
        artist=artist,
        album=album,
        genre=genre,
        audio_file_path=audio_file_path,
        cover_image_path=cover_image_path
    )

    db.session.add(new_music)
    db.session.commit()

    return {"message": "Music added to database successfully.", "music_id": new_music.id}, 201


# play music individually
# pause music individually
# skip music individually


# WEBSOCKET OPERATION
# ENTER ROOM (AFTER JOIN ROOM)
# LEAVE ROOM
# PLAY MUSIC
# PAUSE MUSIC
# SKIP MUSIC
# ADD MUSIC TO MUSIC QUEUE
# REMOVE MUSIC FROM MUSIC QUEUE

