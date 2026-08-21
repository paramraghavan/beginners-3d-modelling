# Beginner Wood Project Modeler Guide

Use this guide with:

```text
/Users/paramraghavan/dev/beginners-3d-modelling/drag_drop_wood_modeler.html
```

The tool now has two simple workflows:

1. Choose an existing model and change each part's Length, Breadth, and Height.
2. Start from scratch by drawing the front 2D view and side 2D view. The 3D preview updates as you draw.

For most scout projects, start with an existing model. It is easier because the parts are already named, placed, and included in the cut list.

## Open The Tool

```bash
cd /Users/paramraghavan/dev/beginners-3d-modelling
python3 -m http.server 8766
```

Then open:

```text
http://127.0.0.1:8766/drag_drop_wood_modeler.html
```

## Main Screen

The screen has three areas:

- Left panel: model library, selected part editor, part list, and cut list.
- Middle area: tabbed front and side 2D views. Only one is shown at a time so the drawing is larger.
- Right area: live 3D preview with X/Y/Z axis arrows, floor, side/back wall guides, and a ceiling/project-top guide.

## Five-Minute First Lesson

Use this before teaching drawing from scratch:

1. Load `Storage cubbies`.
2. Select `Bottom panel`.
3. Look at the 3D view. The bottom panel should sit above the skids.
4. Click `Add sag bar under front`.
5. Select the new sag bar in `Parts In Project`.
6. Review its Length, Breadth, Height, and Y bottom values.
7. Open the cut list and explain that each visible part becomes a real cut part.

This teaches the core loop: select a part, edit exact values, add support, and check the cut list.

## 3D Grounding Cues

The 3D preview has reference guides so the project does not float in space:

- Red `X` arrow: length, left to right.
- Green `Y` arrow: height, floor to ceiling.
- Blue `Z` arrow: breadth/depth, front to back.
- Tan floor plane: what touches the ground.
- Faint side/back walls: help you see how close the project is to a wall.
- Yellow top guide: helps you judge total height or ceiling clearance.

If a part touches the tan floor plane, it is sitting on the ground. If it rises near the yellow top guide, check the final project height.

All measurements are in inches.

## Length, Breadth, Height

Use this meaning:

| Field | Meaning |
|---|---|
| Length | Left-to-right size in the front view |
| Breadth | Front-to-back size in the side view |
| Height | Bottom-to-top size |

The position fields are:

| Field | Meaning |
|---|---|
| X left | Where the part starts from the left |
| Z back | Where the part starts from the back/front depth direction |
| Y bottom | How high the bottom of the part sits |

## Workflow 1: Edit An Existing Model

1. Choose a model from `Model library`.
2. Click `Load model`.
3. Click a part in `Parts In Project`, in the front/side 2D view, or in the 3D preview.
4. Change `Length`, `Breadth`, or `Height`.
5. Click `Apply dimensions`.
6. Review the 2D views and 3D preview.
7. If the selected part is plywood, use `Add cleats under`, `Add sag bar under front`, or `Add base skids under`.
8. Use `Duplicate` when you need a matching part.
9. Use `Delete` to remove a part.
10. Review the cut list at the bottom of the left panel.
11. Click `Export 3D HTML` when ready.

## Model Library

The current preset library includes:

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

## Example 1: Customize An Existing Model

Goal: start with `Storage cubbies`, make it wider, add one more middle support, and confirm the base skids stay under the project.

1. In `Model library`, choose `Storage cubbies`.
2. Click `Load model`.
3. Look at the 3D preview:
   - The tan plane is the floor.
   - The brown skids should touch the floor.
   - The bottom plywood panel should sit above the skids.
4. Select `Top panel` from `Parts In Project`.
5. Change:

```text
Length: 60
Breadth: 15
Height: 0.75
X left: 0
Z back: 0
Y bottom: 35.25
```

6. Click `Apply dimensions`.
7. Select `Bottom panel`.
8. Change:

```text
Length: 60
Breadth: 15
Height: 0.75
X left: 0
Z back: 0
Y bottom: 1.5
```

9. Click `Apply dimensions`.
10. Select `Right side`.
11. Move it to the new right edge:

```text
X left: 59.25
Y bottom: 2.25
```

12. Click `Apply dimensions`.
13. Select `Middle horizontal shelf`.
14. Change `Length` to `60`.
15. Click `Apply dimensions`.
16. Select `Center vertical divider`.
17. Click `Duplicate`.
18. Rename the copy to `Second vertical divider`.
19. Move the new divider to:

```text
X left: 40
Y bottom: 2.25
```

20. Click `Apply dimensions`.
21. Select `Back panel`.
22. Change `Length` to `60`.
23. Click `Apply dimensions`.
24. Select `Base skid right`.
25. Move it near the new right edge:

```text
X left: 54.5
Y bottom: 0
```

26. Click `Apply dimensions`.
27. Select `Bottom panel`.
28. Click `Add sag bar under front` if the widened bottom panel needs extra front support.
29. Review the cut list. It should include the wider panels and the duplicated divider.
30. Click `Export 3D HTML`.

What to check:

- Only skids should touch the floor in this preset.
- Bottom plywood should sit at `Y bottom: 1.5`.
- Side panels and dividers should start at `Y bottom: 2.25`.
- In front view, Length runs left-to-right.
- In side view, Breadth runs front-to-back.

## Quick Example: Make The Garden Bench Longer

1. Select `Garden park bench`.
2. Click `Load model`.
3. Select each seat slat and back slat.
4. Change `Length` from `48` to `60`.
5. Click `Apply dimensions` after each part.
6. Select `Under-seat stretcher`.
7. Change its `Length` so it still fits between the legs, such as `54`.
8. Click `Apply dimensions`.
9. Check the 3D view. Long slats may need extra stretchers or braces.

## One-Click Supports Under Plywood

Select a plywood shelf, top, bottom, deck, or panel. The selected part editor shows three support buttons:

- `Add cleats under`: adds two 1x2-style cleats under the left and right plywood edges.
- `Add sag bar under front`: adds a front lip/stiffener. On shelves it sits below the plywood; on bottom panels with skids it stays above the floor so skids remain the floor-contact parts.
- `Add base skids under`: adds three base skids under a bottom panel and lifts the plywood if needed.

These buttons are disabled when the selected part is not a plywood panel. That keeps scouts from accidentally adding shelf supports under a leg or brace.

## Skids And Floor Contact

In presets that include skids, the skids are the only pieces meant to touch the tan floor plane.

Use this stack:

1. Base skids at the floor.
2. Bottom plywood panel above the skids.
3. Side panels, dividers, and back panels above the bottom plywood.

For example, in `Storage cubbies`, the base skids sit at `Y = 0`, the bottom panel sits above them, and the cubby walls sit on the bottom panel. This keeps the skids under the project instead of inside it.

## Workflow 2: Draw A New Project From Scratch

Use this workflow after the user understands presets. Drawing is useful for unusual projects, but it requires more measurement decisions.

1. Click `Start blank`.
2. Click `Draw board`.
3. Click the `Front view` tab.
4. Drag a rectangle. This creates a thin plywood-like part using Length and Height.
5. Use the scrollbars if the drawing is larger than the visible area.
6. The new part appears in the selected part editor.
7. Set the exact `Length`, `Breadth`, and `Height`. Breadth is the 3D depth, so increase it only when the part should extend front-to-back.
8. Use `X left`, `Z back`, and `Y bottom` to place it exactly.
9. Draw more rectangles for shelves, sides, legs, braces, or top panels.
10. Click the `Side view` tab when you want to draw or check Breadth and Height.
11. Watch the 3D preview on the right. It joins the front and side information into a 3D model.

## Example 2: Build A Simple Tabletop Shelf From Scratch

1. Click `Start blank`.
2. Click `Draw board`.
3. Click `Front view`.
4. Draw a long bottom rectangle.
5. Set it to:

```text
Length: 36
Breadth: 12
Height: 0.75
X left: 0
Z back: 0
Y bottom: 0
```

The rectangle may first appear thin in 3D. That is expected. Set `Breadth` to `12` to give the shelf its real depth.

6. Click `Duplicate`.
7. Rename the duplicate to `Top panel`.
8. Set the duplicate to:

```text
Length: 36
Breadth: 12
Height: 0.75
X left: 0
Z back: 0
Y bottom: 12
```

9. Click `Apply dimensions`.
10. Select the bottom panel.
11. Click `Duplicate`.
12. Rename the copy to `Left side panel`.
13. Set it to:

```text
Length: 0.75
Breadth: 12
Height: 12
X left: 0
Z back: 0
Y bottom: 0.75
```

14. Click `Apply dimensions`.
15. Click `Duplicate`.
16. Rename the copy to `Right side panel`.
17. Change only:

```text
X left: 35.25
```

18. Click `Apply dimensions`.
19. Add a middle divider if needed:

```text
Name: Center divider
Length: 0.75
Breadth: 12
Height: 12
X left: 18
Z back: 0
Y bottom: 0.75
```

20. Click `Side view` to check the Breadth and Height of the shelf.
21. Select the bottom or top plywood and click `Add cleats under` or `Add sag bar under front`.
22. Select the bottom panel and click `Add base skids under` if the shelf sits on the floor.
23. Check the cut list.
24. Export the 3D HTML model.

What to check:

- The bottom panel is horizontal.
- The left and right side panels stand on the bottom panel.
- Breadth is `12`, so the shelf has real depth in 3D.
- Cleats and sag bars appear under plywood, not floating above it.

## Support Advice

The tool warns about common beginner design issues:

- Long thin span: click `Add sag bar under front`.
- Tall support: connect opposite legs with aprons or stretchers.
- Floor contact: click `Add base skids under`.

These are reminders, not final engineering approval. A scout should review the plan with an adult woodworker before cutting lumber.
