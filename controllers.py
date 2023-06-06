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

session, db, T, auth, and tempates are examples of Fixtures.
Warning: Fixtures MUST be declared with @action.uses({fixtures}) else your app will result in undefined behavior
"""

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

@action('coaching_find')
@action.uses('coaching_find.html', db, auth, url_signer)
def coaching_find():
    return dict(
                get_coaches_url=URL('get_coaches', signer=url_signer)
            )

@action('coaching_profile')
@action.uses('coaching_profile.html', db, auth.user, url_signer)
def coaching_profile():
    return dict()

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
        hitting_rate_coach=request.json.get('hitting_rate')
    )
    return dict(
                id=id
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
