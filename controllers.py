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

@action('coaching_apply', method=["GET", "POST"])
@action.uses('coaching_apply.html', db, auth.user, url_signer)
def coaching_apply():
    form = Form([
                    Field('phone_number'),
                    Field('state'),
                    Field('city'),
                    Field('about')
                ],
                csrf_session=session,
                formstyle=FormStyleBulma
                )
    if form.accepted:
        db.coaches.insert(
                    phone_num_coach=form.vars['phone_number'],
                    state_coach=form.vars['state'],
                    city_coach=form.vars['city'],
                    about_coach=form.vars['about']
                )
        # Todo find a better redirect
        redirect(URL('index'))
    ret_val = dict(
                form=form,
                get_iscoach_url=URL('get_iscoach', signer=url_signer)
            )
    return ret_val

@action('get_iscoach')
@action.uses(url_signer.verify(), db, auth.user)
def get_iscoach():
    is_coach = db(db.coaches.user_id == auth.current_user.get('id')).count() == 1
    return dict(
            is_coach=is_coach
        )
