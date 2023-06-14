"""
This file defines actions, i.e. functions the URLs are mapped into
The @action(path) decorator exposed the function at URL:

    http://127.0.0.1:8000/{app_name}/{path}

If app_name == '_default' then simply

    http://127.0.0.1:8000/{path}

If path == 'index' it can be omitted:

    http://127.0.0.1:8000/

The path follows the bottlepy syntax.

@action.uses('generic.html')  indicates that the action uses the generic.html template
@action.uses(session)         indicates that the action uses the session
@action.uses(db)              indicates that the action uses the db
@action.uses(T)               indicates that the action uses the i18n & pluralization
@action.uses(auth.user)       indicates that the action requires a logged in user
@action.uses(auth)            indicates that the action requires the auth object

session, db, T, auth, and tempates are examples of Fixtures
Warning: Fixtures MUST be declared with @action.uses({fixtures}) else your app will result in undefined behavior
"""

import datetime

from py4web import action, request, abort, redirect, URL, Field
from yatl.helpers import A
from .common import db, session, T, cache, auth, logger, authenticated, unauthenticated, flash
from py4web.utils.url_signer import URLSigner
from py4web.utils.form import Form, FormStyleBulma
from .models import get_user_email

url_signer = URLSigner(session)

@action('index')
@action.uses('index.html', db, auth, url_signer)
def index():
    return dict()

@action('coaching_apply')
@action.uses('coaching_apply.html', db, auth.user, url_signer)
def coaching_apply():
    ret_val = dict(
                get_iscoach_url=URL('get_iscoach', signer=url_signer),
                add_coach_url=URL('add_coach', signer=url_signer)
            )
    return ret_val

@action('coaching_profile')
@action.uses('coaching_profile.html', db, auth.user, url_signer)
def coaching_profile():
    return dict(
                get_coach_info_url=URL('get_coach_info', signer=url_signer),
                edit_coach_url=URL('edit_coach', signer=url_signer),
                del_coach_url=URL('del_coach', signer=url_signer),
                redirect_home_url=URL('redirect_home', signer=url_signer)
            )

@action('coaching_find')
@action.uses('coaching_find.html', db, auth, url_signer)
def coaching_find():
    return dict(
                get_coaches_url=URL('get_coaches', signer=url_signer),
                send_message_url=URL('send_message', signer=url_signer),
                redirect_messages_url=URL('redirect_messages', signer=url_signer)
            )

@action('stringing_apply')
@action.uses('stringing_apply.html', db, auth.user, url_signer)
def stringing_apply():
    ret_val = dict(
                get_isstringer_url=URL('get_isstringer', signer=url_signer),
                add_stringer_url=URL('add_stringer', signer=url_signer)
            )
    return ret_val

@action('stringing_profile')
@action.uses('stringing_profile.html', db, auth.user, url_signer)
def stringing_profile():
    return dict(
                get_stringer_info_url=URL('get_stringer_info', signer=url_signer),
                edit_stringer_url=URL('edit_stringer', signer=url_signer),
                del_stringer_url=URL('del_stringer', signer=url_signer),
                redirect_home_url=URL('redirect_home', signer=url_signer)
            )

@action('stringing_find')
@action.uses('stringing_find.html', db, auth, url_signer)
def stringing_find():
    return dict(
                get_stringers_url=URL('get_stringers', signer=url_signer),
                send_message_url=URL('send_message', signer=url_signer),
                redirect_messages_url=URL('redirect_messages', signer=url_signer)
            )

@action('messages')
@action.uses('messages.html', db, auth.user, url_signer)
def messages():
    return dict(
                send_message_url=URL('send_message', signer=url_signer),
                get_messages_url=URL('get_messages', signer=url_signer)
            )

# ============= API =============

@action('get_iscoach')
@action.uses(url_signer.verify(), db, auth.user)
def get_iscoach():
    # If there exists a coach with this user id
    is_coach = db(db.coaches.user_id == auth.current_user.get('id')).count() == 1
    return dict(
                is_coach=is_coach
            )

@action('add_coach', method="POST")
@action.uses(url_signer.verify(), db, auth.user)
def add_coach():
    id = db.coaches.insert(
        user_id=auth.current_user.get('id'),
        phone_num_coach=request.json.get('phone_number'),
        state_coach=request.json.get('state'),
        city_coach=request.json.get('city'),
        about_coach=request.json.get('about'),
        experience_coach=request.json.get('experience'),
        private_rate_coach=request.json.get('private_rate'),
        hitting_rate_coach=request.json.get('hitting_rate'),
        semi_private_rate_coach=request.json.get('semiprivate_rate'),
        group_rate_coach=request.json.get('group_rate'),
    )
    return dict(
                id=id
            )

@action('edit_coach', method="POST")
@action.uses(url_signer.verify(), db, auth.user)
def edit_coach():
    # Todod fix proivate rate and hittign rate it is setting to null
    db(db.coaches.user_id == auth.current_user.get('id')).update(
                phone_num_coach=request.json.get('phone_number'),
                state_coach=request.json.get('state'),
                city_coach=request.json.get('city'),
                about_coach=request.json.get('about'),
                experience_coach=request.json.get('experience'),
                private_rate_coach=request.json.get('private_rate'),
                hitting_rate_coach=request.json.get('hitting_rate'),
                semi_private_rate_coach=request.json.get('semi_private_rate'),
                group_rate_coach=request.json.get('group_rate')
            )
    return "ok"

@action('del_coach', method="POST")
@action.uses(url_signer.verify(), db, session, auth.user)
def del_coach():
    db(db.coaches.user_id == auth.current_user.get('id')).delete()
    return "ok"

@action('get_coach_info')
@action.uses(url_signer.verify(), db, auth.user)
def get_coach_info():
    coach = db(db.coaches.user_id == auth.current_user.get('id')).select().first()
    return dict(
                coach=coach
            )

@action('get_coaches')
@action.uses(url_signer.verify(), db, auth)
def get_coaches():
    '''
        This returns a list of all the coaches. Each coach will be a dictionary of two keys:
            'coaches': [*In here will be all the columns in the coaches table*]
            'auth_user': [*In here will be all the columns in the auth_user table*]
    '''
    state_q = request.params.get('state_q')
    city_q = request.params.get('city_q')
    all_coaches = db(db.coaches.user_id == db.auth_user.id).select().as_list()
    coaches = []
    for c in all_coaches:
        if state_q.lower() in c['coaches']['state_coach'].lower() and city_q.lower() in c['coaches']['city_coach'].lower():
            coaches.append(c)
    return dict(
                coaches=coaches
            )

@action('get_isstringer')
@action.uses(url_signer.verify(), db, auth.user)
def get_isstringer():
    # If there exists a coach with this user id
    is_stringer = db(db.stringers.user_id == auth.current_user.get('id')).count() == 1
    return dict(
                is_stringer=is_stringer
            )

@action('add_stringer', method="POST")
@action.uses(url_signer.verify(), db, auth.user)
def add_stringer():
    id = db.stringers.insert(
        user_id=auth.current_user.get('id'),
        phone_num_stringer=request.json.get('phone_number'),
        state_stringer=request.json.get('state'),
        city_stringer=request.json.get('city'),
        about_stringer=request.json.get('about'),
        experience_stringer=request.json.get('experience'),
        price_stringer=request.json.get('price'),
        turnover_stringer=request.json.get('turnover')
    )
    return dict(
                id=id
            )

@action('edit_stringer', method="POST")
@action.uses(url_signer.verify(), db, auth.user)
def edit_stringer():
    # Todod fix proivate rate and hittign rate it is setting to null
    db(db.stringers.user_id == auth.current_user.get('id')).update(
                phone_num_stringer=request.json.get('phone_number'),
                state_stringer=request.json.get('state'),
                city_stringer=request.json.get('city'),
                about_stringer=request.json.get('about'),
                experience_stringer=request.json.get('experience'),
                price_stringer=request.json.get('price'),
                turnover_stringer=request.json.get('turnover')
            )
    return "ok"

@action('del_stringer', method="POST")
@action.uses(url_signer.verify(), db, session, auth.user)
def del_stringer():
    db(db.stringers.user_id == auth.current_user.get('id')).delete()
    return "ok"

@action('redirect_home', method="GET")
@action.uses(url_signer.verify(), db, auth.user)
def redirect_home():
    return dict(
                url=URL('index')
            )

@action('get_stringer_info')
@action.uses(url_signer.verify(), db, auth.user)
def get_stringer_info():
    stringer = db(db.stringers.user_id == auth.current_user.get('id')).select().first()
    return dict(
                stringer=stringer
            )

@action('get_stringers')
@action.uses(url_signer.verify(), db, auth)
def get_stringers():
    '''
        This returns a list of all the stringers. Each coach will be a dictionary of two keys:
            'stringers': [*In here will be all the columns in the stringers table*]
            'auth_user': [*In here will be all the columns in the auth_user table*]
    '''
    state_q = request.params.get('state_q')
    city_q = request.params.get('city_q')
    all_stringers = db(db.stringers.user_id == db.auth_user.id).select().as_list()
    stringers = []
    for s in all_stringers:
        if state_q.lower() in s['stringers']['state_stringer'].lower() and city_q.lower() in s['stringers']['city_stringer'].lower():
            stringers.append(s)
    return dict(
                stringers=stringers
            )

@action('send_message', method="POST")
@action.uses(url_signer.verify(), db, auth.user)
def send_message():
    sender = auth.current_user.get('id')
    to = request.json.get('to')
    message = request.json.get('message')
    id = db.messages.insert(
               sender=sender,
               to=to,
               message=message,
               time_sent=datetime.datetime.today().isoformat()
            )
    return dict(
                id=id
            )

@action('redirect_messages', method="GET")
@action.uses(url_signer.verify(), db, auth.user)
def redirect_messages():
    return dict(
                url=URL('messages')
            )

@action('get_messages')
@action.uses(url_signer.verify(), db, auth.user)
def get_messages():
    c_user = auth.current_user.get('id')
    sent_messages = db(db.messages.sender == c_user).select().as_list()
    received_messages = db(db.messages.to == c_user).select().as_list()
    messages_list = []
    for m in sent_messages:
        if m['to'] not in messages_list:
            messages_list.append(m['to'])
    for m in received_messages:
        if m['sender'] not in messages_list:
            messages_list.append(m['sender'])
    messages = []
    print(messages_list)
    for m in messages_list:
        add_val = {}
        add_val['uid'] = m
        add_val['fname'], add_val['lname'] = get_first_last(m)
        sent_messages = db(db.messages.sender == c_user and db.messages.to == m).select().as_list()
        received_messages = db(db.messages.sender == m and db.messages.to == c_user).select().as_list()
        sent_messages = sorted(sent_messages, key=lambda x: x['time_sent'])
        received_messages= sorted(received_messages, key=lambda x: x['time_sent'])
        c_messages = []
        while len(sent_messages) != 0 or len(received_messages) != 0:
            sent_peak, received_peak = None, None
            if len(sent_messages):
                sent_peak = sent_messages[0]['time_sent']
            if len(received_messages):
                received_peak = received_messages[0]['time_sent']
            if sent_peak == None:
                c_messages.append(received_messages.pop(0))
            elif received_peak == None:
                c_messages.append(sent_messages.pop(0))
            elif sent_peak < received_peak:
                c_messages.append(sent_messages.pop(0))
            else:
                c_messages.append(received_messages.pop(0))
        add_val['messages'] = c_messages
        messages.append(add_val)
    messages = sorted(messages, key=lambda x: x['messages'][0]['time_sent'], reverse=True)
    return dict(
                messages=messages
            )

# ============= Helpers =============

def get_first_last(user_id):
    select = db(db.auth_user.id == user_id).select().first()
    return (select['first_name'], select['last_name'])
