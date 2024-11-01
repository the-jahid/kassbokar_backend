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

const projectedCashflowSchema = z.array(z.object({
    name: z.string(),
    data: z.object({
        FY1: z.number(),
        FY2: z.number(),
        FY3: z.number(),
        FY4: z.number(),
        FY5: z.number()
    })
}));

const parser = StructuredOutputParser.fromZodSchema(projectedCashflowSchema);

const chain = RunnableSequence.from([
    PromptTemplate.fromTemplate(
        `You are an expert financial analyst. Your task is to analyze the provided input data and generate a JSON object with specific financial metrics for projected cash flow. Ensure that the values are extracted accurately and formatted correctly. The JSON object should contain the following fields:
           Strict: You will generate this object inputData will not give this your task is to generate this it will not provide any data you will generate
        [
            {{
                "name": "net_income_loss",
                "data": {{
                    "FY1": (numeric value),
                    "FY2": (numeric value),
                    "FY3": (numeric value),
                    "FY4": (numeric value),
                    "FY5": (numeric value)
                }}
            }},
            {{
                "name": "change_in_working_capital",
                "data": {{
                    "FY1": (numeric value),
                    "FY2": (numeric value),
                    "FY3": (numeric value),
                    "FY4": (numeric value),
                    "FY5": (numeric value)
                }}
            }},
            {{
                "name": "plus_depreciation",
                "data": {{
                    "FY1": (numeric value),
                    "FY2": (numeric value),
                    "FY3": (numeric value),
                    "FY4": (numeric value),
                    "FY5": (numeric value)
                }}
            }},
            {{
                "name": "plus_amortization",
                "data": {{
                    "FY1": (numeric value),
                    "FY2": (numeric value),
                    "FY3": (numeric value),
                    "FY4": (numeric value),
                    "FY5": (numeric value)
                }}
            }},
            {{
                "name": "net_cash_flow_from_operations",
                "data": {{
                    "FY1": (numeric value),
                    "FY2": (numeric value),
                    "FY3": (numeric value),
                    "FY4": (numeric value),
                    "FY5": (numeric value)
                }}
            }},
            {{
                "name": "net_cash_flow_from_investments",
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
                "name": "cash_from_equity",
                "data": {{
                    "FY1": (numeric value),
                    "FY2": (numeric value),
                    "FY3": (numeric value),
                    "FY4": (numeric value),
                    "FY5": (numeric value)
                }}
            }},
            {{
                "name": "cash_from_debt_financing",
                "data": {{
                    "FY1": (numeric value),
                    "FY2": (numeric value),
                    "FY3": (numeric value),
                    "FY4": (numeric value),
                    "FY5": (numeric value)
                }}
            }},
            {{
                "name": "repayment_of_loan",
                "data": {{
                    "FY1": (numeric value),
                    "FY2": (numeric value),
                    "FY3": (numeric value),
                    "FY4": (numeric value),
                    "FY5": (numeric value)
                }}
            }},
            {{
                "name": "net_cash_flow_from_financing",
                "data": {{
                    "FY1": (numeric value),
                    "FY2": (numeric value),
                    "FY3": (numeric value),
                    "FY4": (numeric value),
                    "FY5": (numeric value)
                }}
            }},
            {{
                "name": "net_cash_flow",
                "data": {{
                    "FY1": (numeric value),
                    "FY2": (numeric value),
                    "FY3": (numeric value),
                    "FY4": (numeric value),
                    "FY5": (numeric value)
                }}
            }},
            {{
                "name": "operating_cash_balance",
                "data": {{
                    "FY1": (numeric value),
                    "FY2": (numeric value),
                    "FY3": (numeric value),
                    "FY4": (numeric value),
                    "FY5": (numeric value)
                }}
            }},
            {{
                "name": "ending_cash_balance",
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

export const generateProjectedCashflowData = async (inputData: object) => {
    const response = await chain.invoke({
        input: JSON.stringify(inputData),
        format_instruction: parser.getFormatInstructions(),
    });

    // Extract the JSON part from the response
    return response;
};