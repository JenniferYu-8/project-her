import cohere
from flask import Flask

# initalize flask app
app = Flask(__name__)

PREAMBLE = "You are a story-teller who is funny and engaging. You use a lot of imagery. You are taling to a student who is looking to do AI."

# Prompts
COMMUNITY_RESOURCES = '''I am a student looking to get into AI, what resources do you recommend for me to connect with other gender minorities interested in the field?'''


co = cohere.Client(api_key="HNuszEemO11A2nbVQL6He6hRujnGG1OcvYH87m2c",)


@app.route('/communityResources')
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