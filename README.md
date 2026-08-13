# Beginners 3D Modelling for Wood Projects

This repo helps beginners create simple browser-based 3D models for wood projects such as shelves, bookcases, workbenches, shoe racks, tables, and chairs.

It uses **Three.js**, a standard JavaScript library for 3D graphics in the browser. You do not need a CAD program to start.

## What Is In This Repo

| File | Purpose |
|---|---|
| `drag_drop_wood_modeler.html` | Best starting point. A drag-and-drop 3D wood modeler with shelf, tabletop shelf, bookcase, workbench, shoe rack, cubby, table, and chair presets. |
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

- Click `Shelf A` to load the shelf design.
- Click `Tabletop Shelf` to load the on-table book shelf design.
- Click `Bookcase`, `Workbench`, `Shoe Rack`, or `Storage Cubbies` for more common starter projects.
- Click `Simple Table` to load a table.
- Click `Simple Chair` to load a chair.
- Drag parts from the left panel onto the grid.
- Click a 3D part or a row in `Parts in Model` to select it.
- Hover over a 3D part to see its ID, description, dimensions, material, and purpose.
- Watch the `Support check` warning on selected parts. It tells you when a part likely needs cleats, a stiffener bar, or base skids.
- Drag a selected 3D part to move it around.
- Use `Selected Part` to resize, rotate, duplicate, or delete a part.
- Use the small `D`, `L`, and `X` buttons in the part list to duplicate, lock/unlock, or remove a part quickly.
- Use `Alignment` to snap parts to a grid while moving them.
- Turn on `Auto lock after move` when you want pieces to lock as soon as you place them.
- Type exact `X position`, `Y position`, and `Z position` values when dragging is not precise enough.
- Click `Lock Part` after a part is aligned so it cannot be moved accidentally.
- Click `Export Current Model HTML` to download your current model as an HTML file.
- Scroll to zoom.
- Drag empty space to rotate the camera.

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
| `Shelf A` | Floor shelf with plywood body, divider, shelves, cleats, back panel, and base skids. |
| `Tabletop Shelf` | 89 in wide shelf that sits on top of a table, with left and right ladder-style book stacks and an open middle bay. |
| `Bookcase` | Tall bookcase with shelves, shelf cleats, shelf stiffener lips, back panel, and base skids. |
| `Workbench` | Workbench with top, 2x4 legs, aprons, lower shelf, cleats, and top stiffeners. |
| `Shoe Rack` | Low shoe rack with shelves, cleats, front stiffeners, and base skids. |
| `Storage Cubbies` | Two-by-two cubby unit with back panel, base skids, and shelf stiffeners. |
| `Simple Table` | Tabletop, legs, aprons, side braces, and top stiffeners. |
| `Simple Chair` | Seat, legs, back posts, back rest, and lower stretchers. |

The `Tabletop Shelf` sample is based on the sketch dimensions: 89 in overall width, 23 in depth, about 38 in height, left and right stack bays, open center, and a rear brace tying the ladder frames together.

## Editing Parts

1. Add or load a model.
2. Select a part by clicking it in the 3D view or in `Parts in Model`.
3. Change `Width`, `Height`, or `Depth`.
4. Click `Apply Size`.
5. Click `Rotate 90` to rotate the part left/right on the floor.
6. Click `Stand/Flip 90` to rotate the part upright or flat.
7. Click `Duplicate` to copy the selected part.
8. Click `Delete Part` to remove the selected part.

The export button downloads `wood_model_export.html`. If you run the modeler from the local server, the export embeds the helper code directly. The exported file still loads Three.js from the internet.

## Aligning and Locking Parts

Use this workflow when the wood is hard to line up by dragging:

1. Turn on `Snap to grid`.
2. Set `Grid step` to a useful woodworking value, such as `0.75`, `1`, or `4`.
3. Turn on `Auto lock after move` if you want each dragged part to lock as soon as it is placed.
4. Select the part you want to align.
5. Type exact `X position`, `Y position`, and `Z position` values.
6. Click `Apply Position`.
7. Click `Snap Selected` if you dragged the part and want it cleaned up to the nearest grid point.
8. Click `Lock Part` when the piece is in the right place.

Locked parts stay visible but cannot be dragged. Click `Unlock Part` if you need to move the piece again.

## Snapping Braces Between Legs

For table aprons, lower stretchers, and support braces:

1. Load `Simple Table` or `Workbench`.
2. Select the apron or brace, for example `A1`.
3. Click `Lower Brace Height` to move it down to a typical lower support height.
4. Click `Fit Between Legs` to resize and center it between the nearest opposite legs.
5. Click `Lock Part` when it is in the right place.

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
