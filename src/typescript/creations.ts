const creationsRequest = fetch(
  "https://api.m0ns.fr/items/category?fields=*,sub_categories.*,images.*,sub_categories.images.*,images.image_file.*,sub_categories.images.image_file.*"
);
const errorElement = document.getElementById("error");
const loadingElement = document.getElementById("loading");
const noImageElement = document.getElementById("no-image");
const imagesElement = document.getElementById("images");
const categoriesElement = document.getElementById("categories");
const subCategoriesElement = document.getElementById("sub-categories");
const creationsContainerElement = document.getElementById(
  "creations-container"
);

const categories: Category[] = [];
let selectedCategory: Category | null = null;

let subCategories: SubCategory[] = [];
let selectedSubCategory: SubCategory | null = null;

function updateImages() {
  if (!imagesElement || !selectedCategory) return;

  imagesElement.innerHTML = "";

  if (imagesElement.classList.contains("hidden")) {
    imagesElement.classList.remove("hidden");
  }

  const images = selectedSubCategory
    ? selectedSubCategory.images
    : selectedCategory.images;

  if (!images || images.length == 0) {
    if (noImageElement) noImageElement.classList.remove("hidden");
  } else {
    if (noImageElement) noImageElement.classList.add("hidden");

    images.forEach((image) => {
      const imageItemElement = document.createElement("div");
      imageItemElement.classList.add("image");

      const imageLoadingElement = document.createElement("span");
      imageLoadingElement.classList.add("skeleton-box");
      imageLoadingElement.style.width = "100%";
      imageLoadingElement.style.height = "100px";
      imageItemElement.appendChild(imageLoadingElement);

      const width = imagesElement.offsetWidth - 40 * 2;
      const imageHeight =
        image.image_file.height == null ? 20 : image.image_file.height;
      const imageWidth =
        image.image_file.width == null ? 20 : image.image_file.width;
      const imageSize =
        Math.round((imageHeight / imageWidth) * (width / 4) * 10) / 10;

      imageLoadingElement.style.height = imageSize + "px";

      const imageElement = new Image();
      imageElement.onload = function () {
        imageLoadingElement.remove();
        imageItemElement.appendChild(imageElement);
      };
      imageElement.src =
        "https://api.m0ns.fr/assets/" + image.image_file.id + "?key=compressed";
      imageElement.style.width = "100%";

      imagesElement.appendChild(imageItemElement);
      return imageItemElement;
    });
  }
}

function selectCategory(category: Category) {
  selectedCategory = category;
  subCategories = category.sub_categories || [];
  selectedSubCategory = null;
  updateCategories();
  updateSubCategories();
  updateImages();
}

function selectSubCategory(subCategory: SubCategory) {
  selectedSubCategory = subCategory;
  updateSubCategories();
  updateImages();
}

function updateCategories() {
  if (categoriesElement) {
    categoriesElement.innerHTML = "";

    categories.forEach((category) => {
      const child = document.createElement("div");
      child.innerText = category.title;
      child.classList.add("category");

      if (selectedCategory == category) {
        child.classList.add("active");
      }

      child.addEventListener("click", () => {
        selectCategory(category);
      });

      categoriesElement.appendChild(child);
    });
  }
}

function updateSubCategories() {
  if (subCategoriesElement) {
    if (subCategories.length == 0) {
      subCategoriesElement.classList.add("hidden");
    } else {
      subCategoriesElement.innerHTML = "";
      subCategoriesElement.classList.remove("hidden");
    }

    subCategories.forEach((subCategory) => {
      const child = document.createElement("div");
      child.innerText = subCategory.title;
      child.classList.add("sub-category");

      if (selectedSubCategory == subCategory) {
        child.classList.add("active");
      }

      child.addEventListener("click", () => {
        selectSubCategory(subCategory);
      });

      subCategoriesElement.appendChild(child);
    });
  }
}

(function () {
  creationsRequest
    .then((response) => response.json())
    .then((data: { data: Category[] }) => {
      data.data.forEach((category: any) => {
        categories.push(category);
      });

      if (categories.length == 0 && errorElement) {
        errorElement.classList.remove("hidden");
        console.error("No categories found.");
      } else if (categories.length > 0 && categories[0]) {
        if (creationsContainerElement) {
          creationsContainerElement.classList.remove("hidden");
        }

        updateCategories();
        selectCategory(categories[0]);
      }
    })
    .catch((error) => {
      if (errorElement) {
        errorElement.classList.remove("hidden");
        console.error(error);
      }
    })
    .finally(() => {
      if (loadingElement) {
        loadingElement.classList.add("hidden");
      }
    });
})();
