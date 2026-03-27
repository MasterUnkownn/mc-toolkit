from flask import Flask, request, jsonify
from datapack_service import create_datapack, scan_recipes, save_recipe

app = Flask(__name__)


@app.route("/api/create_datapack", methods=["POST"])
def api_create():
    data = request.json

    return jsonify(create_datapack(
        data.get("name"),
        data.get("namespace", "default")
    ))


@app.route("/api/save_recipe", methods=["POST"])
def api_save_recipe():
    data = request.json

    result = save_recipe(
        data["path"],
        data["namespace"],
        data.get("subfolder", ""),
        data["filename"],
        data["recipe"]
    )

    return jsonify(result)


@app.route("/api/scan_recipes", methods=["POST"])
def api_scan():
    return jsonify(scan_recipes(request.json["path"]))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
