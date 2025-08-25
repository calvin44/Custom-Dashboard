import json
from threading import Lock
from typing import Dict, Union

from app.custom_types import DataTable
from app.utils import get_runtime_file_info

lock = Lock()  # Prevent concurrent writes


def read_json() -> Union[DataTable, Dict]:
    """
    Read JSON file and return its dictionary content.
    """
    try:
        _, file_path = get_runtime_file_info()
        with open(file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return {}


def write_json(data: dict):
    """
    Write a dictionary to a JSON file.
    """
    with lock:
        _, file_path = get_runtime_file_info()
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
