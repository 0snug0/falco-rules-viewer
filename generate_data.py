import yaml
import os
import re
import json

def parse_rules_files():
    rules_data = {
        "rules": [],
        "macros": [],
        "lists": [],
    }
    rules_dir = './rules'
    for filename in os.listdir(rules_dir):
        if filename.endswith('.yaml'):
            filepath = os.path.join(rules_dir, filename)
            with open(filepath, 'r') as f:
                docs = yaml.safe_load_all(f)
                for doc in docs:
                    if not doc:
                        continue
                    for item in doc:
                        if 'rule' in item:
                            rules_data['rules'].append(item)
                        elif 'macro' in item:
                            rules_data['macros'].append(item)
                        elif 'list' in item:
                            rules_data['lists'].append(item)
    return rules_data

def build_dependencies(data):
    # In-memory database
    db = {
        "rules": {item['rule']: item for item in data['rules']},
        "macros": {item['macro']: item for item in data['macros']},
        "lists": {item['list']: item for item in data['lists']},
    }

    # Usages database
    usages = {
        "macros": {macro: [] for macro in db['macros']},
        "lists": {lst: [] for lst in db['lists']},
    }

    # Find direct usages
    for rule_name, rule_data in db['rules'].items():
        condition = rule_data.get('condition', '')
        # find macros in condition
        for macro_name in db['macros']:
            if re.search(r'\b' + macro_name + r'\b', condition):
                if rule_name not in usages['macros'][macro_name]:
                    usages['macros'][macro_name].append(rule_name)
        # find lists in condition
        for list_name in db['lists']:
            if re.search(r'\bin\s*\(\s*' + list_name + r'\b', condition):
                if rule_name not in usages['lists'][list_name]:
                    usages['lists'][list_name].append(rule_name)

    for macro_name, macro_data in db['macros'].items():
        condition = macro_data.get('condition', '')
        # find lists in condition
        for list_name in db['lists']:
            if re.search(r'\b' + list_name + r'\b', condition):
                 # if a macro uses a list, any rule using that macro also uses the list
                for rule_using_macro in usages['macros'][macro_name]:
                    if rule_using_macro not in usages['lists'][list_name]:
                        usages['lists'][list_name].append(rule_using_macro)


    return usages

def main():
    data = parse_rules_files()
    dependencies = build_dependencies(data)

    # Combine data and dependencies for the response
    response_data = {
        "rules": data['rules'],
        "macros": data['macros'],
        "lists": data['lists'],
        "dependencies": dependencies
    }

    output_path = 'frontend/public/data.json'
    with open(output_path, 'w') as f:
        json.dump(response_data, f, indent=2)
    print(f"Data successfully generated at {output_path}")

if __name__ == '__main__':
    main()