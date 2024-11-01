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

const annualFinancialSchema = z.array(z.object({
    type: z.string(),
    FY1: z.number(),
    FY2: z.number(),
    FY3: z.number(),
    FY4: z.number(),
    FY5: z.number()
}));

const parser = StructuredOutputParser.fromZodSchema(annualFinancialSchema);

const chain = RunnableSequence.from([
    PromptTemplate.fromTemplate(
        `You are an expert financial analyst. Your task is to generate a JSON object with specific financial metrics for the annual financial data. Ensure that the values are extracted accurately and formatted correctly. The JSON object should contain the following fields:
            Strict: You will generate this object inputData will not give this your task is to generate this it will not provide any data you will generate
        [
            {{
                "type": "COGS",
                "FY1": (numeric value),
                "FY2": (numeric value),
                "FY3": (numeric value),
                "FY4": (numeric value),
                "FY5": (numeric value)
            }},
            {{
                "type": "EBITDA",
                "FY1": (numeric value),
                "FY2": (numeric value),
                "FY3": (numeric value),
                "FY4": (numeric value),
                "FY5": (numeric value)
            }},
            {{
                "type": "REVENUES",
                "FY1": (numeric value),
                "FY2": (numeric value),
                "FY3": (numeric value),
                "FY4": (numeric value),
                "FY5": (numeric value)
            }}
        ]
        Ensure that the JSON object is well-formatted and all numeric values are accurate. Return the JSON object directly without any additional strings or delimiters.`
    ),
    chatModel,
    parser
]);

export const generateAnnualFinancialData = async (inputData: object) => {
    const response = await chain.invoke({
        input: JSON.stringify(inputData),
        format_instruction: parser.getFormatInstructions(),
    });

    // The response is already parsed data
    return response;
};