from pathlib import Path
import os


def get_runtime_file_info() -> tuple[Path, Path]:
    """Get the path to the data file."""
    runtime_dir = Path(os.getenv("LOCALAPPDATA")) / "MyDashboard"
    runtime_dir.mkdir(exist_ok=True)  # ensure folder exists
    return runtime_dir, runtime_dir / "data.json"
