export class RecipeModel {
  _id = "";
  title = "";
  summary = "";
  ingredients = [
    {
      measurement: "",
      item: "",
    },
  ];
  directions = "";
  isSaved = false;
}

export class Ingredient {
  measurement = "";
  item = "";
}
