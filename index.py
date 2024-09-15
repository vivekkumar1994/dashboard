from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
import json
from flask_cors import CORS

app = Flask(__name__)

# MongoDB connection configuration
app.config["MONGO_URI"] = "mongodb://127.0.0.1:27017/dashboard"
CORS(app)
mongo = PyMongo(app)

# Load JSON data from file
with open('jsondata.json', encoding='utf-8', errors='replace') as f:
    jsondata = json.load(f)


# Endpoint to add products
@app.route('/add-product', methods=['POST'])
def add_product():
    try:
        # Insert JSON data into the collection
        result = mongo.db.dashboard.insert_many(jsondata)
        # Send response with the result of the insertion
        return jsonify({"message": "Products added successfully", "insertedCount": len(result.inserted_ids)}), 201
    except Exception as e:
        # Send error response if something goes wrong
        return jsonify({"message": "Error adding products", "error": str(e)}), 500

# Endpoint to get products
@app.route('/get-products', methods=['GET'])
def get_products():
    try:
        # Fetch all products from the collection
        products = list(mongo.db.dashboard.find({}))
        # Convert MongoDB documents to JSON serializable format
        for product in products:
            product['_id'] = str(product['_id'])  # Convert ObjectId to string
        # Send the fetched products as the response
        return jsonify(products), 200
    except Exception as e:
        # Send error response if something goes wrong
        return jsonify({"message": "Error fetching products", "error": str(e)}), 500

# Start the Flask server
if __name__ == '__main__':
    app.run(port=6002)
