/*
 * woodshop3d.js
 * Small beginner-friendly helper library for wood project models.
 *
 * Requires:
 * - three.min.js
 * Optional:
 * - OrbitControls.js
 *
 * Units:
 * - Use inches as Three.js units.
 * - Board size is [width, height, depth].
 * - Board position is [x, y, z] at the center of the board.
 */

(function (global) {
  function getThree() {
    if (!global.THREE) {
      throw new Error("woodshop3d.js requires Three.js to be loaded first.");
    }
    return global.THREE;
  }

  function createMaterial(color, roughness) {
    const THREE = getThree();
    return new THREE.MeshStandardMaterial({
      color: color,
      roughness: roughness == null ? 0.75 : roughness,
      metalness: 0.05
    });
  }

  function addEdgeLines(mesh, color) {
    const THREE = getThree();
    const edges = new THREE.EdgesGeometry(mesh.geometry);
    const lines = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: color || 0x5c3d2e })
    );
    mesh.add(lines);
    return lines;
  }

  function makeBoard(spec, materials) {
    const THREE = getThree();
    const size = spec.size || [1, 1, 1];
    const position = spec.position || [0, 0, 0];
    const material =
      spec.material ||
      materials[spec.materialKey || "plywood"] ||
      createMaterial(spec.color || 0xd4a373);

    const mesh = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), material);
    mesh.position.set(position[0], position[1], position[2]);
    if (spec.rotation) {
      mesh.rotation.set(spec.rotation[0] || 0, spec.rotation[1] || 0, spec.rotation[2] || 0);
    }
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.name = spec.id || spec.name || "";
    mesh.userData.part = {
      id: spec.id || "",
      name: spec.name || "",
      size: size,
      materialKey: spec.materialKey || "plywood",
      notes: spec.notes || ""
    };

    addEdgeLines(mesh, spec.edgeColor);
    return mesh;
  }

  function createViewer(options) {
    const THREE = getThree();
    const container =
      typeof options.container === "string"
        ? document.querySelector(options.container)
        : options.container;

    if (!container) {
      throw new Error("WoodShop3D.createViewer needs a valid container.");
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(options.background || 0x1a202c);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
    const cameraPosition = options.cameraPosition || [110, 75, 130];
    camera.position.set(cameraPosition[0], cameraPosition[1], cameraPosition[2]);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(global.devicePixelRatio || 1);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    const controls = global.THREE.OrbitControls
      ? new global.THREE.OrbitControls(camera, renderer.domElement)
      : null;

    if (controls) {
      const target = options.target || [0, 12, 0];
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.target.set(target[0], target[1], target[2]);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 0.75);
    mainLight.position.set(80, 120, 90);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffd1b3, 0.25);
    fillLight.position.set(-80, 40, -90);
    scene.add(fillLight);

    if (options.grid !== false) {
      const grid = new THREE.GridHelper(options.gridSize || 200, options.gridDivisions || 40, 0x4a5568, 0x2d3748);
      scene.add(grid);
    }

    const materials = {
      plywood: createMaterial(0xd4a373, 0.8),
      pine: createMaterial(0xfaedcd, 0.7),
      skid: createMaterial(0xbc6c25, 0.9),
      painted: createMaterial(0xe2e8f0, 0.55)
    };

    const draggable = [];

    function addBoard(spec) {
      const mesh = makeBoard(spec, materials);
      scene.add(mesh);
      if (spec.draggable) draggable.push(mesh);
      return mesh;
    }

    function addBoards(specs) {
      return specs.map(addBoard);
    }

    function removeBoard(mesh) {
      const index = draggable.indexOf(mesh);
      if (index >= 0) draggable.splice(index, 1);
      scene.remove(mesh);
      if (mesh.geometry) mesh.geometry.dispose();
    }

    function enableSimpleDragging() {
      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      const dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
      const hitPoint = new THREE.Vector3();
      const offset = new THREE.Vector3();
      let selected = null;

      function updatePointer(event) {
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      }

      renderer.domElement.addEventListener("pointerdown", function (event) {
        updatePointer(event);
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(draggable, false).filter(function (hit) {
          return hit.object.userData.locked !== true;
        });
        if (!hits.length) return;

        selected = hits[0].object;
        dragPlane.constant = -selected.position.y;
        raycaster.ray.intersectPlane(dragPlane, hitPoint);
        offset.copy(hitPoint).sub(selected.position);
        if (controls) controls.enabled = false;
      });

      renderer.domElement.addEventListener("pointermove", function (event) {
        if (!selected || selected.userData.locked) return;
        updatePointer(event);
        raycaster.setFromCamera(pointer, camera);
        if (raycaster.ray.intersectPlane(dragPlane, hitPoint)) {
          selected.position.x = hitPoint.x - offset.x;
          selected.position.z = hitPoint.z - offset.z;
        }
      });

      renderer.domElement.addEventListener("pointerup", function () {
        if (selected) {
          renderer.domElement.dispatchEvent(new CustomEvent("woodshop3d-part-moved", {
            detail: { mesh: selected }
          }));
        }
        selected = null;
        if (controls) controls.enabled = true;
      });
    }

    function animate() {
      requestAnimationFrame(animate);
      if (controls) controls.update();
      renderer.render(scene, camera);
    }

    global.addEventListener("resize", function () {
      const nextWidth = container.clientWidth || window.innerWidth;
      const nextHeight = container.clientHeight || window.innerHeight;
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
    });

    return {
      scene: scene,
      camera: camera,
      renderer: renderer,
      controls: controls,
      materials: materials,
      addBoard: addBoard,
      addBoards: addBoards,
      removeBoard: removeBoard,
      enableSimpleDragging: enableSimpleDragging,
      animate: animate
    };
  }

  function shelfAParts() {
    const dividerX = -15.375;
    const longShelfX = (dividerX + 0.375 + 45.25 - 0.375) / 2;
    const smallShelfX = (-45.25 + 0.75 + dividerX - 0.375) / 2;
    const leftShelfYs = [7.375, 12.875, 18.375];
    const longShelfY = 16.375;
    const cleatZ = -1.625;

    return [
      { id: "F1", name: "Left base skid", size: [3.5, 1.5, 23.25], position: [-44.25, 0.75, 0], materialKey: "skid" },
      { id: "F2", name: "Center base skid", size: [3.5, 1.5, 23.25], position: [0, 0.75, 0], materialKey: "skid" },
      { id: "F3", name: "Right base skid", size: [3.5, 1.5, 23.25], position: [44.25, 0.75, 0], materialKey: "skid" },
      { id: "P2", name: "Bottom panel", size: [92, 0.75, 23.25], position: [0, 1.875, 0], materialKey: "plywood" },
      { id: "P4", name: "Left side panel", size: [0.75, 22.5, 23.25], position: [-45.625, 13.5, 0], materialKey: "plywood" },
      { id: "P5", name: "Right side panel", size: [0.75, 22.5, 23.25], position: [45.625, 13.5, 0], materialKey: "plywood" },
      { id: "P6", name: "Center divider", size: [0.75, 22.5, 23.25], position: [dividerX, 13.5, 0], materialKey: "plywood" },
      { id: "P1", name: "Top panel", size: [92, 0.75, 23.25], position: [0, 25.125, 0], materialKey: "plywood" },
      { id: "P3", name: "Back panel", size: [92, 24, 0.75], position: [0, 13.5, -11.25], materialKey: "plywood" },
      { id: "P8A", name: "Small shelf 1", size: [29.5, 0.75, 23.25], position: [smallShelfX, leftShelfYs[0], 0], materialKey: "plywood" },
      { id: "P8B", name: "Small shelf 2", size: [29.5, 0.75, 23.25], position: [smallShelfX, leftShelfYs[1], 0], materialKey: "plywood" },
      { id: "P8C", name: "Small shelf 3", size: [29.5, 0.75, 23.25], position: [smallShelfX, leftShelfYs[2], 0], materialKey: "plywood" },
      { id: "P7", name: "Long shelf", size: [60.25, 0.75, 23.25], position: [longShelfX, longShelfY, 0], materialKey: "plywood" },
      { id: "C1", name: "Left bay lower cleat, left wall", size: [0.75, 1.5, 20], position: [-44.875, 5.5, cleatZ], materialKey: "pine" },
      { id: "C2", name: "Left bay lower cleat, divider", size: [0.75, 1.5, 20], position: [dividerX - 0.375, 5.5, cleatZ], materialKey: "pine" },
      { id: "C3", name: "Left bay middle cleat, left wall", size: [0.75, 1.5, 20], position: [-44.875, 11, cleatZ], materialKey: "pine" },
      { id: "C4", name: "Left bay middle cleat, divider", size: [0.75, 1.5, 20], position: [dividerX - 0.375, 11, cleatZ], materialKey: "pine" },
      { id: "C5", name: "Left bay upper cleat, left wall", size: [0.75, 1.5, 20], position: [-44.875, 16.5, cleatZ], materialKey: "pine" },
      { id: "C6", name: "Left bay upper cleat, divider", size: [0.75, 1.5, 20], position: [dividerX - 0.375, 16.5, cleatZ], materialKey: "pine" },
      { id: "C7", name: "Right bay cleat, divider", size: [0.75, 1.5, 20], position: [dividerX + 0.375, 14.5, cleatZ], materialKey: "pine" },
      { id: "C8", name: "Right bay cleat, right wall", size: [0.75, 1.5, 20], position: [44.875, 14.5, cleatZ], materialKey: "pine" },
      { id: "L1", name: "Long shelf stiffener", size: [60.25, 1.5, 0.75], position: [longShelfX, 15.625, 10.875], materialKey: "pine" }
    ];
  }

  function tabletopShelfParts() {
    const totalWidth = 89;
    const depth = 23;
    const height = 38;
    const thickness = 0.75;
    const leftDividerX = -21.5;
    const rightDividerX = 21.5;
    const outerLeftX = -totalWidth / 2 + thickness / 2;
    const outerRightX = totalWidth / 2 - thickness / 2;
    const leftBayX = (outerLeftX + thickness / 2 + leftDividerX - thickness / 2) / 2;
    const rightBayX = (rightDividerX + thickness / 2 + outerRightX - thickness / 2) / 2;
    const sideShelfWidth = 23;
    const shelfYs = [13.375, 23.125];

    return [
      { id: "TS1", name: "Full top board", size: [totalWidth, thickness, depth], position: [0, height - thickness / 2, 0], materialKey: "plywood" },
      { id: "TS2", name: "Full bottom board", size: [totalWidth, thickness, depth], position: [0, thickness / 2, 0], materialKey: "plywood" },
      { id: "TS3", name: "Left outside standing support", size: [thickness, height, depth], position: [outerLeftX, height / 2, 0], materialKey: "plywood" },
      { id: "TS4", name: "Left divider standing support", size: [thickness, height, depth], position: [leftDividerX, height / 2, 0], materialKey: "plywood" },
      { id: "TS5", name: "Right divider standing support", size: [thickness, height, depth], position: [rightDividerX, height / 2, 0], materialKey: "plywood" },
      { id: "TS6", name: "Right outside standing support", size: [thickness, height, depth], position: [outerRightX, height / 2, 0], materialKey: "plywood" },
      { id: "TS7", name: "Left lower book shelf", size: [sideShelfWidth, thickness, depth], position: [leftBayX, shelfYs[0], 0], materialKey: "plywood" },
      { id: "TS8", name: "Left upper book shelf", size: [sideShelfWidth, thickness, depth], position: [leftBayX, shelfYs[1], 0], materialKey: "plywood" },
      { id: "TS9", name: "Right lower book shelf", size: [sideShelfWidth, thickness, depth], position: [rightBayX, shelfYs[0], 0], materialKey: "plywood" },
      { id: "TS10", name: "Right upper book shelf", size: [sideShelfWidth, thickness, depth], position: [rightBayX, shelfYs[1], 0], materialKey: "plywood" },
      { id: "TS11", name: "Rear brace tying ladder frames", size: [totalWidth, 4, thickness], position: [0, 20, -depth / 2 + thickness / 2], materialKey: "pine" }
    ];
  }

  function bookcaseParts() {
    const width = 36;
    const height = 72;
    const depth = 12;
    const t = 0.75;
    const sideX = width / 2 - t / 2;
    const shelfWidth = width - 2 * t;
    const shelfYs = [14, 28, 42, 56];

    const parts = [
      { id: "BC1", name: "Left side panel", size: [t, height, depth], position: [-sideX, height / 2, 0], materialKey: "plywood", notes: "Main vertical side of the bookcase." },
      { id: "BC2", name: "Right side panel", size: [t, height, depth], position: [sideX, height / 2, 0], materialKey: "plywood", notes: "Main vertical side of the bookcase." },
      { id: "BC3", name: "Top panel", size: [width, t, depth], position: [0, height - t / 2, 0], materialKey: "plywood", notes: "Caps the bookcase and ties both sides together." },
      { id: "BC4", name: "Bottom panel", size: [width, t, depth], position: [0, t / 2 + 2, 0], materialKey: "plywood", notes: "Bottom shelf raised above the base skids." },
      { id: "BC5", name: "Back panel", size: [width, height - 2, t], position: [0, height / 2, -depth / 2 + t / 2], materialKey: "painted", notes: "Back panel keeps the bookcase square and reduces racking." },
      { id: "BC6", name: "Left base skid", size: [3.5, 1.5, depth], position: [-12, 0.75, 0], materialKey: "skid", notes: "Base skid lifts the cabinet off the floor." },
      { id: "BC7", name: "Right base skid", size: [3.5, 1.5, depth], position: [12, 0.75, 0], materialKey: "skid", notes: "Base skid lifts the cabinet off the floor." }
    ];

    shelfYs.forEach(function (y, index) {
      const shelfId = index + 1;
      parts.push(
        { id: "BCS" + shelfId, name: "Adjustable shelf " + shelfId, size: [shelfWidth, t, depth], position: [0, y, 0], materialKey: "plywood", notes: "Book shelf board. Add a front stiffener for heavier books." },
        { id: "BCC" + shelfId + "L", name: "Left shelf cleat " + shelfId, size: [t, 1.5, depth - 1.5], position: [-sideX + t, y - 1.125, 0.25], materialKey: "pine", notes: "Cleat supports the shelf from below." },
        { id: "BCC" + shelfId + "R", name: "Right shelf cleat " + shelfId, size: [t, 1.5, depth - 1.5], position: [sideX - t, y - 1.125, 0.25], materialKey: "pine", notes: "Cleat supports the shelf from below." },
        { id: "BCL" + shelfId, name: "Shelf front stiffener " + shelfId, size: [shelfWidth, 1.5, t], position: [0, y - 1.125, depth / 2 - t / 2], materialKey: "pine", notes: "Front lip stiffens the shelf against sagging." }
      );
    });

    return parts;
  }

  function workbenchParts() {
    return [
      { id: "WB1", name: "Workbench top", size: [60, 1.5, 30], position: [0, 36.75, 0], materialKey: "plywood", notes: "Main work surface." },
      { id: "WB2", name: "Front left leg", size: [3.5, 35.25, 3.5], position: [-25, 17.625, 12], materialKey: "skid", notes: "2x4 leg." },
      { id: "WB3", name: "Front right leg", size: [3.5, 35.25, 3.5], position: [25, 17.625, 12], materialKey: "skid", notes: "2x4 leg." },
      { id: "WB4", name: "Back left leg", size: [3.5, 35.25, 3.5], position: [-25, 17.625, -12], materialKey: "skid", notes: "2x4 leg." },
      { id: "WB5", name: "Back right leg", size: [3.5, 35.25, 3.5], position: [25, 17.625, -12], materialKey: "skid", notes: "2x4 leg." },
      { id: "WB6", name: "Front apron", size: [54, 3.5, 1.5], position: [0, 32, 14.25], materialKey: "pine", notes: "Brace under the front edge of the top." },
      { id: "WB7", name: "Back apron", size: [54, 3.5, 1.5], position: [0, 32, -14.25], materialKey: "pine", notes: "Brace under the back edge of the top." },
      { id: "WB8", name: "Left side apron", size: [1.5, 3.5, 24], position: [-28.5, 32, 0], materialKey: "pine", notes: "Side brace tying front and back legs together." },
      { id: "WB9", name: "Right side apron", size: [1.5, 3.5, 24], position: [28.5, 32, 0], materialKey: "pine", notes: "Side brace tying front and back legs together." },
      { id: "WB10", name: "Lower shelf", size: [52, 0.75, 22], position: [0, 12, 0], materialKey: "plywood", notes: "Lower storage shelf." },
      { id: "WB11", name: "Lower shelf front cleat", size: [52, 1.5, 0.75], position: [0, 10.875, 11], materialKey: "pine", notes: "Cleat/stiffener supporting the lower shelf." },
      { id: "WB12", name: "Lower shelf back cleat", size: [52, 1.5, 0.75], position: [0, 10.875, -11], materialKey: "pine", notes: "Cleat/stiffener supporting the lower shelf." },
      { id: "WB13", name: "Top front stiffener", size: [60, 1.5, 0.75], position: [0, 35.625, 14.625], materialKey: "pine", notes: "Front stiffener lip reduces top flex." },
      { id: "WB14", name: "Top back stiffener", size: [60, 1.5, 0.75], position: [0, 35.625, -14.625], materialKey: "pine", notes: "Back stiffener lip reduces top flex." }
    ];
  }

  function shoeRackParts() {
    const width = 36;
    const depth = 14;
    const t = 0.75;
    const shelfYs = [6, 14, 22];
    const parts = [
      { id: "SR1", name: "Left side panel", size: [t, 28, depth], position: [-width / 2 + t / 2, 14, 0], materialKey: "plywood", notes: "Side panel for the shoe rack." },
      { id: "SR2", name: "Right side panel", size: [t, 28, depth], position: [width / 2 - t / 2, 14, 0], materialKey: "plywood", notes: "Side panel for the shoe rack." },
      { id: "SR3", name: "Top cap", size: [width, t, depth], position: [0, 27.625, 0], materialKey: "plywood", notes: "Top cap tying the sides together." },
      { id: "SR4", name: "Left base skid", size: [3.5, 1.5, depth], position: [-12, 0.75, 0], materialKey: "skid", notes: "Base skid raises the rack off the floor." },
      { id: "SR5", name: "Right base skid", size: [3.5, 1.5, depth], position: [12, 0.75, 0], materialKey: "skid", notes: "Base skid raises the rack off the floor." }
    ];

    shelfYs.forEach(function (y, index) {
      const id = index + 1;
      parts.push(
        { id: "SRS" + id, name: "Shoe shelf " + id, size: [width - 1.5, t, depth], position: [0, y, 0], materialKey: "plywood", notes: "Shelf for shoes or bins." },
        { id: "SRC" + id + "L", name: "Left shelf cleat " + id, size: [t, 1.5, depth - 1], position: [-width / 2 + 1.125, y - 1.125, 0], materialKey: "pine", notes: "Cleat supporting the shelf." },
        { id: "SRC" + id + "R", name: "Right shelf cleat " + id, size: [t, 1.5, depth - 1], position: [width / 2 - 1.125, y - 1.125, 0], materialKey: "pine", notes: "Cleat supporting the shelf." },
        { id: "SRL" + id, name: "Shelf front stiffener " + id, size: [width - 1.5, 1.5, t], position: [0, y - 1.125, depth / 2 - t / 2], materialKey: "pine", notes: "Front stiffener keeps the shelf from sagging." }
      );
    });

    return parts;
  }

  function storageCubbiesParts() {
    return [
      { id: "CU1", name: "Left side panel", size: [0.75, 36, 14], position: [-24, 18, 0], materialKey: "plywood", notes: "Outer side of the cubby unit." },
      { id: "CU2", name: "Right side panel", size: [0.75, 36, 14], position: [24, 18, 0], materialKey: "plywood", notes: "Outer side of the cubby unit." },
      { id: "CU3", name: "Top panel", size: [48, 0.75, 14], position: [0, 35.625, 0], materialKey: "plywood", notes: "Top cap." },
      { id: "CU4", name: "Bottom panel", size: [48, 0.75, 14], position: [0, 2.375, 0], materialKey: "plywood", notes: "Bottom shelf raised on base skids." },
      { id: "CU5", name: "Center vertical divider", size: [0.75, 32.5, 14], position: [0, 18.75, 0], materialKey: "plywood", notes: "Vertical divider forming two columns." },
      { id: "CU6", name: "Middle shelf", size: [48, 0.75, 14], position: [0, 18, 0], materialKey: "plywood", notes: "Horizontal divider forming two rows." },
      { id: "CU7", name: "Back panel", size: [48, 34, 0.75], position: [0, 18.5, -6.625], materialKey: "painted", notes: "Back panel squares the cubby unit." },
      { id: "CU8", name: "Left base skid", size: [3.5, 1.5, 14], position: [-16, 0.75, 0], materialKey: "skid", notes: "Base skid lifts the unit." },
      { id: "CU9", name: "Right base skid", size: [3.5, 1.5, 14], position: [16, 0.75, 0], materialKey: "skid", notes: "Base skid lifts the unit." },
      { id: "CU10", name: "Middle shelf front stiffener", size: [48, 1.5, 0.75], position: [0, 16.875, 6.625], materialKey: "pine", notes: "Front stiffener for the long shelf span." },
      { id: "CU11", name: "Bottom shelf front stiffener", size: [48, 1.5, 0.75], position: [0, 1.25, 6.625], materialKey: "pine", notes: "Front stiffener for the bottom shelf." }
    ];
  }

  global.WoodShop3D = {
    createViewer: createViewer,
    shelfAParts: shelfAParts,
    tabletopShelfParts: tabletopShelfParts,
    bookcaseParts: bookcaseParts,
    workbenchParts: workbenchParts,
    shoeRackParts: shoeRackParts,
    storageCubbiesParts: storageCubbiesParts,
    createMaterial: createMaterial
  };
})(window);
