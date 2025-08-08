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

If using the Sysdig Feed, remove the `falco_rules.yaml` file from the `rules/` directory and add the new rules, it can be any yaml file.

![Rules Viewer](/img/Rules%20Viewer.gif)
![Macro Viewer](/img/Macro%20Viewer.gif)
