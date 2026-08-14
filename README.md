# Beginners 3D Modelling for Wood Projects

This repo helps beginners create simple browser-based 3D models for wood projects such as shelves, bookcases, workbenches, shoe racks, tables, and chairs.

It uses **Three.js**, a standard JavaScript library for 3D graphics in the browser. You do not need a CAD program to start.

## What Is In This Repo

| File | Purpose |
|---|---|
| `drag_drop_wood_modeler.html` | Best starting point. A browser-based 3D wood modeler with furniture presets, stock lumber, selected-part editing, cut lists, and standalone HTML export. |
| `drag_drop_wood_modeler_user_guide.md` | Beginner handbook for using the modeler, including one from-scratch example and one garden park bench preset example. |
| `floor_shelf_woodshop3d_example.html` | A simpler example that loads the Shelf A model directly. |
| `woodshop3d.js` | Reusable helper library for creating boards, scenes, lights, controls, and draggable parts. |
| `beginner_3d_modeling_wood_projects.md` | Beginner guide explaining how to model shelves, tables, and chairs with board dimensions. |

## Quick Start

1. Open a terminal.
2. Go to this repo:

```bash
cd /Users/paramraghavan/dev/beginners-3d-modelling
```

3. Start a local web server:

```bash
python3 -m http.server 8766
```

4. Open this URL in a browser:

```text
http://127.0.0.1:8766/drag_drop_wood_modeler.html
```

5. Try the modeler:

- Choose a preset such as `Chemistry Lab floor shelf`, `Farmhouse Dining Table`, `Workbench`, `Bookshelf`, or `Garden Park Bench`.
- Click `Spawn Selected Assembly/Stock`.
- Click any 3D wood part to select it.
- Hover over a part to see its description, dimensions, material, board footage, and support advice.
- Use `Move (W)` or `Rotate (E)` to position the selected part.
- Type exact Width, Height, and Depth values, then click `Apply New Size`.
- Click `Duplicate Selected Part` or `Delete Selected Part` when needed.
- Click `Lock / Flush Attach Face` to snap the selected part flush to another surface.
- Click `Generate Parts / Cut List` to calculate part quantities and board footage.
- Click `Export Interactive 3D Model` to download the current design as a standalone HTML file.
- Scroll to zoom.
- Drag empty space to rotate the camera.
- Read `drag_drop_wood_modeler_user_guide.md` for a complete beginner walkthrough.

## Beginner Workflow

1. Start with `drag_drop_wood_modeler.html`.
2. Load a preset.
3. Study how the pieces fit together.
4. Add a custom board using width, height, and depth.
5. Move parts around to understand spacing.
6. Read `beginner_3d_modeling_wood_projects.md`.
7. When ready, edit the JavaScript part lists in the HTML file.

## Included Presets

| Preset | What It Shows |
|---|---|
| `Chemistry Lab floor shelf` | Wide floor shelf with plywood panels, dividers, shelves, cleats, back panel, stiffener lip, and base skids. |
| `Farmhouse Dining Table` | Tabletop, four legs, front/back aprons, and side aprons. |
| `Adirondack Chair` | Seat slats, fan backrest slats, arm rests, front legs, and ground runners. |
| `Standard Dining Chair` | Seat pan, legs, rear posts, and back rail. |
| `Heavy Duty Workbench` | Worktop, four legs, and lower shelf. |
| `5-Tier Storage Bookshelf` | Side panels, base deck, shelves, and top panel. |
| `Kitchen Base Cabinet` | Cabinet sides, base deck, and face frame stretcher. |
| `Garden Park Bench` | Seat slats, backrest slats, and leg blocks. |
| `Bedside Nightstand` | Top, lower shelf, and corner post legs. |

## Editing Parts

1. Add or load a model.
2. Select a part by clicking it in the 3D view.
3. Change `Width`, `Height`, or `Depth`.
4. Click `Apply New Size`.
5. Click `Move (W)` to reposition the part with the colored arrows.
6. Click `Rotate (E)` to turn the part with the colored rings.
7. Click `Duplicate Selected Part` to copy the selected part.
8. Click `Delete Selected Part` to remove the selected part.

The export button downloads a timestamped `scout_wood_model_*.html` file. The exported file still loads Three.js from the internet.

## Aligning and Locking Parts

Use this workflow when parts are hard to line up:

1. Select the part you want to align.
2. Click `Move (W)`.
3. Drag the colored arrow for the direction you want.
4. Use the dimension boxes to keep the board size exact.
5. Click `Lock / Flush Attach Face`.
6. Click the surface of the target board where the selected part should attach.
7. Use `Undo` if the snap is not the face you wanted.

## Snapping Braces Between Legs

For table aprons, lower stretchers, and support braces:

1. Load `Farmhouse Dining Table` or `Heavy Duty Workbench`.
2. Select an apron, brace, or 2x4 board.
3. Resize it to the span you need between the legs.
4. Click `Move (W)` and place it between opposite legs.
5. Click `Lock / Flush Attach Face` and snap it to a leg face if needed.
6. Add a second matching brace by clicking `Duplicate Selected Part`.

This is useful when moving a top apron down to become a lower stretcher between table legs.

## Support Warnings

The modeler warns you when a selected part may need extra support:

- `Cleats`: use under shelves or panels so the board has a ledge to sit on.
- `Stiffener bar/lip`: use on long, thin shelf spans to reduce sagging.
- `Base skids`: use under bottom panels when the project sits on the floor or may touch damp surfaces.

These warnings are design reminders. Final support choices still depend on the real load, wood quality, fasteners, and where the project will be used.

## Important 3D Modeling Idea

All measurements are in inches.

Boards are written like this:

```js
{
  id: "TOP",
  name: "Tabletop",
  size: [48, 1.5, 24],
  position: [0, 30.75, 0],
  materialKey: "plywood"
}
```

Use this meaning:

| Field | Meaning |
|---|---|
| `size[0]` | Width, left to right |
| `size[1]` | Height or thickness, bottom to top |
| `size[2]` | Depth, front to back |
| `position[0]` | X position |
| `position[1]` | Y position |
| `position[2]` | Z position |

Three.js places each board by its **center point**, not by the bottom corner. For example, a 0.75 inch thick board sitting on the floor should have `position[1] = 0.375`.

## First Safe Edits To Try

Change the size of a custom board:

```js
size: [30, 0.75, 12]
```

Move a board higher:

```js
position: [0, 18, 0]
```

Change material color style:

```js
materialKey: "pine"
```

Available material keys:

- `plywood`
- `pine`
- `skid`
- `painted`

## Common Wood Sizes

| Real Wood | Actual 3D Size To Use |
|---|---|
| 3/4 in plywood | `0.75` thick |
| 1/2 in plywood | `0.5` thick |
| 1x2 board | `0.75 x 1.5` |
| 1x4 board | `0.75 x 3.5` |
| 2x4 board | `1.5 x 3.5` |

## Troubleshooting

If the page is blank:

- Make sure the local server is running.
- Make sure the browser URL starts with `http://127.0.0.1:8766/`.
- Make sure `woodshop3d.js` is in the same folder as the HTML files.
- Make sure you are connected to the internet, because Three.js is loaded from a CDN.

If dragging does not work:

- Drag from the left-side part palette onto the grid.
- Then drag the 3D board itself to move it.
- If the camera rotates instead, click directly on the board face and drag again.

If the model looks wrong:

- Check board thickness.
- Check center-point position.
- Confirm the part dimensions match the cut list.

## Recommended Starting File

Start here:

```text
drag_drop_wood_modeler.html
```

Then read:

```text
beginner_3d_modeling_wood_projects.md
```
