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

const projectedBalancesheetSchema = z.array(z.object({
    name: z.string(),
    data: z.object({
        FY1: z.number(),
        FY2: z.number(),
        FY3: z.number(),
        FY4: z.number(),
        FY5: z.number()
    })
}));

const parser = StructuredOutputParser.fromZodSchema(projectedBalancesheetSchema);

const chain = RunnableSequence.from([
    PromptTemplate.fromTemplate(
        `You are an expert financial analyst. Your task is to analyze the provided input data and generate a JSON object with specific financial metrics for the projected balance sheet. Ensure that the values are extracted accurately and formatted correctly. The JSON object should contain the following fields:
           Strict: You will generate this object inputData will not give this your task is to generate this it will not provide any data you will generate
        [
            {{
                "name": "cash",
                "data": {{
                    "FY1": (numeric value),
                    "FY2": (numeric value),
                    "FY3": (numeric value),
                    "FY4": (numeric value),
                    "FY5": (numeric value)
                }}
            }},
            {{
                "name": "other_current_assets",
                "data": {{
                    "FY1": (numeric value),
                    "FY2": (numeric value),
                    "FY3": (numeric value),
                    "FY4": (numeric value),
                    "FY5": (numeric value)
                }}
            }},
            {{
                "name": "total_current_assets",
                "data": {{
                    "FY1": (numeric value),
                    "FY2": (numeric value),
                    "FY3": (numeric value),
                    "FY4": (numeric value),
                    "FY5": (numeric value)
                }}
            }},
            {{
                "name": "intangible_assets",
                "data": {{
                    "FY1": (numeric value),
                    "FY2": (numeric value),
                    "FY3": (numeric value),
                    "FY4": (numeric value),
                    "FY5": (numeric value)
                }}
            }},
            {{
                "name": "tangible_assets",
                "data": {{
                    "FY1": (numeric value),
                    "FY2": (numeric value),
                    "FY3": (numeric value),
                    "FY4": (numeric value),
                    "FY5": (numeric value)
                }}
            }},
            {{
                "name": "total_long_term_assets",
                "data": {{
                    "FY1": (numeric value),
                    "FY2": (numeric value),
                    "FY3": (numeric value),
                    "FY4": (numeric value),
                    "FY5": (numeric value)
                }}
            }},
            {{
                "name": "total_assets",
                "data": {{
                    "FY1": (numeric value),
                    "FY2": (numeric value),
                    "FY3": (numeric value),
                    "FY4": (numeric value),
                    "FY5": (numeric value)
                }}
            }},
            {{
                "name": "current_liabilities",
                "data": {{
                    "FY1": (numeric value),
                    "FY2": (numeric value),
                    "FY3": (numeric value),
                    "FY4": (numeric value),
                    "FY5": (numeric value)
                }}
            }},
            {{
                "name": "debt_outstanding",
                "data": {{
                    "FY1": (numeric value),
                    "FY2": (numeric value),
                    "FY3": (numeric value),
                    "FY4": (numeric value),
                    "FY5": (numeric value)
                }}
            }},
            {{
                "name": "total_liabilities",
                "data": {{
                    "FY1": (numeric value),
                    "FY2": (numeric value),
                    "FY3": (numeric value),
                    "FY4": (numeric value),
                    "FY5": (numeric value)
                }}
            }},
            {{
                "name": "share_capital",
                "data": {{
                    "FY1": (numeric value),
                    "FY2": (numeric value),
                    "FY3": (numeric value),
                    "FY4": (numeric value),
                    "FY5": (numeric value)
                }}
            }},
            {{
                "name": "retained_earnings",
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

export const generateProjectedBalancesheetData = async (inputData: object) => {
    const response = await chain.invoke({
        input: JSON.stringify(inputData),
        format_instruction: parser.getFormatInstructions(),
    });

    // Directly return the response as it is already parsed
    return response;
};