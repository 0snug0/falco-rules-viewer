# Falco Rules Viewer

This is a simple tool to view Falco rules, macros, and lists, and their dependencies.

The application is a static single-page application that can be deployed to any static hosting provider, such as Cloudflare Pages.

## How it works

The Falco rules, macros, and lists are parsed from the YAML files in the `rules/` directory. This data is then used to generate a static `data.json` file that is served with the frontend.

## Development

To run the application locally, you need to have Node.js and npm installed.

1.  **Install dependencies:**
    ```bash
    cd falco-rules-viewer/frontend
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

## Building for production

To build the application for production, run the following command from the `falco-rules-viewer/frontend` directory:

```bash
npm run build
```

This will create a `build` directory with the static files. The `build_frontend.sh` script in the `falco-rules-viewer/frontend` directory can also be used to build the application. It will first generate the `data.json` file and then build the frontend.

## Add custom rules

If using the Sysdig Feed, remove the `falco_rules.yaml` file from the `rules/` directory and add the new rules, it can be any yaml file. After adding the new rules, you need to rebuild the application.

![Rules Viewer](/img/Rules%20Viewer.gif)

![Macro Viewer](/img/Macro%20Viewer.png)
