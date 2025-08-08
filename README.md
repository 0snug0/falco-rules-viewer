# Start Backend

```
python3 -m venv .venv
source .venv/bin/activate
pip install -r falco-rules-viewer/backend/requirements.txt
python3 falco-rules-viewer/backend/app.py
```

# Start Frontend

```
cd falco-rules-viewer/frontend
npm install
npm start
```

# Add custom rules

## Upload the rules
You can upload the rules directly into the UI, which will override the config and only show the rules from the uploaded directory

## Append to the rules or use multiple rule files

If using the Sysdig Feed, remove the `falco_rules.yaml` file from the `rules/` directory and add the new rules to override. Or you can add a new rules file and update the config to read all the rule files.

![Rules Viewer](/img/Rules%20Viewer.gif)

![Macro Viewer](/img/Macro%20Viewer.png)
