rooms_state = {}

def _init_room(room_id):
    """Create default state for new room if not exist."""
    if room_id not in rooms_state:
        rooms_state[room_id] = {
            "queue": [],
            "current_song": None,
            "is_playing": False,
            "listeners": 0
        }
    return rooms_state[room_id]

def get_room_state(room_id):
    return rooms_state.get(room_id)

def set_room_state(room_id, state):
    _init_room(room_id)
    rooms_state[room_id] = state
    return rooms_state[room_id]

def delete_room_state(room_id):
    rooms_state.pop(room_id, None)

def add_song(room_id, song):
    room = _init_room(room_id)
    room["queue"].append(song)

    # if no song playing, start automatically
    if room["current_song"] is None:
        room["current_song"] = song

    return room


def play(room_id):
    room = _init_room(room_id)
    room["is_playing"] = True
    return room


def pause(room_id):
    room = _init_room(room_id)
    room["is_playing"] = False
    return room


def join(room_id):
    room = _init_room(room_id)
    room["listeners"] += 1
    return room


def leave(room_id):
    room = _init_room(room_id)
    room["listeners"] = max(room["listeners"] - 1, 0)
    return room
