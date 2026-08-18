<div align="center">

# NODEFORGE

### Visual Programming Studio

**Build logic. Connect nodes. Create without limits.**

<br>

<a href="https://github.com/k7codes/NodeForge">
<img src="https://img.shields.io/badge/Repository-18181B?style=for-the-badge&logo=github&logoColor=white" alt="Repository">
</a>
<a href="https://github.com/k7codes/NodeForge/stargazers">
<img src="https://img.shields.io/github/stars/k7codes/NodeForge?style=for-the-badge&logo=github&logoColor=white" alt="Stars">
</a>
<a href="https://github.com/k7codes/NodeForge/network/members">
<img src="https://img.shields.io/github/forks/k7codes/NodeForge?style=for-the-badge&logo=github&logoColor=white" alt="Forks">
</a>

<br><br>

<img src="https://skillicons.dev/icons?i=react,typescript,vite,tailwind,express&perline=5" alt="Technology Stack">

</div>

---

<div align="center">

## About

</div>

**NodeForge** is a modern node-based visual programming environment designed to make application logic easier to design, understand and manage.

Instead of manually writing and connecting every part of an application's logic, NodeForge provides a visual workspace where operations can be represented as nodes and connected through a structured workflow.

The project focuses on a modular architecture that allows the visual editor, validation system, services, state management and generation logic to evolve independently.

---

<div align="center">

## Features

</div>

<table>
<tr>
<td width="50%">

### Visual Node Graph

Create and organize application logic through interconnected nodes and visual workflows.

</td>
<td width="50%">

### Modular Architecture

Separate components, services, state, validation, types and generation logic into dedicated modules.

</td>
</tr>

<tr>
<td width="50%">

### Interactive Workspace

A modern interface designed around visual interaction and graph-based development.

</td>
<td width="50%">

### Type-Safe Development

Built with TypeScript to provide predictable and maintainable application logic.

</td>
</tr>

<tr>
<td width="50%">

### Server Integration

Express-based server infrastructure for application and backend functionality.

</td>
<td width="50%">

### Extensible Design

The architecture is designed to support additional nodes, services and generation capabilities.

</td>
</tr>
</table>

---

<div align="center">

## Technology

<br>

<img src="https://skillicons.dev/icons?i=react,typescript,vite,tailwind,express&perline=5" alt="Technologies">

<br><br>

|  Technology  | Purpose             |
| :----------: | :------------------ |
|     React    | User Interface      |
|  TypeScript  | Application Logic   |
|     Vite     | Development & Build |
| Tailwind CSS | Styling             |
|    Express   | Server Layer        |

</div>

---

<div align="center">

## Architecture

</div>

```text
                         ┌─────────────────────┐
                         │      NodeForge      │
                         │   Visual Studio     │
                         └──────────┬──────────┘
                                    │
                         ┌──────────▼──────────┐
                         │    Visual Editor    │
                         └──────────┬──────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
             ┌──────▼──────┐ ┌─────▼─────┐ ┌──────▼──────┐
             │    Nodes     │ │   State   │ │ Components  │
             └──────┬──────┘ └─────┬─────┘ └─────────────┘
                    │              │
                    └───────┬──────┘
                            │
                    ┌───────▼────────┐
                    │   Validation   │
                    └───────┬────────┘
                            │
                    ┌───────▼────────┐
                    │    Services    │
                    └───────┬────────┘
                            │
                    ┌───────▼────────┐
                    │    Generator   │
                    └───────┬────────┘
                            │
                    ┌───────▼────────┐
                    │     Server     │
                    └────────────────┘
```

---

<div align="center">

## Project Structure

</div>

```text
NodeForge/
│
├── src/
│   ├── bilesenler/
│   │   └── UI components
│   │
│   ├── dogrulama/
│   │   └── Validation
│   │
│   ├── durum/
│   │   └── Application state
│   │
│   ├── servisler/
│   │   └── Services
│   │
│   ├── tanimlar/
│   │   └── Definitions
│   │
│   ├── tipler/
│   │   └── TypeScript types
│   │
│   └── uretici/
│       └── Generation logic
│
├── server.ts
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

<div align="center">

## Installation

</div>

### Requirements

* Node.js
* npm

### Clone

```bash
git clone https://github.com/k7codes/NodeForge.git
cd NodeForge
```

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Start

```bash
npm start
```

---

<div align="center">

## Development Workflow

</div>

```text
Create Node
     │
     ▼
Configure Node
     │
     ▼
Connect Nodes
     │
     ▼
Validate Graph
     │
     ▼
Process Logic
     │
     ▼
Generate Output
```

---

<div align="center">

## Roadmap

</div>

|  Status | Feature                   |
| :-----: | ------------------------- |
| Planned | Expanded node library     |
| Planned | Custom node creation      |
| Planned | Project save / load       |
| Planned | Import / export           |
| Planned | Advanced graph validation |
| Planned | Execution debugger        |
| Planned | Improved code generation  |
| Planned | Node templates            |
| Planned | Plugin architecture       |
| Planned | Project management        |

---

<div align="center">

## Contributing

</div>

Contributions and improvements are welcome.

```bash
git checkout -b feature/my-feature
```

```bash
git add .
git commit -m "Add new feature"
git push origin feature/my-feature
```

Then open a Pull Request.

---

<div align="center">

## Author

<br>

<a href="https://github.com/k7codes">
<img src="https://github.com/k7codes.png" width="100" alt="K7">
</a>

<br>

### K7~

<a href="https://github.com/k7codes">
<img src="https://img.shields.io/badge/GitHub-k7codes-18181B?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
</a>

<br><br>

**NodeForge**

`Build logic visually.`

</div>
