import re

with open('PlotApp.jsx', 'r') as f:
    code = f.read()

# remove imports
code = re.sub(r'import .* from "react";', '', code)

# replace export default
code = code.replace('export default function PlotApp', 'function PlotApp')

html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Plot Prototype</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    body, html {{
      margin: 0;
      padding: 0;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: #111;
      height: 100vh;
      overflow: hidden;
    }}
    * {{ box-sizing: border-box; }}
  </style>
  <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const {{ useState, useMemo, useEffect }} = React;
    {code}
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<PlotApp />);
  </script>
</body>
</html>"""

for filename in ['test.html', 'index.html', 'app.html']:
    with open(filename, 'w') as f:
        f.write(html)
