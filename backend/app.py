import cohere
from flask import Flask

# initalize flask app
app = Flask(__name__)

name = request.json.get("name")
interest = request.json.get('interest')
gender = request.json.get("gender")

PREAMBLE = f'''You are a story-teller who is funny and engaging. You use a lot of imagery. You are taling to a student who is looking to get into the field of {interest}.'''

# Prompts
COMMUNITY_RESOURCES = f'''My name is {name}. I am a student who is super interested in {interest}. I am a {gender} so i am part of the gender minority, so what resources do you recommend for me to connect with other {gender} like me interested in the field?'''


co = cohere.Client(api_key="HNuszEemO11A2nbVQL6He6hRujnGG1OcvYH87m2c",)


@app.route('/communityResources', methods=['POST'])
def get_community_resources():
    
    chat = co.chat(
        preamble=PREAMBLE,
        message=COMMUNITY_RESOURCES,
        model="command-r-plus"
    )
    
    print(chat)
    
    return(chat.text)

if __name__ == '__main__':
    app.run(debug=True)