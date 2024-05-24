"use client";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import Matter from "matter-js";

function LastSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const { Engine, Render, World, Bodies, Mouse, MouseConstraint, Events } =
      Matter;

    const engine = Engine.create();
    const render = Render.create({
      element: containerRef.current,
      engine: engine,
      canvas: canvasRef.current,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: "transparent",
      },
    });

    const items = [
      Bodies.rectangle(200, -100, 80, 80, { restitution: 0.5 }),
      Bodies.circle(300, -100, 40, { restitution: 0.5 }),
      Bodies.polygon(400, -100, 5, 50, { restitution: 0.5 })
    ];

    World.add(engine.world, items);

    // Create the boundary thickness
    const thickness = 1024;

    // Ground
    const ground = Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight + thickness / 2,
      window.innerWidth,
      thickness,
      {
        isStatic: true,
      }
    );

    // Ceiling
    const ceiling = Bodies.rectangle(
      window.innerWidth / 2,
      -thickness / 2,
      window.innerWidth,
      thickness,
      {
        isStatic: true,
      }
    );

    // Left wall
    const leftWall = Bodies.rectangle(
      -thickness / 2,
      window.innerHeight / 2,
      thickness,
      window.innerHeight,
      {
        isStatic: true,
      }
    );

    // Right wall
    const rightWall = Bodies.rectangle(
      window.innerWidth + thickness / 2,
      window.innerHeight / 2,
      thickness,
      window.innerHeight,
      {
        isStatic: true,
      }
    );

    World.add(engine.world, [ground, ceiling, leftWall, rightWall]);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    World.add(engine.world, mouseConstraint);

    Engine.run(engine);
    Render.run(render);

    return () => {
      Render.stop(render);
      World.clear(engine.world);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, [isInView]);

  return (
    <div ref={containerRef} className="relative h-screen">
      <h2 className="text-clamp absolute top-1/3 -translate-y-1/3 left-1/2 -translate-x-1/2">
        How can we
        <span className="text-muted-foreground"> help?</span>
      </h2>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default LastSection;
