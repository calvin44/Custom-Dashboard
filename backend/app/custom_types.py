from typing import List, TypedDict


class DataRow(TypedDict):
    """
    Represents a single row of measurement data in a table.

    Attributes:
        Ovality (str): The measured ovality value.
        PD (str): The partial discharge value.
        Rod (int): Rod number or identifier.
        SizeL (str): Length or size descriptor.
        Weight (str): Weight measurement or descriptor.
    """
    Ovality: str
    PD: str
    Rod: int
    SizeL: str
    Weight: str


class DataTable(TypedDict):
    """
    Represents a complete data table with a brand name and multiple data rows.

    Attributes:
        BrandName (str): Name of the brand or source of the data.
        TableData (List[DataRow]): List of rows containing measurement data.
    """
    BrandName: str
    TableData: List[DataRow]
