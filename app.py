from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # This allows your HTML to talk to your Python script

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    
    # Logic for recommendation (Example)
    team_size = data.get('team_size', 0)
    tech_stack = data.get('tech_stack', '')
    
    # Simple logic - you can make this much more complex!
    if tech_stack == "python":
        tool = "Jenkins + PyTest"
    elif tech_stack == "java":
        tool = "Maven + SonarQube"
    else:
        tool = "GitHub Actions"

    return jsonify({"recommended_tool": tool})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
