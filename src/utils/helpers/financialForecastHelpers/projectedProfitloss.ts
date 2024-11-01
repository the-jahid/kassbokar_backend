
import {z} from "zod"
import {ChatOpenAI} from "@langchain/openai"
import {RunnableSequence} from "@langchain/core/runnables"
import {StructuredOutputParser} from "langchain/output_parsers"
import {PromptTemplate} from "@langchain/core/prompts"

const chatModel = new ChatOpenAI({
    apiKey:process.env.OPENAI_API_KEY,
    model:'gpt-4o',
    temperature:0.7
})

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// const projectedProfitlossSchema  = z.object({
//     Subtotal_cost_of_revenue: z.number(),
//     total_cost_of_revenue:z.number(),
//     gross_margin:z.number(),
//     gross_Margin_Revenue:z.number().describe('it will be percentage value'),
//     staff_salaries:z.number(),
//     office_rent:z.number(),
//     Utilities:z.number(),
//     software_and_hardware:z.number(),
//     marketing:z.number(),
//     miscellaneous:z.number(),
//     total_operating_Expenses:(),
//     depreciation: z.number(),
//     amortization: z.number(),
//     interest_expense: z.number(),
//     net_income: z.number(),
//     net_income_revenue: z.number(),
//     ebitda: z.number()
// })

const projectedProfitlossSchema = z.array(z.object({
    name: z.string(),
   
    data: z.object({
        FY1: z.number(),
        FY2: z.number(),
        FY3: z.number(),
        FY4: z.number(),
        FY5: z.number()
    })
}));



const parser = StructuredOutputParser.fromZodSchema(projectedProfitlossSchema)


const chain = RunnableSequence.from([
    PromptTemplate.fromTemplate(
        `You are an expert financial analyst. Your task is to analyze the provided input data and generate a JSON object with specific financial metrics for projected profit and loss. Ensure that the values are extracted accurately and formatted correctly. The JSON object should contain the following fields:
        Strict: You will generate this object inputData will not give this your task is to generate this it will not provide any data you will generate
        {{
            "name": "Subtotal_cost_of_revenue",
            "data": {{
                "FY1": (numeric value): Revenue for fiscal year 1,
                "FY2": (numeric value): Revenue for fiscal year 2,
                "FY3": (numeric value): Revenue for fiscal year 3,
                "FY4": (numeric value): Revenue for fiscal year 4,
                "FY5": (numeric value): Revenue for fiscal year 5
            }}
        }},
        {{
            "name": "total_cost_of_revenue",
            "data": {{
                "FY1": (numeric value): Revenue for fiscal year 1,
                "FY2": (numeric value): Revenue for fiscal year 2,
                "FY3": (numeric value): Revenue for fiscal year 3,
                "FY4": (numeric value): Revenue for fiscal year 4,
                "FY5": (numeric value): Revenue for fiscal year 5
            }}
        }},
        {{
            "name": "gross_margin",
            "data": {{
                "FY1": (numeric value): Revenue for fiscal year 1,
                "FY2": (numeric value): Revenue for fiscal year 2,
                "FY3": (numeric value): Revenue for fiscal year 3,
                "FY4": (numeric value): Revenue for fiscal year 4,
                "FY5": (numeric value): Revenue for fiscal year 5
            }}
        }},
        {{
            "name": "gross_Margin_Revenue",
            "data": {{
                "FY1": (numeric value): Revenue for fiscal year 1 - it will be a percentage value,
                "FY2": (numeric value): Revenue for fiscal year 2 - it will be a percentage value,
                "FY3": (numeric value): Revenue for fiscal year 3 - it will be a percentage value,
                "FY4": (numeric value): Revenue for fiscal year 4 - it will be a percentage value,
                "FY5": (numeric value): Revenue for fiscal year 5 - it will be a percentage value
            }}
        }},
        {{
            "name": "staff_salaries",
            "data": {{
                "FY1": (numeric value): Revenue for fiscal year 1,
                "FY2": (numeric value): Revenue for fiscal year 2,
                "FY3": (numeric value): Revenue for fiscal year 3,
                "FY4": (numeric value): Revenue for fiscal year 4,
                "FY5": (numeric value): Revenue for fiscal year 5
            }}
        }},
        {{
            "name": "office_rent",
            "data": {{
                "FY1": (numeric value): Revenue for fiscal year 1,
                "FY2": (numeric value): Revenue for fiscal year 2,
                "FY3": (numeric value): Revenue for fiscal year 3,
                "FY4": (numeric value): Revenue for fiscal year 4,
                "FY5": (numeric value): Revenue for fiscal year 5
            }}
        }},
        {{
            "name": "Utilities",
            "data": {{
                "FY1": (numeric value): Revenue for fiscal year 1,
                "FY2": (numeric value): Revenue for fiscal year 2,
                "FY3": (numeric value): Revenue for fiscal year 3,
                "FY4": (numeric value): Revenue for fiscal year 4,
                "FY5": (numeric value): Revenue for fiscal year 5
            }}
        }},
        {{
            "name": "software_and_hardware",
            "data": {{
                "FY1": (numeric value): Revenue for fiscal year 1,
                "FY2": (numeric value): Revenue for fiscal year 2,
                "FY3": (numeric value): Revenue for fiscal year 3,
                "FY4": (numeric value): Revenue for fiscal year 4,
                "FY5": (numeric value): Revenue for fiscal year 5
            }}
        }},
        {{
            "name": "marketing",
            "data": {{
                "FY1": (numeric value): Revenue for fiscal year 1,
                "FY2": (numeric value): Revenue for fiscal year 2,
                "FY3": (numeric value): Revenue for fiscal year 3,
                "FY4": (numeric value): Revenue for fiscal year 4,
                "FY5": (numeric value): Revenue for fiscal year 5
            }}
        }},
        {{
            "name": "miscellaneous",
            "data": {{
                "FY1": (numeric value): Revenue for fiscal year 1,
                "FY2": (numeric value): Revenue for fiscal year 2,
                "FY3": (numeric value): Revenue for fiscal year 3,
                "FY4": (numeric value): Revenue for fiscal year 4,
                "FY5": (numeric value): Revenue for fiscal year 5
            }}
        }},
        {{
            "name": "total_operating_Expenses",
            "data": {{
                "FY1": (numeric value): Revenue for fiscal year 1,
                "FY2": (numeric value): Revenue for fiscal year 2,
                "FY3": (numeric value): Revenue for fiscal year 3,
                "FY4": (numeric value): Revenue for fiscal year 4,
                "FY5": (numeric value): Revenue for fiscal year 5
            }}
        }},
        {{
            "name": "depreciation",
            "data": {{
                "FY1": (numeric value): Revenue for fiscal year 1,
                "FY2": (numeric value): Revenue for fiscal year 2,
                "FY3": (numeric value): Revenue for fiscal year 3,
                "FY4": (numeric value): Revenue for fiscal year 4,
                "FY5": (numeric value): Revenue for fiscal year 5
            }}
        }},
        {{
            "name": "amortization",
            "data": {{
                "FY1": (numeric value): Revenue for fiscal year 1,
                "FY2": (numeric value): Revenue for fiscal year 2,
                "FY3": (numeric value): Revenue for fiscal year 3,
                "FY4": (numeric value): Revenue for fiscal year 4,
                "FY5": (numeric value): Revenue for fiscal year 5
            }}
        }},
        {{
            "name": "interest_expense",
            "data": {{
                "FY1": (numeric value): Revenue for fiscal year 1,
                "FY2": (numeric value): Revenue for fiscal year 2,
                "FY3": (numeric value): Revenue for fiscal year 3,
                "FY4": (numeric value): Revenue for fiscal year 4,
                "FY5": (numeric value): Revenue for fiscal year 5
            }}
        }},
        {{
            "name": "net_income",
            "data": {{
                "FY1": (numeric value): Revenue for fiscal year 1,
                "FY2": (numeric value): Revenue for fiscal year 2,
                "FY3": (numeric value): Revenue for fiscal year 3,
                "FY4": (numeric value): Revenue for fiscal year 4,
                "FY5": (numeric value): Revenue for fiscal year 5
            }}
        }},
        {{
            "name": "net_income_revenue",
            "data": {{
                "FY1": (numeric value): Revenue for fiscal year 1,
                "FY2": (numeric value): Revenue for fiscal year 2,
                "FY3": (numeric value): Revenue for fiscal year 3,
                "FY4": (numeric value): Revenue for fiscal year 4,
                "FY5": (numeric value): Revenue for fiscal year 5
            }}
        }},
        {{
            "name": "ebitda",
            "data": {{
                "FY1": (numeric value): Revenue for fiscal year 1,
                "FY2": (numeric value): Revenue for fiscal year 2,
                "FY3": (numeric value): Revenue for fiscal year 3,
                "FY4": (numeric value): Revenue for fiscal year 4,
                "FY5": (numeric value): Revenue for fiscal year 5
            }}
        }}
        Ensure that the JSON object is well-formatted and all numeric values are accurate. Return the JSON object directly without any additional strings or delimiters. Try to analyze the whole value properly and fill all the fields from your knowledge.
        {{format_instructions}}
        {{input}}`
    ),
    chatModel,
    parser
])


export const generateProjectedProfitLossData = async (inputData:object) => {
    const response = await chain.invoke({
        input:JSON.stringify(inputData),
        format_instruction: parser.getFormatInstructions(),
    })
    return response
}
