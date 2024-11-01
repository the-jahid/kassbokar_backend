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
  model:'gpt-4o',
  temperature:0.7
});


const useOfFundsSchema = z.object({
  accounts_payable: z.number().describe("The amount of money owed by the company to its creditors."),
  capital_expenditures: z.number().describe("The funds used by the company to acquire, upgrade, and maintain physical assets."),
  cash: z.number().describe("The amount of cash available to the company."),
  current_borrowing: z.number().describe("The amount of money borrowed by the company that is due within a year."),
  initial_capital: z.number().describe("The initial amount of capital invested in the company."),
  investor: z.number().describe("The amount of money invested in the company by investors."),
  liabilities_capital: z.number().describe("The total amount of liabilities and capital."),
  long_term_liabilities: z.number().describe("The amount of money owed by the company that is due after a year."),
  other_current_liabilities: z.number().describe("Other liabilities that are due within a year."),
  total_liabilities: z.number().describe("The total amount of liabilities."),
  owner: z.number().describe("The amount of money invested in the company by the owner."),
  planned_investment: z.number().describe("The amount of money planned to be invested in the company."),
  total_planned_investment: z.number().describe("The total amount of planned investments."),
  total_startup_assets: z.number().describe("The total value of startup assets."),
  total_startup_expenses: z.number().describe("The total amount of startup expenses."),
  working_capital: z.number().describe("The amount of capital available for day-to-day operations.")
});


const parser = StructuredOutputParser.fromZodSchema(useOfFundsSchema);

const chain = RunnableSequence.from([
  PromptTemplate.fromTemplate(
    `You are an expert financial analyst. Your task is to analyze the provided input data and generate a JSON object with specific financial metrics. Ensure that the values are extracted accurately and formatted correctly. If any value is null, replace it with 0. The JSON object should contain the following fields:
    "accounts_payable": (numeric value): The amount of money owed by the company to its creditors.
    "capital_expenditures": (numeric value): The funds used by the company to acquire, upgrade, and maintain physical assets.
    "cash": (numeric value): The amount of cash available to the company.
    "current_borrowing": (numeric value): The amount of money borrowed by the company that is due within a year.
    "initial_capital": (numeric value): The initial amount of capital invested in the company.
    "investor": (numeric value): The amount of money invested in the company by investors.
    "liabilities_capital": (numeric value): The total amount of liabilities and capital.
    "long_term_liabilities": (numeric value): The amount of money owed by the company that is due after a year.
    "other_current_liabilities": (numeric value): Other liabilities that are due within a year.
    "total_liabilities": (numeric value): The total amount of liabilities.
    "owner": (numeric value): The amount of money invested in the company by the owner.
    "planned_investment": (numeric value): The amount of money planned to be invested in the company.
    "total_planned_investment": (numeric value): The total amount of planned investments.
    "total_startup_assets": (numeric value): The total value of startup assets.
    "total_startup_expenses": (numeric value): The total amount of startup expenses.
    "working_capital": (numeric value): The amount of capital available for day-to-day operations.
    Ensure that the JSON object is well-formatted and all numeric values are accurate. If any value is null, replace it with 0. Return the JSON object directly without any additional strings or delimiters. Try to analyze whole value properly and fill all the field from your knowledge.
    {format_instructions}
    {input}`
  ),
  chatModel,
  parser,
]);

export const generateUseofFundsdata = async (inputData: object) => {
  const response = await chain.invoke({
    input: JSON.stringify(inputData),
    format_instructions: parser.getFormatInstructions(),
  });

  return response;
};