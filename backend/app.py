from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import cohere


app = Flask(__name__)
CORS(app)
co = cohere.Client(api_key="HNuszEemO11A2nbVQL6He6hRujnGG1OcvYH87m2c",)
PREAMBLE = f'''You are a story-teller who is an expert at telling engaging stories and giving advice. Always speak in third person. Never autocorrect or change the spelling of the names of who you are talking about.'''

# Configuring the SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///answer.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


# Define the Answers model
class Answer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=True)
    gender = db.Column(db.String(10), nullable=True)
    position = db.Column(db.String(100), nullable=True)
    interest = db.Column(db.String(100), nullable=True)
    future = db.Column(db.String(100), nullable=True)

# Create the database (only needs to be run once)
with app.app_context():
    db.create_all()

# Route to save answers
@app.route('/api/save-answers', methods=['POST'])
def save_answers():
    data = request.get_json()
    name = data.get('name')
    gender = data.get('gender')
    position = data.get('position')
    interest = data.get('interest')
    future = data.get('future')
    
    # Create a new answer entry
    new_answer = Answer(name=name, gender=gender, position=position, interest=interest, future=future)
    db.session.add(new_answer)
    db.session.commit()

    return jsonify({"message": f"{name} {gender} {position}{interest}{future} Answers saved successfully!"}), 201

@app.route('/dayInLife')
def get_day_in_life():
    latest_answer = Answer.query.order_by(Answer.id.desc()).first()
    
    if latest_answer is None:
        return jsonify({"error": "No answers found."}), 404

    DAY_IN_LIFE = f"In 60 words, describe a day in the life of {latest_answer.name}, who is a {latest_answer.gender} currently working as a {latest_answer.future}. Use imagery. Never autocorrect or change the spelling of their name. Include tasks the person does in the job."
    
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

    RESOURCES_USED = f"In 65 words, what resources does {latest_answer.name}, a {latest_answer.gender} interested in {latest_answer.interest}, currently a {latest_answer.position} with aspirations to be a {latest_answer.future}, use to achieve their goals?"
    
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

    FUTURE_OPPORTUNITIES = f"In 65 words, what future opportunities await {latest_answer.name}, a {latest_answer.gender} interested in {latest_answer.interest}, currently a {latest_answer.position} with aspirations to be a {latest_answer.future}? Be specific in the type of organizations, jobs, and career opportunties they have to grow their career."
    
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

    IMPACT = f"In 65 words, what impact does {latest_answer.name}, a {latest_answer.gender} interested in {latest_answer.interest}, currently a {latest_answer.position} with aspirations to be a {latest_answer.future}, have on their community?"
    
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

    GIVING_BACK = f"In 65 words, how does {latest_answer.name}, a {latest_answer.gender} interested in {latest_answer.interest}, currently a {latest_answer.position} with aspirations to be a {latest_answer.future}, give back to the community?"
    
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

    HOW_TO_GET_THERE = f"In 65 words, what steps can {latest_answer.name}, a {latest_answer.gender} interested in {latest_answer.interest}, currently a {latest_answer.position} with aspirations to be a {latest_answer.future}, take to achieve their goals? Include some specific resources to use. Do not use bullet points, but instead list ways separated by commas. Finish off by motivating {latest_answer.name}!"
    
    chat = co.chat(
        preamble=PREAMBLE,
        message=HOW_TO_GET_THERE,
        model="command-r-plus"
    )
    
    return {"answers": chat.text}


if __name__ == '__main__':
    app.run(debug=True)