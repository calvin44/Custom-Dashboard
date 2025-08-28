# Custom Dashboard

Custom Dashboard is a cross-platform desktop application for managing and visualizing data. Built with Electron, React, and TypeScript for the frontend, and FastAPI (Python) for the backend, it provides a modern, responsive interface for data entry, review, and configuration management.

## Features

- **Dashboard View:** Visualize data with dynamic tables and summary statistics.
- **Configuration Management:** Edit, add, and delete configuration rows with validation and instant feedback.
- **Custom Title Bar & Navigation:** Electron-powered window controls and feature navigation.
- **Backend Integration:** FastAPI backend for data storage and retrieval, with robust file operations and concurrency control.
- **Cross-Platform Packaging:** Build scripts for Windows, macOS, and Linux using electron-builder.

## Technologies

- **Frontend:** Electron, React, TypeScript, MUI (Material UI)
- **Backend:** Python, FastAPI, Pydantic
- **Build Tools:** electron-vite, electron-builder, Vite, PyInstaller

## Project Structure

```
├── backend/
│   ├── app/
│   │   ├── custom_types.py
│   │   ├── file_ops.py
│   │   ├── main.py
│   │   ├── utils.py
│   │   └── services/
│   └── backend_app.spec
├── frontend/
│   ├── src/
│   │   ├── renderer/
│   │   ├── main/
│   │   └── preload/
│   ├── electron.vite.config.ts
│   ├── electron-builder.yml
│   └── ...
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Python](https://www.python.org/) (v3.10+ recommended)
- [VSCode](https://code.visualstudio.com/) (recommended IDE)

### Installation

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **(Optional) Set up Python environment for backend:**

   ```sh
   cd backend
   python -m venv env
   source env/bin/activate  # or .\env\Scripts\activate on Windows
   pip install -r requirements.txt
   ```

### Development

Start the Electron + React frontend (with backend auto-start in production):

```sh
npm run dev
```

### Build

Build the application for your platform:

```sh
# Windows
npm run build:win

# macOS
npm run build:mac

# Linux
npm run build:linux
```

## Usage

- **Dashboard:** View data and summary statistics.
- **Config:** Manage configuration rows, with validation for required fields.
- **Window Controls:** Use the custom title bar to minimize, maximize, or close the app.

## Backend API

The backend exposes the following endpoints:

- `GET /get-data-table` — Retrieve data.
- `POST /write-data-table` — Update data.
- `GET /get-config` — Retrieve configuration data.
- `POST /overwrite-config` — Overwrite configuration data.

## Contributing

Contributions are welcome! Please submit issues or pull requests via GitHub.

## License

This project is licensed under the MIT License.

---