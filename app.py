from flask import Flask, request, render_template, jsonify
import google.generativeai as genai

app = Flask(__name__)

# Get API key from Google AI Studio
GEMINI_API_KEY = ""
genai.configure(api_key=GEMINI_API_KEY)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask():
    data = request.json
    user_input = data.get('message', '')
    
    try:
        model = genai.GenerativeModel('gemini-1.5-pro')
        
        system_prompt = """You are Greenie, a friendly and knowledgeable chatbot focused on sustainability and eco-friendly practices. Your goal is to educate users about the environmental and health benefits of Livlit Organic Pads and encourage them to make the switch from conventional menstrual products. Keep your responses short, engaging, and positive. Use persuasive and empathetic messaging without being pushy. Always highlight the benefits of Livlit and provide actionable tips or resources when needed."""
        
        response = model.generate_content(
            contents=[{"role": "user", "parts": [system_prompt, user_input]}]
        )
        
        return jsonify({"response": response.text})
    except Exception as e:
        return jsonify({"response": f"Sorry, I encountered an error: {str(e)}"})

if __name__ == '__main__':
    app.run(debug=True,port=5001)
