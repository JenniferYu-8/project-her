from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configuring the SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///answers.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define the Answers model
class Answer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=True)
    gender = db.Column(db.String(10), nullable=True)
    interest = db.Column(db.String(100), nullable=True)

# Create the database (only needs to be run once)
with app.app_context():
    db.create_all()

# Route to save answers
@app.route('/api/save-answers', methods=['POST'])
def save_answers():
    data = request.get_json()
    name = data.get('name')
    gender = data.get('gender')
    interest = data.get('interest')

    # Create a new answer entry
    new_answer = Answer(name=name, gender=gender, interest=interest)
    db.session.add(new_answer)
    db.session.commit()

    return jsonify({"message": "Answers saved successfully!"}), 201

if __name__ == '__main__':
    app.run(debug=True)
