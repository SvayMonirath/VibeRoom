from marshmallow import Schema, fields

class CreateRoomSchema(Schema):
    name = fields.Str(required=True)
    genre = fields.Str()
    #  what is missing for?
    is_private = fields.Bool(missing=False)
    password = fields.Str(missing=None)

class EditRoomSchema(Schema):
    name = fields.Str()
    genre = fields.Str()
    is_private = fields.Bool()
    password = fields.Str()
