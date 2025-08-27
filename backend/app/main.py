from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import uvicorn

from app.custom_types import ConfigRow
from app.file_ops import read_config, read_data_table, write_config
from app.services.handle_write_data_table import upsert_data_table
from app.utils import get_runtime_file_info


@asynccontextmanager
async def lifespan(_: FastAPI):
    """Lifespan context for the FastAPI application."""
    # Setup runtime directory
    runtime_info = get_runtime_file_info()

    print(
        f"App runtime directory: {runtime_info.runtime_dir}\nJSON file path: {runtime_info.datatable_json}\nConfig file path: {runtime_info.config_json}"
    )
    yield  # app runs here
    # optional shutdown code here


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    """Root endpoint"""
    return {"message": "Dashboard backend running"}


@app.get("/get-data-table")
def get_data_table_handler():
    """Get data table endpoint"""
    data_table = read_data_table()
    return data_table


@app.post("/write-data-table")
def write_data_table_handler(payload: dict):
    """Write data table endpoint"""
    upsert_data_table(payload)
    return {"status": "ok"}


@app.get("/get-config")
def get_config_handler():
    """Read config json file"""
    data_table = read_config()
    return data_table


@app.post("/overwrite-config")
def overwrite_config_handler(payload: list[ConfigRow]):
    """Overwrite config endpoint"""
    write_config(payload)
    return {"status": "ok"}


def main():
    """Main entrypoint to run FastAPI with uvicorn"""
    uvicorn.run(
        "app.main:app",  # module:variable
        host="0.0.0.0",  # listen on all interfaces
        port=8000,
        reload=True
    )


if __name__ == "__main__":
    main()
