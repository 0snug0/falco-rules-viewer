# Falco Rules Viewer

This is a simple tool to view Falco rules, macros, and lists, and their dependencies.

The application is a static single-page application that can be deployed to any static hosting provider.

## Quick Start with Docker

### Local Docker with default rules

```
docker run -d -p 3000:3000 --name=falco-rules-viewer ghcr.io/0snug0/falco-rules-viewer:main
```

Open http://localhost:3000 in your browser.

### Local Docker with custom rules

You will need to copy your rules to the `rules/` directory. Any yaml file will work. The rules are not being deduplicated or following any of the override logic built into falco. 

```
docker run -d -p 3000:3000 --volume ./rules/:/app/rules/ --name=falco-rules-viewer ghcr.io/0snug0/falco-rules-viewer:main
```

Open http://localhost:3000 in your browser.


## How it works

The Falco rules, macros, and lists are parsed from the YAML files in the `rules/` directory. This data is then used to generate a static `data.json` file that is served with the frontend.

## Development

To run the application locally, you need to have Node.js and npm installed.

1.  **Install dependencies:**
    ```bash
    cd frontend
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm start
    ```
    This will start a development server and open the application in your browser. The `data.json` file is not generated in this mode, so the application will not be able to fetch the data. To fix this, you can run the following command in a separate terminal from the `falco-rules-viewer` directory:
    ```bash
    python3 generate_data.py
    ```

## Container Builder

To build the container, be sure to add your custom rules to the rules directory first. Once added to that folder you can build and run your container
```
docker build -t falco-rules-viewer .
docker run -p 3000:3000 falco-rules-viewer
```

## Add custom rules

If using the Sysdig Feed, remove the `falco_rules.yaml` file from the `rules/` directory and add the new rules, it can be any yaml file. After adding the new rules, you need to rebuild the application.

![Rules Viewer](/img/Rules%20Viewer.gif)

![Macro Viewer](/img/Macro%20Viewer.png)