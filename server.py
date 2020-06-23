import sqlite3
from flask import Flask, request, render_template
from flask_socketio import SocketIO

'''
============================
==  DEFINING APPLICATION  ==
============================
'''
app=Flask(__name__)
socketio=SocketIO(app)
'''
============================
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
============================
'''





'''
=======================
==  MANAGE REQUESTS  ==
=======================
'''
@app.route("/")
def homepage():
    '''
    This is the homepage that just has a page for sign up and sign in which is managed using cookies.
    Its the landing page that can redirect to a sign up page or a sign in page.
    '''
    return render_template("home.html")

@app.route("/signup")
def signup():
    return render_template("signup.html")

@app.route("/signin")
def signin():
        return render_template("signin.html")

@app.route("/session/<username>")
def session(username):
    return render_template('session.html',clientname=username)


'''
=====================
==  SOCKET EVENTS  ==
=====================
'''

@socketio.on("client-connected")
def clientConnectedMessage(json,methods=['GET','POST']):
    #print(json['data'])
    username=json['data']
    print(f'\n\n~~ {username} CONECTED! ~~\n\n')
'''
=======================
~~~~~~~~~~~~~~~~~~~~~~~
=======================
'''





'''
=====================
==  MAIN FUNCTION  ==
=====================
'''
if __name__=='__main__':
    socketio.run(app,debug=True)
'''
=====================
~~~~~~~~~~~~~~~~~~~~~
=====================
'''