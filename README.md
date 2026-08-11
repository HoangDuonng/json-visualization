<!-- PROJECT LOGO -->
<p align="center">
  <a href="https://github.com/HoangDuonng/Json_Visualization">
   <img src="./public/assets/192.png" height="50" alt="Logo">
  </a>

  <h1 align="center">JSON Visualization</h1>

  <p align="center">
    The open-source JSON Editor.
    <br />
    <a href="https://jsonviz.online"><strong>Learn more »</strong></a>
    <br />
    <br />
    <a href="https://github.com/HoangDuonng/Json_Visualization/issues">Issues</a>
  </p>
</p>

<!-- ABOUT THE PROJECT -->

## About the Project

<img width="100%" alt="booking-screen" src="./public/assets/editor.webp">

## Visualize JSON into interactive graphs

JSON Visualization is a tool for visualizing JSON data in a structured, interactive graphs, making it easier to explore, format, and validate JSON. It offers features like converting JSON to other formats (CSV, YAML), generating JSON Schema, executing queries, and exporting visualizations as images. Designed for both readability and usability.

- **Visualizer**: Instantly convert JSON, YAML, CSV, XML, and TOML into interactive graphs or trees in dark or light mode.
- **Convert**: Seamlessly transform data formats, like JSON to CSV or XML to JSON, for easy sharing.
- **Format & Validate**: Beautify and validate JSON, YAML, and CSV for clear and accurate data.
- **Code Generation**: Generate TypeScript interfaces, Golang structs, and JSON Schema.
- **JSON Schema**: Create JSON Schema, mock data, and validate various data formats.
- **Advanced Tools**: Decode JWT, randomize data, and run jq or JSON path queries.
- **Export Image**: Download your visualization as PNG, JPEG, or SVG.
- **Privacy**: All data processing is local; nothing is stored on our servers.

## Built With

- [Next.js](https://nextjs.org/)
- [React.js](https://react.dev/)
- [Reaflow](https://github.com/reaviz/reaflow)
- [Monaco Editor](https://github.com/suren-atoyan/monaco-react)

## For AI Agents

This repository includes [Agent Skills](.agents/skills/) - structured documentation to help AI coding assistants understand and work with this codebase effectively.

**Quick start for agents**: Read [`.agents/skills/json-visualization-dev/SKILL.md`](.agents/skills/json-visualization-dev/SKILL.md) for project overview, architecture, and development guidelines.

## Stay Up-to-Date

Watch **releases** of this repository to be notified of future updates:

<a href="https://github.com/HoangDuonng/Json_Visualization"><img src="https://img.shields.io/github/stars/HoangDuonng/Json_Visualization" alt="Star at GitHub" /></a>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running, please follow these simple steps.

### Prerequisites

Here is what you need to be able to run JSON Visualization.

- Node.js (Version: >=18.x)
- Pnpm _(recommended)_

## Development

### Setup

1. Clone the repo into a public GitHub repository (or fork https://github.com/HoangDuonng/Json_Visualization/fork). If you plan to distribute the code, read the [`LICENSE`](/LICENSE.md) for additional details.

   ```sh
   git clone https://github.com/HoangDuonng/Json_Visualization.git
   ```

2. Go to the project folder

   ```sh
   cd Json_Visualization
   ```

3. Install packages

   ```sh
   pnpm install
   ```

4. Run the project

   ```sh
   pnpm dev

   # Running on http://localhost:3000/
   ```

### Docker

🐳 A [`Dockerfile`](Dockerfile) is provided in the root of the repository.
If you want to run JSON Visualization locally:

```console
# Build a Docker image with:
docker compose build

# Run locally with `docker-compose`
docker compose up

# Go to http://localhost:8888
```

## Configuration

The supported node limit can be changed by editing the `NEXT_PUBLIC_NODE_LIMIT` value in the `.env` file at the project root.

<!-- LICENSE -->

## License

See [`LICENSE`](/LICENSE.md) for more information.
