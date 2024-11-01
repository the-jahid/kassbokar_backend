
import {  ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts"
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const chatModel = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model:'gpt-4o'
  });

const generateOverView = async (inputData:object) => {


    const prompt = ChatPromptTemplate.fromMessages([
        ["system", "You are a world-class business consultant with extensive expertise in identifying and articulating business challenges. Based on the following input, create a detailed, compelling, and concise company description overview that is no more than 1000 characters"],
        ["user", "{input}"],
      ]);

      const chain = prompt.pipe(chatModel)

      const value = await chain.invoke({
        input: JSON.stringify(inputData)
      })


     return value.content 
}

const generateProducts = async (inputData:object) => {
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a world-class business consultant with extensive expertise in identifying and articulating business challenges. Based on the following input, create a detailed, compelling, and concise company description products/service that is no more than 1000 characters"],
    ["user", "{input}"],
  ]);

  const chain = prompt.pipe(chatModel)

  const value = await chain.invoke({
    input: JSON.stringify(inputData)
  })

 

 return value.content 
}

const generateMission = async (inputData:object) => {
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a world-class business consultant with extensive expertise in identifying and articulating business challenges. Based on the following input, create a detailed, compelling, and concise company description mission that is no more than 1000 characters"],
    ["user", "{input}"],
  ]);

  const chain = prompt.pipe(chatModel)

  const value = await chain.invoke({
    input: JSON.stringify(inputData)
  })

 

 return value.content 
}

const generateVision = async (inputData:object) => {
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a world-class business consultant with extensive expertise in identifying and articulating business challenges. Based on the following input, create a detailed, compelling, and concise company description Vision that is no more than 1000 characters"],
    ["user", "{input}"],
  ]);

  const chain = prompt.pipe(chatModel)

  const value = await chain.invoke({
    input: JSON.stringify(inputData)
  })

 

 return value.content 
}

const generateValues = async (inputData:object) => {
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a world-class business consultant with extensive expertise in identifying and articulating business challenges. Based on the following input, create a detailed, compelling, and concise company description values that is no more than 1000 characters"],
    ["user", "{input}"],
  ]);

  const chain = prompt.pipe(chatModel)

  const value = await chain.invoke({
    input: JSON.stringify(inputData)
  })

 

 return value.content 
    
}

export {
    generateOverView,
    generateProducts,
    generateMission,
    generateVision,
    generateValues
}

