import { z } from "zod";
import { ChatOpenAI } from "@langchain/openai";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const chatModel = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-4o',
    temperature: 0.7
});

const bestCaseScenarioSchema = z.array(z.object({
    name: z.string(),
    data: z.object({
        FY1: z.number(),
        FY2: z.number(),
        FY3: z.number(),
        FY4: z.number(),
        FY5: z.number()
    })
}));

const parser = StructuredOutputParser.fromZodSchema(bestCaseScenarioSchema);

const chain = RunnableSequence.from([
    PromptTemplate.fromTemplate(
        `You are an expert financial analyst. Your task is to analyze the provided input data and generate a JSON object with specific financial metrics for the best case scenario. Ensure that the values are extracted accurately and formatted correctly. The JSON object should contain the following fields:
           Strict: You will generate this object inputData will not give this your task is to generate this it will not provide any data you will generate
        [
            {{
                "name": "revenue",
                "data": {{
                    "FY1": (numeric value),
                    "FY2": (numeric value),
                    "FY3": (numeric value),
                    "FY4": (numeric value),
                    "FY5": (numeric value)
                }}
            }},
            {{
                "name": "cost_of_goods_sold",
                "data": {{
                    "FY1": (numeric value),
                    "FY2": (numeric value),
                    "FY3": (numeric value),
                    "FY4": (numeric value),
                    "FY5": (numeric value)
                }}
            }},
            {{
                "name": "gross_margin",
                "data": {{
                    "FY1": (numeric value),
                    "FY2": (numeric value),
                    "FY3": (numeric value),
                    "FY4": (numeric value),
                    "FY5": (numeric value)
                }}
            }},
            {{
                "name": "gross_margin_revenue",
                "data": {{
                    "FY1": (numeric value),
                    "FY2": (numeric value),
                    "FY3": (numeric value),
                    "FY4": (numeric value),
                    "FY5": (numeric value)
                }}
            }},
            {{
                "name": "operating_expenses",
                "data": {{
                    "FY1": (numeric value),
                    "FY2": (numeric value),
                    "FY3": (numeric value),
                    "FY4": (numeric value),
                    "FY5": (numeric value)
                }}
            }},
            {{
                "name": "ebit",
                "data": {{
                    "FY1": (numeric value),
                    "FY2": (numeric value),
                    "FY3": (numeric value),
                    "FY4": (numeric value),
                    "FY5": (numeric value)
                }}
            }},
            {{
                "name": "ebit_revenue",
                "data": {{
                    "FY1": (numeric value),
                    "FY2": (numeric value),
                    "FY3": (numeric value),
                    "FY4": (numeric value),
                    "FY5": (numeric value)
                }}
            }}
        ]
        Ensure that the JSON object is well-formatted and all numeric values are accurate. Return the JSON object directly without any additional strings or delimiters.`
    ),
    chatModel,
    parser
]);

export const generateBestCaseScenarioData = async (inputData: object) => {
    const response = await chain.invoke({
        input: JSON.stringify(inputData),
        format_instruction: parser.getFormatInstructions(),
    });

    // The response is already parsed data
    return response;
};




