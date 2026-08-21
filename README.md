# Beginners 3D Modelling For Wood Projects

This repo helps beginners create simple browser-based 3D models for wood projects such as shelves, benches, tables, bookcases, and workbenches.

The main tool is intentionally simple:

- Choose an existing model and change part dimensions.
- Select plywood and add cleats, sag bars, or skids with one click.
- Or start blank, draw a front 2D view and side 2D view, and let the tool create the 3D preview.

## Files

| File | Purpose |
|---|---|
| `drag_drop_wood_modeler.html` | Main beginner wood project modeler. |
| `pwa/index.html` | Progressive Web App version of the modeler. Use this for installable app testing. |
| `pwa/manifest.webmanifest` | PWA install metadata, app name, colors, and icons. |
| `pwa/service-worker.js` | Offline cache for the PWA shell and guide files. |
| `drag_drop_wood_modeler_user_guide.html` | Browser-friendly user guide linked from the modeler UI. |
| `drag_drop_wood_modeler_user_guide.md` | Markdown source for the user guide. Keep this file for editing. |
| `beginner_3d_modeling_wood_projects.md` | Background guide for thinking about wood parts and dimensions. |
| `floor_shelf_woodshop3d_example.html` | Older simple floor shelf example. |
| `woodshop3d.js` | Older reusable Three.js helper library. |

## Quick Start

```bash
cd /Users/paramraghavan/dev/beginners-3d-modelling
python3 -m http.server 8766
```

Open:

```text
http://127.0.0.1:8766/drag_drop_wood_modeler.html
```

## Progressive Web App

The installable version lives under:

```text
/Users/paramraghavan/dev/beginners-3d-modelling/pwa
```

Run the same local server:

```bash
cd /Users/paramraghavan/dev/beginners-3d-modelling
python3 -m http.server 8766
```

Open:

```text
http://127.0.0.1:8766/pwa/
```

In Chrome or Edge, use the install icon in the address bar or the browser menu to install it as an app. The PWA caches the local app shell, manifest, icons, and user guide. The 3D library is still loaded from the CDN, so open the app once while online before relying on it offline.

The tool also has an `Open User Guide` link in the left panel. It opens:

```text
drag_drop_wood_modeler_user_guide.html
```

The editable Markdown source remains:

```text
drag_drop_wood_modeler_user_guide.md
```

## What The Main Tool Shows

The screen has three areas:

- Left: model library, selected part editor, part list, cut list, and export.
- Middle: tabbed 2D drawing area. Use `Front view` for Length x Height and `Side view` for Breadth x Height. Each view has scrollbars for large projects.
- Right: live 3D preview with X/Y/Z axis arrows, a ground plane, faint side/back walls, and a ceiling/project-top guide.

## Recommended First Try

Use this short path before drawing anything from scratch:

1. Load `Storage cubbies`.
2. Select `Bottom panel`.
3. Confirm it sits above the base skids in the 3D view.
4. Click `Add sag bar under front`.
5. Review the cut list.
6. Open the user guide for the full customization example.

This teaches the main idea of the app: select a part, edit exact dimensions, then add common supports with one click.

## 3D Grounding Cues

Use the 3D reference guides to understand where the project sits:

- Red `X`: left/right length.
- Green `Y`: height from the floor.
- Blue `Z`: front/back breadth or depth.
- Tan plane: floor/ground at `Y = 0`.
- Faint blue planes: side wall and back wall references.
- Yellow rectangle above the model: ceiling or project-top guide.

## Existing Model Workflow

1. Choose a model from `Model library`.
2. Click `Load model`.
3. Select a part from the part list, the 2D view, or the 3D preview.
4. Edit `Length`, `Breadth`, and `Height`.
5. Click `Apply dimensions`.
6. If the selected part is plywood, click `Add cleats under`, `Add sag bar under front`, or `Add base skids under`.
7. Use `Duplicate` or `Delete` if needed.
8. Review the cut list.
9. Click `Export 3D HTML`.

This is the best workflow for most users. Drawing from scratch is available, but presets are easier for scouts because the major parts are already named and positioned.

## Draw From Scratch Workflow

1. Click `Start blank`.
2. Click `Draw board`.
3. Click the `Front view` tab and drag a rectangle to set Length and Height.
4. Click the `Side view` tab when you need to work with Breadth and Height.
5. Use the selected part editor to assign exact Length, Breadth, Height, and position.
6. Select plywood parts and add cleats, sag bars, or skids with one click.
7. Watch the 3D preview update automatically.
8. Export the final model.

## Dimensions

All measurements are in inches.

| Field | Meaning |
|---|---|
| Length | Left-to-right size in front view |
| Breadth | Front-to-back size in side view |
| Height | Bottom-to-top size |
| X left | Left position of the part |
| Z back | Depth position of the part |
| Y bottom | Bottom height of the part |

## Included Models

- Tabletop shelf with open center
- Garden park bench
- Simple table
- Workbench
- Bookcase
- Shoe rack
- Storage cubbies
- Raised planter box
- Picnic table
- Step stool
- Birdhouse
- Tool caddy
- Toy chest / blanket box

## Support Warnings

The selected part editor gives simple reminders:

- Plywood panel: use the one-click support buttons.
- Long thin span: click `Add sag bar under front`.
- Tall support: connect opposite legs with aprons or stretchers.
- Floor contact: click `Add base skids under`.

These are reminders only. Review the final plan with an adult woodworker before cutting lumber.

## Skid Placement Rule

For presets with base skids, the vertical layout is:

1. Skids touch the floor at `Y = 0`.
2. Bottom plywood sits on top of the skids.
3. Side panels, dividers, and back panels sit on top of the bottom plywood.

If a skid appears inside a shelf or cubby, check that the bottom plywood is above the skid height.
