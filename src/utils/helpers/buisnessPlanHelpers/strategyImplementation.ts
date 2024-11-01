
import { OpenAI, ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts"
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const chatModel = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model:'gpt-4o'
  });

const generateManageMentTeam = async (inputData:object) => {


    const prompt = ChatPromptTemplate.fromMessages([
        ["system", "You are a world-class business consultant with extensive expertise in identifying and articulating business challenges. Based on the following input, create a detailed, compelling, and concise strategy Implementation management team that is no more than 500 characters"],
        ["user", "{input}"],
      ]);

      const chain = prompt.pipe(chatModel)

      const value = await chain.invoke({
        input: JSON.stringify(inputData)
      })

     

     return value.content 
}

const generateSwotAnalysis = async (inputData:object) => {
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a world-class business consultant with extensive expertise in identifying and articulating business challenges. Based on the following input, create a detailed, compelling, and concise strategy Implementation swot analysis that is no more than 500 characters"],
    ["user", "{input}"],
  ]);

  const chain = prompt.pipe(chatModel)

  const value = await chain.invoke({
    input: JSON.stringify(inputData)
  })

 

 return value.content 
}

const generatePestleAnalysis = async (inputData:object) => {
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a world-class business consultant with extensive expertise in identifying and articulating business challenges. Based on the following input, create a detailed, compelling, and concise strategy Implementation pestle analysis that is no more than 1000 characters"],
    ["user", "{input}"],
  ]);

  const chain = prompt.pipe(chatModel)

  const value = await chain.invoke({
    input: JSON.stringify(inputData)
  })

 

 return value.content 
}



export {
  generateManageMentTeam,
  generateSwotAnalysis,
  generatePestleAnalysis
}

