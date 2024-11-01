
import { OpenAI, ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts"
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const chatModel = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model:'gpt-4o'
  });

const generateIndustryDescription = async (inputData:object) => {


    const prompt = ChatPromptTemplate.fromMessages([
        ["system", "You are a world-class business consultant with extensive expertise in identifying and articulating business challenges. Based on the following input, create a detailed, compelling, and concise Industry Overview Industry Description that is no more than 500 characters"],
        ["user", "{input}"],
      ]);

      const chain = prompt.pipe(chatModel)

      const value = await chain.invoke({
        input: JSON.stringify(inputData)
      })

     

     return value.content 
}

const generateMarketNeeds = async (inputData:object) => {
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a world-class business consultant with extensive expertise in identifying and articulating business challenges. Based on the following input, create a detailed, compelling, and concise Industry Overview Market Needs  that is no more than 500 characters"],
    ["user", "{input}"],
  ]);

  const chain = prompt.pipe(chatModel)

  const value = await chain.invoke({
    input: JSON.stringify(inputData)
  })

 

 return value.content 
}

const generateMarketTrends = async (inputData:object) => {
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a world-class business consultant with extensive expertise in identifying and articulating business challenges. Based on the following input, create a detailed, compelling, and concise Industry Overview  Market Trends  that is no more than 1000 characters"],
    ["user", "{input}"],
  ]);

  const chain = prompt.pipe(chatModel)

  const value = await chain.invoke({
    input: JSON.stringify(inputData)
  })

 

 return value.content 
}

const generateMarketSegmentation = async (inputData:object) => {
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a world-class business consultant with extensive expertise in identifying and articulating business challenges. Based on the following input, create a detailed, compelling, and concise Industry Overview  Market Segmentation  that is no more than 1000 characters"],
    ["user", "{input}"],
  ]);

  const chain = prompt.pipe(chatModel)

  const value = await chain.invoke({
    input: JSON.stringify(inputData)
  })

 

 return value.content 
}



 


    


export {
    generateIndustryDescription,
   generateMarketSegmentation,
   generateMarketTrends,
   generateMarketNeeds
}

