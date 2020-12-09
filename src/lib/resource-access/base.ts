import config from "./../../connection-config.json";

export class BaseRA {
  async post(context: string, action: string, payload: Object) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    const response = await fetch(
      `${config.RECIPESERVICE}/api/${context}/${action}`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        redirect: "follow",
      }
    );
    return response.json();
  }

  async get(context: string, action: string) {
    const response = await fetch(
      `${config.RECIPESERVICE}/api/${context}/${action}`,
      {
        method: "GET",
        redirect: "follow",
      }
    );
    return response.json();
  }
}
