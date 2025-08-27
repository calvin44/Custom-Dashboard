from typing import List
from loguru import logger
from app.file_ops import read_data_table, write_data_table
from app.custom_types import DataRow, DataTable


def upsert_data_table(new_data: DataTable) -> None:
    """
    Update the existing JSON data with a new DataTable object.

    - If the BrandName differs from the existing data, overwrite entirely.
    - If the BrandName is the same, merge TableData:
        - Update rows with the same Rod
        - Append new Rods
        - Sort TableData by Rod

    Args:
        new_data (DataTable): The new data to insert or update.
    """
    # Read current JSON
    current_data = read_data_table()

    # Check if brand name exists and matches
    if not current_data or current_data.get("BrandName") != new_data["BrandName"]:
        # Overwrite entirely
        logger.info(f"Overwriting data for brand: {new_data['BrandName']}")
        write_data_table(new_data)
        return

    logger.info(f"Merging data for brand: {new_data['BrandName']}")
    # Merge TableData by Rod
    existing_rows: List[DataRow] = current_data.get("TableData", [])
    new_rows: List[DataRow] = new_data.get("TableData", [])

    # Create a mapping of Rod -> row for easy update
    rod_map = {row["Rod"]: row for row in existing_rows}

    for row in new_rows:
        rod_map[row["Rod"]] = row  # overwrite or append

    # Sort rows by Rod
    merged_rows = sorted(rod_map.values(), key=lambda r: r["Rod"])

    # Write updated data
    updated_data: DataTable = {
        "BrandName": new_data["BrandName"],
        "TableData": merged_rows
    }
    write_data_table(updated_data)
