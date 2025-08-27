import json
from threading import Lock
from app.custom_types import ConfigRow, DataTable
from app.utils import config_rows_to_dicts, get_runtime_file_info

lock = Lock()  # Prevent concurrent writes


def read_data_table() -> DataTable:
    """
    Read DataTable and return Object
    """
    try:
        runtime_info = get_runtime_file_info()
        with open(runtime_info.datatable_json, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return {}


def read_config() -> list[ConfigRow]:
    """
    Read config file and return list of ConfigRow
    """
    try:
        runtime_info = get_runtime_file_info()
        with open(runtime_info.config_json, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return []


def write_data_table(data: DataTable):
    """
    Write a dictionary to a JSON file.
    """
    with lock:
        runtime_info = get_runtime_file_info()
        with open(runtime_info.datatable_json, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)


def write_config(data: list[ConfigRow]):
    """
    Write a dictionary to a JSON file.
    """
    with lock:
        runtime_info = get_runtime_file_info()
        with open(runtime_info.config_json, "w", encoding="utf-8") as f:
            json.dump(config_rows_to_dicts(data),
                      f, indent=2, ensure_ascii=False)
