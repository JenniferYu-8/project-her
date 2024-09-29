from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import cohere


app = Flask(__name__)
CORS(app)
co = cohere.Client(api_key="HNuszEemO11A2nbVQL6He6hRujnGG1OcvYH87m2c",)
PREAMBLE = f'''You are a story-teller'''
COMMUNITY_RESOURCES = f'''My name is'''

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

    return jsonify({"message": f"{name}{gender} {interest} Answers saved successfully!"}), 201

@app.route('/dayInLife')
def get_day_in_life():
    latest_answer = Answer.query.order_by(Answer.id.desc()).first()
    
    if latest_answer is None:
        return jsonify({"error": "No answers found."}), 404

    DAY_IN_LIFE = f"In 50 words, Describe a day in the life of {latest_answer.name}, who is a {latest_answer.gender} interested in {latest_answer.interest}."
    
    chat = co.chat(
        preamble=PREAMBLE,
        message=DAY_IN_LIFE,
        model="command-r-plus"
    )
    
    return {"answers": chat.text}


@app.route('/resourcesUsed')
def get_resources_used():
    latest_answer = Answer.query.order_by(Answer.id.desc()).first()
    
    if latest_answer is None:
        return jsonify({"error": "No answers found."}), 404

    RESOURCES_USED = f"In 50 words, What resources does {latest_answer.name}, a {latest_answer.gender} interested in {latest_answer.interest}, use to achieve their goals?"
    
    chat = co.chat(
        preamble=PREAMBLE,
        message=RESOURCES_USED,
        model="command-r-plus"
    )
    
    return {"answers": chat.text}


@app.route('/futureOpportunities')
def get_future_opportunities():
    latest_answer = Answer.query.order_by(Answer.id.desc()).first()
    
    if latest_answer is None:
        return jsonify({"error": "No answers found."}), 404

    FUTURE_OPPORTUNITIES = f"In 50 words, What future opportunities await {latest_answer.name}, a {latest_answer.gender} interested in {latest_answer.interest}?"
    
    chat = co.chat(
        preamble=PREAMBLE,
        message=FUTURE_OPPORTUNITIES,
        model="command-r-plus"
    )
    
    return {"answers": chat.text}


@app.route('/impact')
def get_impact():
    latest_answer = Answer.query.order_by(Answer.id.desc()).first()
    
    if latest_answer is None:
        return jsonify({"error": "No answers found."}), 404

    IMPACT = f"In 50 words, What impact does {latest_answer.name}, a {latest_answer.gender} interested in {latest_answer.interest}, have on their community?"
    
    chat = co.chat(
        preamble=PREAMBLE,
        message=IMPACT,
        model="command-r-plus"
    )
    
    return {"answers": chat.text}


@app.route('/givingBack')
def get_giving_back():
    latest_answer = Answer.query.order_by(Answer.id.desc()).first()
    
    if latest_answer is None:
        return jsonify({"error": "No answers found."}), 404

    GIVING_BACK = f"In 50 words, How does {latest_answer.name}, a {latest_answer.gender} interested in {latest_answer.interest}, give back to the community?"
    
    chat = co.chat(
        preamble=PREAMBLE,
        message=GIVING_BACK,
        model="command-r-plus"
    )
    
    return {"answers": chat.text}


@app.route('/howToGetThere')
def get_how_to_get_there():
    latest_answer = Answer.query.order_by(Answer.id.desc()).first()
    
    if latest_answer is None:
        return jsonify({"error": "No answers found."}), 404

    HOW_TO_GET_THERE = f"In 50 words, What steps can {latest_answer.name}, a {latest_answer.gender} interested in {latest_answer.interest}, take to achieve their goals?"
    
    chat = co.chat(
        preamble=PREAMBLE,
        message=HOW_TO_GET_THERE,
        model="command-r-plus"
    )
    
    return {"answers": chat.text}


if __name__ == '__main__':
    app.run(debug=True)