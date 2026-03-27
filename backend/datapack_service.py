import os
import json

BASE_PATH = os.path.join(os.getcwd(), "generated_datapacks")


def ensure_base():
    os.makedirs(BASE_PATH, exist_ok=True)


def create_datapack(name, namespace):
    ensure_base()

    dp_path = os.path.join(BASE_PATH, name)
    recipes_path = os.path.join(dp_path, "data", namespace, "recipes")

    os.makedirs(recipes_path, exist_ok=True)

    mcmeta = {
        "pack": {
            "pack_format": 48,
            "description": name
        }
    }

    with open(os.path.join(dp_path, "pack.mcmeta"), "w") as f:
        json.dump(mcmeta, f, indent=2)

    return {
        "path": dp_path,
        "namespace": namespace
    }


def save_recipe(dp_path, namespace, subfolder, filename, recipe_data):
    recipe_dir = os.path.join(dp_path, "data", namespace, "recipes", subfolder)

    os.makedirs(recipe_dir, exist_ok=True)

    file_path = os.path.join(recipe_dir, f"{filename}.json")

    with open(file_path, "w") as f:
        json.dump(recipe_data, f, indent=2)

    return {"saved_to": file_path}


def scan_recipes(dp_path):
    data_dir = os.path.join(dp_path, "data")
    all_recipes = []

    if not os.path.exists(data_dir):
        return []

    for namespace in os.listdir(data_dir):
        ns_recipes = os.path.join(data_dir, namespace, "recipes")

        if not os.path.exists(ns_recipes):
            continue

        for root, _, files in os.walk(ns_recipes):
            for file in files:
                if file.endswith(".json"):
                    full_path = os.path.join(root, file)

                    try:
                        with open(full_path) as f:
                            data = json.load(f)

                        rel_path = os.path.relpath(full_path, ns_recipes)

                        all_recipes.append({
                            "namespace": namespace,
                            "file": rel_path,
                            "type": data.get("type", "unknown"),
                            "data": data
                        })

                    except Exception as e:
                        all_recipes.append({
                            "namespace": namespace,
                            "file": file,
                            "error": str(e)
                        })

    return all_recipes
