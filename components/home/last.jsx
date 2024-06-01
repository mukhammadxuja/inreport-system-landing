"use client";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import Matter from "matter-js";
import { Input } from "../ui/input";

function LastSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const isInView = useInView(containerRef);

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

    // Create Matter.js bodies
    const items = [
      Bodies.rectangle(200, -100, 80, 80, { restitution: 0.5 }),
      Bodies.circle(300, -100, 40, { restitution: 0.5 }),
      Bodies.polygon(400, -100, 5, 50, { restitution: 0.5 }),
    ];

    World.add(engine.world, items);

    // Create HTML elements
    const input = document.createElement("input");
    input.type = "text";
    input.style.position = "absolute";
    input.style.width = "80px";
    input.style.height = "40px";
    containerRef.current.appendChild(input);

    const button = document.createElement("button");
    button.innerText = "Click Me";
    button.style.position = "absolute";
    button.style.width = "100px";
    button.style.height = "40px";
    containerRef.current.appendChild(button);

    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.width = "100px";
    div.style.height = "100px";
    div.style.backgroundColor = "lightblue";
    containerRef.current.appendChild(div);

    // Create corresponding Matter.js bodies for the HTML elements
    const inputBody = Bodies.rectangle(100, -100, 80, 40, { restitution: 0.5 });
    const buttonBody = Bodies.rectangle(200, -100, 100, 40, {
      restitution: 0.5,
    });
    const divBody = Bodies.rectangle(300, -100, 100, 100, { restitution: 0.5 });

    World.add(engine.world, [inputBody, buttonBody, divBody]);

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

    // Synchronize HTML elements with Matter.js bodies
    Events.on(engine, "afterUpdate", () => {
      input.style.transform = `translate(${inputBody.position.x - 40}px, ${
        inputBody.position.y - 20
      }px)`;
      button.style.transform = `translate(${buttonBody.position.x - 50}px, ${
        buttonBody.position.y - 20
      }px)`;
      div.style.transform = `translate(${divBody.position.x - 50}px, ${
        divBody.position.y - 50
      }px)`;
    });

    return () => {
      Render.stop(render);
      World.clear(engine.world);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
      input.remove();
      button.remove();
      div.remove();
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
