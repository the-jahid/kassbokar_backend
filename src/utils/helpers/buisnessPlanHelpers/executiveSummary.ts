
import { OpenAI, ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts"
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const chatModel = new ChatOpenAI({
    apiKey:process.env.OPENAI_API_KEY,
    model:'gpt-4o'
  });

const generateProblemStateMent = async (inputData:object) => {


    const prompt = ChatPromptTemplate.fromMessages([
        ["system", "You are a world-class business consultant with extensive expertise in identifying and articulating business challenges. Based on the following input, create a detailed, compelling, and concise problem statement that is no more than 500 characters"],
        ["user", "{input}"],
      ]);

      const chain = prompt.pipe(chatModel)

      const value = await chain.invoke({
        input: JSON.stringify(inputData)
      })

     

     return value.content 
}

const generateValueProposition = async (inputData:object) => {
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a world-class business consultant with extensive expertise in identifying and articulating business challenges. Based on the following input, create a detailed, compelling, and concise value proposition that is no more than 500 characters"],
    ["user", "{input}"],
  ]);

  const chain = prompt.pipe(chatModel)

  const value = await chain.invoke({
    input: JSON.stringify(inputData)
  })

 

 return value.content 
}

const generateThreeYearsObjective = async (inputData:object) => {
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a world-class business consultant with extensive expertise in identifying and articulating business challenges. Based on the following input, create a detailed, compelling, and concise three years objective that is no more than 1000 characters"],
    ["user", "{input}"],
  ]);

  const chain = prompt.pipe(chatModel)

  const value = await chain.invoke({
    input: JSON.stringify(inputData)
  })

 

 return value.content 
}

const generateKeysToSuccess = async (inputData:object) => {
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a world-class business consultant with extensive expertise in identifying and articulating business challenges. Based on the following input, create a detailed, compelling, and concise  keys to success that is no more than 1000 characters"],
    ["user", "{input}"],
  ]);

  const chain = prompt.pipe(chatModel)

  const value = await chain.invoke({
    input: JSON.stringify(inputData)
  })

 

 return value.content 
}

const generateProposedSolution = async (inputData:object) => {
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a world-class business consultant with extensive expertise in identifying and articulating business challenges. Based on the following input, create a detailed, compelling, and concise proposed solution that is no more than 500 characters"],
    ["user", "{input}"],
  ]);

  const chain = prompt.pipe(chatModel)

  const value = await chain.invoke({
    input: JSON.stringify(inputData)
  })

 

 return value.content 
    
}

export {
    generateProblemStateMent,
    generateKeysToSuccess,
    generateProposedSolution,
    generateThreeYearsObjective,
    generateValueProposition
}

