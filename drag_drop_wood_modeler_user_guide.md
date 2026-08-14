# Drag Drop Wood Modeler User Guide

This guide is for beginners building simple wood projects in the 3D Scout Wood Modeler.

Open the tool:

```bash
cd /Users/paramraghavan/dev/beginners-3d-modelling
python3 -m http.server 8766
```

Then open:

```text
http://localhost:8766/drag_drop_wood_modeler.html
```

You can also open the HTML file directly, but a local server is more reliable because the tool loads Three.js from the browser.

## What The Tool Does

Use the tool to make a rough 3D wood model before cutting lumber.

You can:

- Choose a preset model such as a floor shelf, table, workbench, bookshelf, or garden park bench.
- Add stock lumber such as 2x4, 2x6, 4x4 posts, cleats, trim, and plywood sheets.
- Click one board at a time and move, rotate, resize, duplicate, snap, or delete it.
- Hover over a part to see its name, dimensions, board feet, material, and build advice.
- Generate a cut list for the current model.
- Export the model as a standalone interactive HTML file.

## Basic Controls

- Rotate view: left-click and drag.
- Zoom: mouse wheel or trackpad pinch.
- Pan view: right-click and drag.
- Select part: click a board in the 3D model.
- Move selected part: click `Move (W)`, then drag the colored arrows.
- Rotate selected part: click `Rotate (E)`, then drag the colored rings.
- Resize selected part: enter Width, Height, and Depth in inches, then click `Apply New Size`.
- Duplicate selected part: click `Duplicate Selected Part`.
- Delete selected part: click `Delete Selected Part`.
- Attach flush to another board: select a part, click `Lock / Flush Attach Face`, then click the target surface.
- Make repeated copies: select a part, click `Duplicate Along Path Points`, click two or more points, then click `Finish Path & Duplicate`.
- Undo: click `Undo` or press `Cmd+Z` / `Ctrl+Z`.
- Redo: click `Redo` or press `Shift+Cmd+Z` / `Ctrl+Y`.

## Beginner Rule For Dimensions

The dimension boxes use this order:

```text
Width x Height x Depth
```

For most boards:

- Width is side-to-side.
- Height is thickness or vertical height.
- Depth is front-to-back length.

Example: a 2x4 that is 48 inches long is usually:

```text
1.5 W x 3.5 H x 48 D
```

## Build Advice Warnings

The tool gives warnings for common wood structure problems:

- Long shelf or tabletop span: add cleats, apron rails, or a front stiffener.
- Tall legs or posts: brace opposite legs with aprons or stretchers.
- Low floor-contact base: add skids or feet.
- Tall vertical panel: add a back panel or rear bracing to reduce side-to-side racking.

These warnings are design reminders. Scouts should still review the final plan with an adult woodworker before cutting.

## Example 1: Build A Simple Tabletop Book Shelf From Scratch

Goal: build a small open shelf that sits on top of a table.

1. Click `Clear Workspace`.
2. Confirm `Yes, Clear Sheet`.
3. Choose `3/4" Baltic Birch Plywood Sheet (4x8)` from the preset dropdown.
4. Click `Spawn Selected Assembly/Stock`.
5. Select the new plywood part.
6. Set dimensions to:

```text
Width: 36
Height: 0.75
Depth: 12
```

7. Click `Apply New Size`. This is the bottom shelf panel.
8. Click `Duplicate Selected Part`.
9. Move the copy upward and set it as the top shelf panel.
10. Add the left side panel:

```text
Width: 0.75
Height: 12
Depth: 12
```

11. Move it to the left edge.
12. Click `Duplicate Selected Part`.
13. Move the copy to the right edge.
14. Add a middle divider if needed:

```text
Width: 0.75
Height: 12
Depth: 12
```

15. Add cleats under shelves if the span is long:

```text
Width: 0.75
Height: 1.5
Depth: 10
```

16. Click `Generate Parts / Cut List`.
17. Review the dimensions and part count.
18. Click `Export Interactive 3D Model` when the design is ready to share.

## Example 2: Modify The Garden Park Bench Preset

Goal: start from a bench preset, make it longer, add support, and turn it into a custom outdoor structure.

1. Choose `Garden Park Bench (Seat & Back Slats + Leg Blocks)` from the preset dropdown.
2. Click `Spawn Selected Assembly/Stock`.
3. Click a seat slat.
4. Change the length by setting:

```text
Width: 60
Height: 1.5
Depth: 3.5
```

5. Click `Apply New Size`.
6. Repeat for the other seat slats and backrest slats.
7. Select one leg block and click `Duplicate Selected Part`.
8. Move the copy toward the middle of the bench to create a center support.
9. Select a `2x4 Board` or add one from the preset dropdown.
10. Resize it as an apron or stretcher between legs:

```text
Width: 1.5
Height: 3.5
Depth: 54
```

11. Move the stretcher between opposite legs below the seat.
12. Use `Lock / Flush Attach Face` if you want the stretcher to sit flush against a leg or support face.
13. Hover over the longer slats. If the tool warns about sag, add another support or stiffener.
14. Click `Generate Parts / Cut List`.
15. Rename your exported file after clicking `Export Interactive 3D Model`.

## Suggested Beginner Workflow

Use this order for every project:

1. Start with a preset or one stock board.
2. Resize the main boards first.
3. Add legs, dividers, cleats, skids, and stiffeners.
4. Move parts into place.
5. Use hover advice to check for missing support.
6. Generate the cut list.
7. Review the model with a leader or adult.
8. Export the final 3D model.

## Woodworking Safety Notes

- Measure twice before cutting.
- Label parts in the real world to match the cut list.
- Use clamps before fastening.
- Drill pilot holes near plywood edges.
- Wear eye protection.
- Let an adult operate saws and power tools when required.

