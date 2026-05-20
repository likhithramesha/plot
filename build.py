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
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
  <script id="tailwind-config">
    tailwind.config = {{
      darkMode: "class",
      theme: {{
        extend: {{
          colors: {{
            "on-background": "#1a1c1a",
            "surface": "#faf9f6",
            "inverse-primary": "#d3c5ad",
            "on-surface": "#1a1c1a",
            "on-tertiary-fixed": "#26181a",
            "tertiary-container": "#fee3e5",
            "secondary-container": "#dbe2fa",
            "primary-fixed-dim": "#d3c5ad",
            "on-tertiary-fixed-variant": "#544244",
            "on-primary-fixed-variant": "#4f4533",
            "tertiary": "#6d595b",
            "tertiary-fixed": "#f7dcde",
            "error": "#ba1a1a",
            "inverse-surface": "#2f312f",
            "on-secondary-container": "#5d6478",
            "tertiary-fixed-dim": "#dac0c2",
            "secondary-fixed": "#dbe2fa",
            "error-container": "#ffdad6",
            "on-error": "#ffffff",
            "on-secondary-fixed-variant": "#3f4759",
            "surface-bright": "#faf9f6",
            "surface-container": "#efeeeb",
            "on-secondary-fixed": "#141b2c",
            "inverse-on-surface": "#f2f1ee",
            "on-primary-container": "#726753",
            "surface-dim": "#dbdad7",
            "secondary": "#575e72",
            "on-error-container": "#93000a",
            "on-primary-fixed": "#221b0b",
            "on-secondary": "#ffffff",
            "on-primary": "#ffffff",
            "surface-container-low": "#f4f3f1",
            "on-tertiary": "#ffffff",
            "primary-container": "#f7e7ce",
            "surface-container-highest": "#e3e2e0",
            "primary": "#685d4a",
            "outline-variant": "#cec5ba",
            "surface-container-lowest": "#ffffff",
            "secondary-fixed-dim": "#bfc6dd",
            "surface-variant": "#e3e2e0",
            "background": "#faf9f6",
            "outline": "#7d766c",
            "on-surface-variant": "#4b463d",
            "primary-fixed": "#f0e0c8",
            "surface-container-high": "#e9e8e5",
            "surface-tint": "#685d4a",
            "on-tertiary-container": "#786466"
          }},
          borderRadius: {{
            "DEFAULT": "0.25rem",
            "lg": "0.5rem",
            "xl": "0.75rem",
            "full": "9999px",
            "xxl": "1.5rem",
            "3xl": "2rem"
          }},
          spacing: {{
            "lg": "24px",
            "xl": "32px",
            "md": "16px",
            "xs": "4px",
            "container-max": "1200px",
            "unit": "4px",
            "gutter": "20px",
            "xxl": "48px",
            "sm": "8px"
          }},
          fontFamily: {{
            "label-sm": ["Plus Jakarta Sans"],
            "headline-lg": ["Bricolage Grotesque"],
            "headline-md": ["Bricolage Grotesque"],
            "body-md": ["Plus Jakarta Sans"],
            "body-lg": ["Plus Jakarta Sans"],
            "headline-lg-mobile": ["Bricolage Grotesque"],
            "display-lg": ["Bricolage Grotesque"],
            "label-md": ["Plus Jakarta Sans"]
          }},
          fontSize: {{
            "label-sm": ["12px", {{ "lineHeight": "1.2", "fontWeight": "500" }}],
            "headline-lg": ["32px", {{ "lineHeight": "1.2", "fontWeight": "700" }}],
            "headline-md": ["24px", {{ "lineHeight": "1.3", "fontWeight": "600" }}],
            "body-md": ["16px", {{ "lineHeight": "1.5", "fontWeight": "400" }}],
            "body-lg": ["18px", {{ "lineHeight": "1.6", "fontWeight": "400" }}],
            "headline-lg-mobile": ["28px", {{ "lineHeight": "1.2", "fontWeight": "700" }}],
            "display-lg": ["48px", {{ "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "800" }}],
            "label-md": ["14px", {{ "lineHeight": "1.2", "letterSpacing": "0.01em", "fontWeight": "600" }}]
          }},
          boxShadow: {{
            'soft': '0 10px 30px -10px rgba(0, 0, 0, 0.04)',
            'glow': '0 0 20px rgba(136, 172, 240, 0.4)'
          }}
        }}
      }}
    }};
  </script>
  <style>
    body, html {{
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #f5f2eb 0%, #eef3ff 50%, #fef3eb 100%);
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      height: 100vh;
      overflow: hidden;
    }}
    * {{ box-sizing: border-box; }}
    
    .material-symbols-outlined {{
      font-family: 'Material Symbols Outlined';
      font-weight: normal;
      font-style: normal;
      font-size: 24px;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      -webkit-font-feature-settings: 'liga';
      -webkit-font-smoothing: antialiased;
    }}
    
    .aura-gradient {{
      background: radial-gradient(circle at center, rgba(136, 172, 240, 0.25) 0%, rgba(246, 203, 206, 0.15) 50%, transparent 100%);
      animation: pulse-aura 4s ease-in-out infinite alternate;
    }}

    @keyframes pulse-aura {{
      0% {{ transform: scale(1); opacity: 0.8; }}
      100% {{ transform: scale(1.1); opacity: 1; }}
    }}

    .aura-bg {{
      background: radial-gradient(circle at center, rgba(219, 226, 250, 0.7) 0%, rgba(254, 227, 229, 0.5) 50%, transparent 70%);
      animation: pulse-aura-slow 5s ease-in-out infinite;
    }}
    
    @keyframes pulse-aura-slow {{
      0% {{ transform: scale(1); opacity: 0.5; }}
      50% {{ transform: scale(1.05); opacity: 0.8; }}
      100% {{ transform: scale(1); opacity: 0.5; }}
    }}

    .hide-scrollbar::-webkit-scrollbar {{
      display: none;
    }}
    .hide-scrollbar {{
      -ms-overflow-style: none;
      scrollbar-width: none;
    }}
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

