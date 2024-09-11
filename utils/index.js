// Define the function
const checkProfession = (value) => {
  let profession;

  switch (value) {
    case "software-developer":
      profession = "Software Developer";
      break;
    case "graphic-designer":
      profession = "Graphic Designer";
      break;
    case "web-designer":
      profession = "Web Designer";
      break;
    case "photographer":
      profession = "Photographer";
      break;
    case "videographer":
      profession = "Videographer";
      break;
    case "video-editor":
      profession = "Video Editor";
      break;
    case "architects":
      profession = "Architects";
      break;
    case "writer":
      profession = "Writer";
      break;
    case "other":
      profession = "Other";
      break;
    default:
      profession = "Unknown";
  }

  return profession;
};

// Export the function
export default checkProfession;

export const checkTemplate = (value) => {
  let template;

  switch (value) {
    case "terra-nova":
      template = "Terra Nova";
      break;
    case "professional-edge":
      template = "Professional Edge";
      break;
    case "creative-spark":
      template = "Creative Spark";
      break;
    case "modern-chic":
      template = "Modern Chic";
      break;
    case "sleek-signature":
      template = "Sleek Signature";
      break;
    case "elegant-essence":
      template = "Elegant Essence";
      break;
    case "dynamic-fusion":
      template = "Dynamic Fusion";
      break;
    case "bold-impact":
      template = "Bold Impact";
      break;
    case "timeless-elegance":
      template = "Timeless Elegance";
      break;
    case "stylish-spectrum":
      template = "Stylish Spectrum";
      break;
    case "artistic-aura":
      template = "Artistic Aura";
      break;
    case "sophisticated-style":
      template = "Sophisticated Style";
      break;
    case "minimalist-magic":
      template = "Minimalist Magic";
      break;
    case "vibrant-visions":
      template = "Vibrant Visions";
      break;
    case "professional-polish":
      template = "Professional Polish";
      break;
    case "innovative-insight":
      template = "Innovative Insight";
      break;
    case "streamlined-showcase":
      template = "Streamlined Showcase";
      break;
    case "creative-canvas":
      template = "Creative Canvas";
      break;
    case "inspired-impact":
      template = "Inspired Impact";
      break;
    case "versatile-visions":
      template = "Versatile Visions";
      break;
    case "classic-charm":
      template = "Classic Charm";
      break;
    default:
      template = "Unknown";
  }

  return template;
};
