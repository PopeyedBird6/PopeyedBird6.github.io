function toggleDescription(id) {
    const description = document.getElementById(id);
    if (description.style.display === "none" || description.style.display === "") {
      description.style.display = "block";
    } else {
      description.style.display = "none";
    }
  }
  