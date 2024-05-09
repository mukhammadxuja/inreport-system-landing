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
