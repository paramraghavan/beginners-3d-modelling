# 🪵 3D Wood Studio - User Help & Instruction Manual

Welcome to the **3D Wood Studio & Interactive Modeler**. This application combines full woodworking cut-list
specifications with an interactive 3D modeling canvas, structural integrity checks, and step-by-step guided build
workflows.

---

## 🛠️ Interface Overview

The studio is organized into two main tabs located on the top navigation bar:

* **Tab 1: 📋 Project Guides & Cut Lists:** View complete project documentation, material cut lists, hardware
  requirements, and structural rules.
* **Tab 2: 🧊 Interactive 3D Modeler:** The primary 3D modeling workspace featuring an interactive viewport, sidebar
  controls, gizmo manipulators, and step-by-step wizards.

---

## 📋 Tab 1: Browsing Project Guides & Cut Lists

1. Click **Tab 1: 📋 Project Guides & Cut Lists** on the top navigation bar.
2. Review the **Cut List & Dimensions Spec Sheet** for precise Length ($L$), Height ($H$), and Breadth ($B$) values.
3. Read through the **Woodworking Structural Rules** to understand weight distribution, shelf spans, and wall cleat
   mechanics.
4. **Quick Launch:** Click the **🚀 Build This Project in 3D Modeler** button at the bottom of the blueprint card to
   automatically switch to Tab 2 and start building the model step-by-step.

---

## 🧊 Tab 2: Using the Interactive 3D Modeler

### 1. Viewport Navigation (3D Controls)

* **Orbit / Rotate View:** Click and drag with the **Left Mouse Button** anywhere on the 3D canvas.
* **Pan View:** Click and drag with the **Right Mouse Button** (or `Shift` + Left Click).
* **Zoom In / Out:** Scroll the **Mouse Wheel**.
* **Select Part:** **Left Click** on any wood panel or asset in the 3D scene. A 3D translation gizmo will attach to the
  selected part.

---

### 2. Guided Workflows

Located at the top of the sidebar under **Guided Workflows**:

#### 🔵 Mode 1: Step-by-Step Update Preset Model

Use this mode to practice adjusting and repairing prebuilt models (like lab benches or cabinets):

1. Click **Mode 1: Step-by-Step Update Preset Model**.
2. The scene will load the **Chemistry Lab Preset** (with intentionally unaligned/floating glassware).
3. Click **Identify & Snap Floating Assets** in the sidebar (or click **Next Step** in the top wizard banner) to
   automatically snap the equipment flush to the table top.
4. Click any part of the bench to alter its $L$, $B$, or $H$ dimensions using the sidebar inputs.

#### 🟢 Mode 2: Step-by-Step Build 89" Shelf

Use this mode to build the custom 89" Tabletop Shelf unit from scratch across 6 guided steps:

1. Click **Mode 2: Step-by-Step Build 89" Shelf**.
2. Click **Next Step** on the top wizard banner to advance through each build phase:
    * **Step 1:** Outer standing side panels ($23''\text{ B} \times 38''\text{ H}$).
    * **Step 2:** Top and bottom plates ($89''\text{ L} \times 23''\text{ B}$).
    * **Step 3:** Inner vertical dividers (creating $23''$ left and right bays).
    * **Step 4:** Inserting bay shelves ($13''$, $9''$, and $16''$ clearance heights).
    * **Step 5:** Rear structural support bar ($89''\text{ L} \times 4''\text{ H}$).
    * **Step 6:** Final build review and structural evaluation.

---

### 3. Customizing & Resizing Parts ($L \times B \times H$)

1. **Left Click** any part in the 3D scene to select it.
2. In the sidebar section labeled **Selected Part Resize (L / B / H)**:
    * Click **`-`** or **`+`** buttons to adjust **Length ($L$)**, **Breadth ($B$)**, or **Height ($H$)** in $1''$
      increments.
    * Alternatively, type exact decimal values directly into the input fields.
3. The 3D geometry updates instantly in the viewport while retaining scene alignment.

---

### 4. Precision XYZ Positioning & Floating Asset Repair

1. **Gizmo Dragging:** Click and drag the red ($X$), green ($Y$), or blue ($Z$) arrows on the selected object to move it
   smoothly along that axis.
2. **Direct Coordinates:** Type exact numeric coordinates into **Pos X**, **Pos Y**, or **Pos Z** in the sidebar.
3. **Drop Selected Part Flush:** Click **Drop Selected Part Flush** to automatically place the selected part directly
   onto the floor grid.
4. **Identify & Snap Floating Assets:** Click this button at any time to scan all objects in the scene and automatically
   snap floating or sunken assets flush to their supporting surfaces.

---

### 5. Structural Integrity Advisor

The studio continuously runs structural integrity algorithms on your 3D design:

* **Center Stiffeners Warning:** Displays when any horizontal shelf span exceeds $32''$ without vertical bracing to
  prevent center sagging under load.
* **Base Skids Warning:** Displays when a base structure exceeds $80''$ in total width, advising you to install kick
  plates or skid feet to distribute floor weight evenly.
* **Wall Cleats Warning:** Displays when tall or wall-mounted upper units carry significant overhang weight, advising
  anchor cleats or rear cross-bracing.

---

### 6. Managing Presets & Canvas Actions

Located in the bottom section of the sidebar:

* **Load Chemistry Lab Preset:** Appends a prebuilt laboratory bench with glassware to the scene.
* **Add Custom Timber Board:** Spawns a standard generic timber board ($20'' \times 1'' \times 10''$) onto the canvas.
* **Clear Workspace:** Clears all 3D objects and resets the scene.

---

## ⚡ Quick Reference Card

| Action                 | Control / Method                                 |
|:-----------------------|:-------------------------------------------------|
| **Select Part**        | Left Click on object in 3D viewport              |
| **Rotate 3D View**     | Left Click + Drag on empty background            |
| **Pan Camera**         | Right Click + Drag                               |
| **Zoom Camera**        | Mouse Wheel Scroll                               |
| **Quick Scale Part**   | Click `-` / `+` step buttons on $L$, $B$, or $H$ |
| **Snap Part to Floor** | Click `Drop Selected Part Flush`                 |
| **Fix Floating Items** | Click `Identify & Snap Floating Assets`          |