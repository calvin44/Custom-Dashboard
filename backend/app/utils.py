import os
import platform
from pathlib import Path
from dataclasses import dataclass

from app.custom_types import ConfigRow


@dataclass
class RuntimeFileInfo:
    """
    Container for application runtime file paths.

    Attributes
    ----------
    runtime_dir : Path
        Directory where runtime files are stored.
    json_file_path : Path
        Path to the application's main data file (data.json).
    config_file_path : Path
        Path to the application's configuration file (config.json).
    """
    runtime_dir: Path
    datatable_json: Path
    config_json: Path


def get_runtime_file_info(app_name: str = "MyDashboard") -> RuntimeFileInfo:
    """
    Prepare and return paths for application runtime files.

    This function ensures that a dedicated runtime directory exists under a
    suitable per-user application data folder, depending on the operating system.
    It then constructs and returns paths for commonly used runtime files.

    Parameters
    ----------
    app_name : str, optional
        The name of the application, used to create an app-specific
        subdirectory under the platform's application data folder.
        Default is "MyDashboard".

    Returns
    -------
    RuntimeFileInfo
        A dataclass instance containing:
        - runtime_dir: Path to the runtime directory.
        - json_file_path: Path to the application's data file (data.json).
        - config_file_path: Path to the application's configuration file (config.json).

    Notes
    -----
    - On Windows, the base directory is taken from the LOCALAPPDATA environment variable.
    - On Linux, the base directory is ~/.local/share.
    - On macOS, the base directory is ~/Library/Application Support.
    - The runtime directory will be created if it does not already exist.
    """
    system = platform.system()

    if system == "Windows":
        base_dir = Path(os.getenv("LOCALAPPDATA", str(Path.home())))
    elif system == "Darwin":  # macOS
        base_dir = Path.home() / "Library" / "Application Support"
    else:  # Linux and other Unix
        base_dir = Path.home() / ".local" / "share"

    runtime_dir = base_dir / app_name
    runtime_dir.mkdir(parents=True, exist_ok=True)

    return RuntimeFileInfo(
        runtime_dir=runtime_dir,
        datatable_json=runtime_dir / "data.json",
        config_json=runtime_dir / "config.json",
    )


def config_rows_to_dicts(rows: list[ConfigRow]) -> list[dict]:
    """Convert a list of ConfigRow Pydantic objects into dictionaries for JSON serialization."""
    return [row.model_dump() for row in rows]
