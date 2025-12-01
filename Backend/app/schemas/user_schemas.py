from marshmallow import Schema, fields

class EditUserSchema(Schema):
    username = fields.Str(required=False)
    email = fields.Email(required=False)

