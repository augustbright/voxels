import { noop } from "lodash";
import * as THREE from "three";
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { sleep } from "../utils";

const DEFAULT_INPUT = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  jump: false,
  duck: false,
};

export const createScene = () => {
  const scene = new THREE.Scene();

  // Create a camera
  const camera = new THREE.PerspectiveCamera(
    75,
    1,
    0.1,
    1000
  );
  const controls = new PointerLockControls(camera);

  // Add ambient light for overall brightness
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Add a directional light for shadows and highlights
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(-10, 10, 10);
  scene.add(directionalLight);


  let pointerLockActivatedAt: number = 0;

  const sceneControls = {
    running: false,
    lockPointer: async () => {
      const now = performance.now();
      const timeSinceLastLock = now - pointerLockActivatedAt;
      if (timeSinceLastLock < 1000) {
        await sleep(1000);
      }

      controls.lock();
    },
    onUnlockPointer: noop,
    onLockPointer: noop,
    input: {
      ...DEFAULT_INPUT,
    }
  };

  controls.addEventListener('unlock', () => {
    pointerLockActivatedAt = performance.now();
    sceneControls.onUnlockPointer();
  });

  controls.addEventListener('lock', () => {
    pointerLockActivatedAt = performance.now();
    sceneControls.onLockPointer();
  });

  const createRenderer = (canvas: HTMLCanvasElement) => {
    const renderer = new THREE.WebGLRenderer({ canvas });
    const rect = canvas.getBoundingClientRect();
    renderer.setSize(
      rect.width,
      rect.height
    );

    return renderer;
  };

  const startRenderLoop = (renderer: THREE.WebGLRenderer) => {
    // Set camera position
    camera.position.set(5, 2, -10);
    camera.lookAt(camera.position.clone().add(new THREE.Vector3(0, 0, 1)));

    let animationRequestId: number;
    let lastTime = performance.now();

    const animate = () => {
      const time = performance.now();
      animationRequestId = requestAnimationFrame(animate);

      if (sceneControls.running) {
        const delta = time - lastTime;
        controls.moveForward(sceneControls.input.forward ? 0.1 : 0);
        controls.moveForward(sceneControls.input.backward ? -0.1 : 0);
        controls.moveRight(sceneControls.input.right ? 0.1 : 0);
        controls.moveRight(sceneControls.input.left ? -0.1 : 0);
        controls.object.position.y += sceneControls.input.jump ? 0.1 : 0;
        controls.object.position.y -= sceneControls.input.duck ? 0.1 : 0;
        controls.update(delta);
        renderer.render(scene, camera);
      }

      lastTime = time;
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRequestId);
    };
  };

  const assignCanvas = (canvas: HTMLCanvasElement) => {
    const renderer = createRenderer(canvas);

    const rect = canvas.getBoundingClientRect();
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();

    controls.domElement = canvas;
    controls.connect();

    const stopRenderLoop = startRenderLoop(renderer);

    const resizeObserver = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      renderer.setSize(rect.width, rect.height);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
    });
    resizeObserver.observe(canvas);

    const unassignCanvas = () => {
      stopRenderLoop();
      controls.disconnect();
      controls.domElement = null;
      resizeObserver.disconnect();
    };

    return unassignCanvas;
  };

  const cleanUp = () => {
    sceneControls.running = false;
    sceneControls.onUnlockPointer = noop;
    sceneControls.input = { ...DEFAULT_INPUT };
  };

  return { scene, controls: sceneControls, assignCanvas, cleanUp };
};


export type TScene = ReturnType<typeof createScene>;