from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import uvicorn

from app.file_ops import read_json
from app.services.handle_write_data_table import upsert_data_table
from app.utils import get_runtime_file_info


@asynccontextmanager
async def lifespan(_: FastAPI):
    """Lifespan context for the FastAPI application."""
    # Setup runtime directory
    runtime_dir, json_file_path = get_runtime_file_info()

    print(
        f"App runtime directory: {runtime_dir}\nJSON file path: {json_file_path}"
    )
    yield  # app runs here
    # optional shutdown code here


app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    """Root endpoint"""
    return {"message": "Dashboard backend running"}


@app.get("/get-data-table")
def get_data_table():
    """Get data table endpoint"""
    data_table = read_json()
    return data_table


@app.post("/write-data-table")
def write_data_table(payload: dict):
    """Write data table endpoint"""
    upsert_data_table(payload)
    return {"status": "ok"}


def main():
    """Main entrypoint to run FastAPI with uvicorn"""
    uvicorn.run(
        "app.main:app",  # module:variable
        host="0.0.0.0",  # listen on all interfaces
        port=8000,
        reload=False
    )


if __name__ == "__main__":
    main()
