import { tool } from "langchain";
import { z } from "zod";

export const weatherTool = tool(
  ({ city }) => {
    city = city.toLowerCase();
    switch (city) {
      case "delhi":
        return "The weather in Delhi is sunny";
      case "mumbai":
        return "The weather in Mumbai is sunny";
      case "chennai":
        return "The weather in Chennai is sunny";
      case "kolkata":
        return "The weather in Kolkata is sunny";
      case "bengaluru":
        return "The weather in Bengaluru is sunny";
      default:
        return "I don't know the weather of this city";
    }
  },
  {
    name: "weather_tool",
    description: "Use this tool to get the weather of a city",
    schema: z.object({
      city: z.string().describe("The city to get the weather of"),
    }),
  }
);