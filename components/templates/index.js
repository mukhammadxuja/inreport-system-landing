import dynamic from "next/dynamic";

const templates = {
  Default: dynamic(() => import("./default/home")),
  BentoGrid: dynamic(() => import("./bento-grid/home")),
};

export default templates;
