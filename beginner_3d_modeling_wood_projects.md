# Beginner Guide: 3D Models for Wood Tables, Shelves, and Chairs

This guide explains how to make simple 3D models for Scout woodworking projects using JavaScript and Three.js.

The goal is not professional CAD. The goal is a clear browser model that helps Scouts and leaders understand:

- what each part looks like
- how large each part is
- where each part goes
- how shelves, tables, and chairs fit together before cutting wood

## Recommended Library

Use **Three.js**.

Three.js is the best standard JavaScript library for this type of project because it works directly in a browser and is easy to share as an HTML file.

Use these scripts in your HTML:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
<script src="woodshop3d.js"></script>
```

The new helper file is:

```text
/Users/paramraghavan/dev/beginners-3d-modelling/woodshop3d.js
```

It creates the scene, camera, lights, materials, board shapes, edge lines, and simple drag behavior.

A working example file is:

```text
/Users/paramraghavan/dev/beginners-3d-modelling/floor_shelf_woodshop3d_example.html
```

## Beginner Mental Model

In woodworking, a board is usually described like this:

```text
Top panel: 92 in wide x 3/4 in thick x 23.25 in deep
```

In Three.js, a board is a box:

```text
Box size: [width, height, depth]
Position: [x, y, z]
```

Use this rule:

```text
width  = left to right
height = bottom to top
depth  = front to back
```

For this project, use inches as 3D units. A 92 inch board is `92` units wide.

## The Most Important Rule

Three.js places a box by its **center point**, not by its bottom-left corner.

Example:

```text
Board size: 92 in wide x 0.75 in high x 23.25 in deep
Board bottom should sit at y = 1.5

Center y = bottom y + height / 2
Center y = 1.5 + 0.75 / 2
Center y = 1.875
```

So the board is created like this:

```js
viewer.addBoard({
  id: "P2",
  name: "Bottom panel",
  size: [92, 0.75, 23.25],
  position: [0, 1.875, 0],
  materialKey: "plywood"
});
```

## Basic HTML Template

Create a new file such as `my_shelf_model.html`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wood Project 3D Model</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      background: #1a202c;
      font-family: Arial, sans-serif;
    }

    #viewer {
      width: 100vw;
      height: 100vh;
    }

    #label {
      position: absolute;
      top: 16px;
      left: 16px;
      color: white;
      background: rgba(0, 0, 0, 0.65);
      padding: 12px 14px;
      border-radius: 6px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div id="label">
    <strong>My Wood Project</strong><br>
    Drag to rotate. Scroll to zoom.
  </div>
  <div id="viewer"></div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
  <script src="woodshop3d.js"></script>

  <script>
    const viewer = WoodShop3D.createViewer({
      container: "#viewer",
      target: [0, 12, 0]
    });

    viewer.addBoard({
      id: "A",
      name: "Example board",
      size: [30, 0.75, 12],
      position: [0, 4, 0],
      materialKey: "plywood"
    });

    viewer.animate();
  </script>
</body>
</html>
```

## Model Shelf A Using the Helper

The helper includes a starter part list for Shelf A.

```html
<script>
  const viewer = WoodShop3D.createViewer({
    container: "#viewer",
    target: [0, 12, 0]
  });

  viewer.addBoards(WoodShop3D.shelfAParts());
  viewer.animate();
</script>
```

This creates the basic shelf body, skids, shelves, divider, back panel, cleats, and long shelf stiffener.

## Model the Tabletop Book Shelf

The helper also includes a starter model for a shelf that sits on top of a table.

This sample is based on the sketch:

- 89 in overall width
- 23 in depth
- about 38 in height
- left and right ladder-style book stack bays
- open middle bay
- rear brace tying the ladder frames together

```html
<script>
  const viewer = WoodShop3D.createViewer({
    container: "#viewer",
    target: [0, 19, 0]
  });

  viewer.addBoards(WoodShop3D.tabletopShelfParts());
  viewer.animate();
</script>
```

In the drag-and-drop modeler, click `Tabletop Shelf` to load this preset.

## Add a Custom Shelf

A simple shelf needs:

- two side panels
- one top panel
- one bottom panel
- shelves inside
- one back panel if it needs anti-racking strength

Example:

```js
const parts = [
  {
    id: "LEFT",
    name: "Left side",
    size: [0.75, 36, 12],
    position: [-18.375, 18, 0],
    materialKey: "plywood"
  },
  {
    id: "RIGHT",
    name: "Right side",
    size: [0.75, 36, 12],
    position: [18.375, 18, 0],
    materialKey: "plywood"
  },
  {
    id: "TOP",
    name: "Top",
    size: [37.5, 0.75, 12],
    position: [0, 36.375, 0],
    materialKey: "plywood"
  },
  {
    id: "BOTTOM",
    name: "Bottom",
    size: [37.5, 0.75, 12],
    position: [0, 0.375, 0],
    materialKey: "plywood"
  },
  {
    id: "SHELF1",
    name: "Middle shelf",
    size: [36, 0.75, 12],
    position: [0, 18, 0],
    materialKey: "plywood"
  }
];

viewer.addBoards(parts);
```

## Add a Simple Table

A table needs:

- tabletop
- four legs
- optional aprons under the tabletop

```js
const tableParts = [
  { id: "TOP", name: "Tabletop", size: [48, 1.5, 24], position: [0, 30.75, 0], materialKey: "plywood" },

  { id: "L1", name: "Front left leg", size: [3.5, 29.25, 3.5], position: [-20, 14.625, 10], materialKey: "skid" },
  { id: "L2", name: "Front right leg", size: [3.5, 29.25, 3.5], position: [20, 14.625, 10], materialKey: "skid" },
  { id: "L3", name: "Back left leg", size: [3.5, 29.25, 3.5], position: [-20, 14.625, -10], materialKey: "skid" },
  { id: "L4", name: "Back right leg", size: [3.5, 29.25, 3.5], position: [20, 14.625, -10], materialKey: "skid" },

  { id: "A1", name: "Front apron", size: [42, 3.5, 0.75], position: [0, 27, 11.625], materialKey: "pine" },
  { id: "A2", name: "Back apron", size: [42, 3.5, 0.75], position: [0, 27, -11.625], materialKey: "pine" }
];

viewer.addBoards(tableParts);
```

## Add a Simple Chair

A chair needs:

- seat
- four legs
- back posts
- back rest
- optional stretchers between legs

```js
const chairParts = [
  { id: "SEAT", name: "Seat", size: [18, 1.5, 18], position: [0, 18.75, 0], materialKey: "plywood" },

  { id: "FL", name: "Front left leg", size: [1.5, 18, 1.5], position: [-7.5, 9, 7.5], materialKey: "pine" },
  { id: "FR", name: "Front right leg", size: [1.5, 18, 1.5], position: [7.5, 9, 7.5], materialKey: "pine" },
  { id: "BL", name: "Back left post", size: [1.5, 36, 1.5], position: [-7.5, 18, -7.5], materialKey: "pine" },
  { id: "BR", name: "Back right post", size: [1.5, 36, 1.5], position: [7.5, 18, -7.5], materialKey: "pine" },

  { id: "BACK", name: "Back rest", size: [18, 6, 0.75], position: [0, 31, -8.25], materialKey: "plywood" }
];

viewer.addBoards(chairParts);
```

## Make Parts Draggable

For teaching or layout experiments, mark parts as draggable:

```js
viewer.addBoard({
  id: "DRAG1",
  name: "Moveable test board",
  size: [20, 0.75, 8],
  position: [0, 3, 0],
  materialKey: "plywood",
  draggable: true
});

viewer.enableSimpleDragging();
viewer.animate();
```

This lets the user drag parts around on a horizontal plane. It is useful for learning and rough layout, but final project dimensions should still come from the cut list.

## Suggested Workflow for Each Project

1. Create the cut list first.
2. Give every part an ID.
3. Convert every real board into a 3D box.
4. Use inches as units.
5. Calculate center positions.
6. Add the largest parts first.
7. Add shelves, cleats, aprons, legs, and stretchers.
8. Check the model against the real dimensions.
9. Add colors by material type.
10. Share the HTML file with Scouts before the build day.

## Common Board Thicknesses

| Real Material | 3D Height or Width to Use |
|---|---:|
| 3/4 in plywood | 0.75 |
| 1/2 in plywood | 0.5 |
| 1x2 board | 0.75 x 1.5 |
| 1x3 board | 0.75 x 2.5 |
| 1x4 board | 0.75 x 3.5 |
| 2x4 board | 1.5 x 3.5 |

Note: common lumber names are not actual finished sizes. A 2x4 is usually 1.5 in x 3.5 in.

## Beginner Checklist

- The model opens in a browser.
- The user can rotate, zoom, and pan.
- Each board uses real dimensions.
- Part IDs match the build handbook.
- The model uses different colors for different material types.
- The 3D model agrees with the cut list.
- Dragging is used only for learning or rough layout, not final measurements.
