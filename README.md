<div align="center">

<img src="https://raw.githubusercontent.com/k7codes/NodeForge/main/assets/nodeforge-banner.png" width="900">

<br>

# NodeForge

### Visual Programming Studio

A modern node-based environment for designing, connecting and managing application logic visually.

<br>

<a href="https://github.com/k7codes/NodeForge/stargazers">
<img src="https://img.shields.io/github/stars/k7codes/NodeForge?style=for-the-badge&logo=github&label=STARS" alt="Stars">
</a>
&nbsp;
<a href="https://github.com/k7codes/NodeForge/network/members">
<img src="https://img.shields.io/github/forks/k7codes/NodeForge?style=for-the-badge&logo=github&label=FORKS" alt="Forks">
</a>
&nbsp;
<a href="https://github.com/k7codes/NodeForge">
<img src="https://img.shields.io/github/last-commit/k7codes/NodeForge?style=for-the-badge&label=LAST%20COMMIT" alt="Last Commit">
</a>

<br><br>

<img src="https://skillicons.dev/icons?i=react,typescript,vite,tailwind,express&theme=dark" alt="Tech Stack">

</div>

---

<div align="center">

## Overview

</div>

NodeForge is a modern **visual programming studio** designed around a node-based workflow.

The goal is to make application logic easier to design, understand and maintain by representing operations and relationships through an interactive visual graph.

<div align="center">

<img src="https://raw.githubusercontent.com/k7codes/NodeForge/main/assets/preview.png" width="900" alt="NodeForge Preview">

</div>

---

<div align="center">

## Core Features

</div>

<table>
<tr>
<td width="50%" valign="top">

### <img src="https://img.icons8.com/fluency/28/workflow.png" width="22"> Node-Based Workflow

Create application logic using connected visual nodes instead of manually managing every relationship.

</td>
<td width="50%" valign="top">

### <img src="https://img.icons8.com/fluency/28/design.png" width="22"> Visual Workspace

An interactive workspace designed for building and navigating complex visual graphs.

</td>
</tr>

<tr>
<td width="50%" valign="top">

### <img src="https://img.icons8.com/fluency/28/module.png" width="22"> Modular Architecture

Components, services, state, validation and generation logic are separated into dedicated modules.

</td>
<td width="50%" valign="top">

### <img src="https://img.icons8.com/fluency/28/code.png" width="22"> TypeScript

Strong typing across the application provides a more maintainable and predictable codebase.

</td>
</tr>

<tr>
<td width="50%" valign="top">

### <img src="https://img.icons8.com/fluency/28/server.png" width="22"> Server Integration

Express provides the server-side layer required by the application.

</td>
<td width="50%" valign="top">

### <img src="https://img.icons8.com/fluency/28/maintenance.png" width="22"> Extensible

The architecture is designed to support additional node types, services and generation features.

</td>
</tr>
</table>

---

<div align="center">

## Architecture

<img src="https://raw.githubusercontent.com/k7codes/NodeForge/main/assets/architecture.png" width="850" alt="NodeForge Architecture">

</div>

```text
                         NodeForge
                            │
              ┌─────────────┴─────────────┐
              │                           │
         Visual Layer                Application
              │                           │
       ┌──────┴──────┐             ┌──────┴──────┐
       │             │             │             │
    Components     Nodes        Services       State
       │             │             │             │
       └─────────────┴─────────────┴─────────────┘
                            │
                       Validation
                            │
                       Generation
                            │
                         Server
```

---

<div align="center">

## Technology Stack

<br>

<img src="https://skillicons.dev/icons?i=react,typescript,vite,tailwind,express&theme=dark" alt="Technology Stack">

<br><br>

<table>
<tr>
<td align="center"><b>React</b><br>Frontend</td>
<td align="center"><b>TypeScript</b><br>Application Logic</td>
<td align="center"><b>Vite</b><br>Build Tool</td>
<td align="center"><b>Tailwind CSS</b><br>Styling</td>
<td align="center"><b>Express</b><br>Server</td>
</tr>
</table>

</div>

---

<div align="center">

## Project Structure

</div>

```text
NodeForge/
│
├── src/
│   ├── bilesenler/       # UI components
│   ├── dogrulama/        # Validation
│   ├── durum/            # Application state
│   ├── servisler/        # Services
│   ├── tanimlar/         # Definitions
│   ├── tipler/           # TypeScript types
│   └── uretici/          # Generation logic
│
├── server.ts             # Express server
├── index.html            # Application entry
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project configuration
```

---

<div align="center">

## Installation

</div>

### Requirements

* Node.js
* npm

### Clone the Repository

```bash
git clone https://github.com/k7codes/NodeForge.git
cd NodeForge
```

### Install Dependencies

```bash
npm install
```

### Start Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Start Production

```bash
npm start
```

---

<div align="center">

## Development

NodeForge is structured to make experimentation and feature development straightforward.

New functionality can be introduced through the existing component, service, type, validation and generator layers without requiring the entire application architecture to be rewritten.

</div>

---

<div align="center">

## Roadmap

</div>

* [ ] Expanded node library
* [ ] Custom node creation
* [ ] Project save and load
* [ ] Import and export
* [ ] Advanced graph validation
* [ ] Execution debugger
* [ ] Improved code generation
* [ ] Node templates
* [ ] Plugin architecture
* [ ] Project management system

---

<div align="center">

## Contributing

Contributions, ideas and improvements are welcome.

</div>

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
<img src="https://github.com/k7codes.png" width="110" alt="K7~">
</a>

### K7~

<a href="https://github.com/k7codes">
<img src="https://img.shields.io/badge/GitHub-k7codes-181717?style=for-the-badge&logo=github" alt="GitHub">
</a>

<br><br>

<img src="https://skillicons.dev/icons?i=github&theme=dark" width="35">

<br>

**NodeForge**

`Build logic visually.`

</div>
