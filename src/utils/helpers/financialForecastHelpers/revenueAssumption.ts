import { z } from "zod";
import { OpenAI, ChatOpenAI } from "@langchain/openai";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const chatModel = new ChatOpenAI({
  apiKey:process.env.OPENAI_API_KEY,
  model: 'gpt-4o',
  temperature: 0.7
});

const revenueAssumptionSchema = z.object({
  revenueLineItem: z.array(z.object({
    name: z.string(),
    pricePerUnit: z.number(),
    data: z.array(z.object({
      unitName: z.enum(["Monthly Sales Units", "Cost Per Units"]),
      FY1: z.number(),
      FY2: z.number(),
      FY3: z.number(),
      FY4: z.number(),
      FY5: z.number()
    }))
  })),
});

const parser = StructuredOutputParser.fromZodSchema(revenueAssumptionSchema);

const chain = RunnableSequence.from([
  PromptTemplate.fromTemplate(
`You are a seasoned financial analyst with extensive experience in revenue forecasting and financial modeling. Your task is to meticulously analyze the provided input data and construct a comprehensive JSON object encapsulating detailed financial metrics for revenue assumptions spanning the next five fiscal years (FY1 to FY5). Ensure that the values are derived with precision from the input data and formatted impeccably. Any null values should be substituted with 0. The JSON object must include the following fields:

Strict: You will generate this object inputData will not give this your task is to generate this it will not provide any data you will generate

"revenueLineItem": [
  {{
    "name": "Business Plan Creation",
    "pricePerUnit": (numeric value),
    "data": [
      {{
      "unitName": "Monthly Sales Units",
      "FY1": (numeric value),
      "FY2": (numeric value),
      "FY3": (numeric value),
      "FY4": (numeric value),
      "FY5": (numeric value)
  }},
      {{
      "unitName": "Cost Per Units",
      "FY1": (numeric value),
      "FY2": (numeric value),
      "FY3": (numeric value),
      "FY4": (numeric value),
      "FY5": (numeric value)
  }}
    ]
  }},
  {{
    "name": "Financial Modeling",
    "pricePerUnit": (numeric value),
    "data": [
      {{
      "unitName": "Monthly Sales Units",
      "FY1": (numeric value),
      "FY2": (numeric value),
      "FY3": (numeric value),
      "FY4": (numeric value),
      "FY5": (numeric value)
  }},
      {{
      "unitName": "Cost Per Units",
      "FY1": (numeric value),
      "FY2": (numeric value),
      "FY3": (numeric value),
      "FY4": (numeric value),
      "FY5": (numeric value)
  }}
    ]
  }},
  {{
    "name": "Investor Pitch Decks",
    "pricePerUnit": (numeric value),
    "data": [
      {{
      "unitName": "Monthly Sales Units",
      "FY1": (numeric value),
      "FY2": (numeric value),
      "FY3": (numeric value),
      "FY4": (numeric value),
      "FY5": (numeric value)
  }},
      {{
      "unitName": "Cost Per Units",
      "FY1": (numeric value),
      "FY2": (numeric value),
      "FY3": (numeric value),
      "FY4": (numeric value),
      "FY5": (numeric value)
  }}
    ]
  }},
  {{
    "name": "Market Research and Marketing Strategy",
    "pricePerUnit": (numeric value),
    "data": [
      {{
      "unitName": "Monthly Sales Units",
      "FY1": (numeric value),
      "FY2": (numeric value),
      "FY3": (numeric value),
      "FY4": (numeric value),
      "FY5": (numeric value)
  }},
      {{
      "unitName": "Cost Per Units",
      "FY1": (numeric value),
      "FY2": (numeric value),
      "FY3": (numeric value),
      "FY4": (numeric value),
      "FY5": (numeric value)
  }}
    ]
  }},
  {{
    "name": "Cashflow Forecasting",
    "pricePerUnit": (numeric value),
    "data": [
      {{
      "unitName": "Monthly Sales Units",
      "FY1": (numeric value),
      "FY2": (numeric value),
      "FY3": (numeric value),
      "FY4": (numeric value),
      "FY5": (numeric value)
  }},
      {{
      "unitName": "Cost Per Units",
      "FY1": (numeric value),
      "FY2": (numeric value),
      "FY3": (numeric value),
      "FY4": (numeric value),
      "FY5": (numeric value)
  }}
    ]
  }}
],

Ensure that the generated JSON object is impeccably formatted and all numeric values are accurate. If any value is null, replace it with 0. Return the JSON object directly without any additional strings or delimiters. Utilize your expertise to analyze the values comprehensively and populate all fields accurately.
{{'{{'}}format_instructions{{'}}'}}
{{'{{'}}input{{'}}'}}`
  ),
  chatModel,
  parser,
]);

export const generateRevenueAssumptiondata = async (inputData: any) => {
  const response = await chain.invoke({
    input: JSON.stringify(inputData),
    format_instructions: parser.getFormatInstructions(),
  });

  return response;
};