"""
This file defines the database models
"""

import datetime
from .common import db, Field, auth
from pydal.validators import *


def get_user_email():
    return auth.current_user.get('email') if auth.current_user else None

def get_time():
    return datetime.datetime.utcnow()


### Define your table below
#
# db.define_table('thing', Field('name'))
#
## always commit your models to avoid problems later

db.define_table('coaches',
                Field('user_id', 'reference auth_user', default=lambda: auth.current_user.get('id')),
                Field('phone_num_coach'),
                Field('state_coach'),
                Field('city_coach'),
                Field('about_coach'),
                Field('experience_coach', 'integer'),
                Field('private_rate_coach', 'integer'),
                Field('hitting_rate_coach', 'integer'),
                Field('semi_private_rate_coach', 'integer'),
                Field('group_rate_coach', 'integer')
                )

db.define_table('stringers',
                Field('user_id', 'reference auth_user', default=lambda: auth.current_user.get('id')),
                Field('phone_num_stringer'),
                Field('state_stringer'),
                Field('city_stringer'),
                Field('about_stringer'),
                Field('experience_stringer', 'integer'),
                Field('price_stringer', 'integer'),
                Field('turnover_stringer', 'integer')
                )

db.commit()
