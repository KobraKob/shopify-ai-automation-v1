from flask import Flask, request, jsonify
from flask_cors import CORS
from run_listing_pipeline import run_listing_pipeline

app = Flask(__name__)
CORS(app, resources={r"/generate-listing": {"origins": "http://localhost:5173"}})

@app.route("/generate-listing", methods=["POST"])
def generate_listing():
    try:
        data = request.get_json()
        print("Received data:", data)

        product_description = data.get("product_description")
        additional_details = data.get("additional_details")
        base_keywords = data.get("base_keywords")
        upload_flag = data.get("upload", False)  # Default to False if not provided

        if not product_description or not additional_details or not base_keywords:
            return jsonify({"error": "Missing required fields"}), 400

        result = run_listing_pipeline(product_description, additional_details, base_keywords, upload=upload_flag)

        if "error" in result:
            return jsonify(result), 500

        return jsonify(result)

    except Exception as e:
        print("❌ API error:", e)
        return jsonify({"error": "API request failed", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=False)