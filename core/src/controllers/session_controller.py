"""
User session data controller
Author: https:github.com/velutha
"""
from flask import jsonify
from src import CACHE

class SessionController():

    def __init__(self, *args, **kwargs):
        pass

    @staticmethod
    def clear_sessions(user_id, business_id, flow_id):
        if flow_id:
            user_session_key = user_id + "." + business_id + "." + flow_id + "." + "sessions"
        else:
            user_session_key = user_id + "." + "sessions"

        sessions = CACHE.lrange(user_session_key, 0, -1)

        if sessions == []:
            return jsonify(message="no_sessions_found")

        sessions.append(user_session_key)
        clear_sessions = CACHE.delete(*sessions)

        if clear_sessions:
            return jsonify(message="sessions_cleared")

        return jsonify(message="could_not_clear_sessions"), 500

    @staticmethod
    def get_active_session(user_id, business_id, flow_id):
        if flow_id:
            user_session_key = user_id + "." + business_id + "." + flow_id + "." + "sessions"
        else:
            user_session_key = user_id + "." + "sessions"

        user_sessions = CACHE.lrange(user_session_key, 0, -1)

        if user_sessions != []:
            return jsonify(active_session_id=user_sessions[0])
        return jsonify(message="Not found"), 404
