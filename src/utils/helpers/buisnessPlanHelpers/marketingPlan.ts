import { OpenAI, ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts"
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const chatModel = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model:'gpt-4o'
  });

const generateContentMarketingSEO = async (inputData:object) => {
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", "You are a world-class business consultant with extensive expertise in identifying and articulating business challenges. Based on the following input, create a detailed, compelling, and concise marketing plan ContentMarketingSEO that is no more than 500 characters"],
      ["user", "{input}"],
    ]);
    
    const chain = prompt.pipe(chatModel);
    
    const value = await chain.invoke({
      input: JSON.stringify(inputData)
    })
  
   
  
   return value.content 
      
  }
  
  const generateEducationalWebinarWorkshop = async (inputData:object) => {
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", "You are a world-class business consultant with extensive expertise in identifying and articulating business challenges. Based on the following input, create a detailed, compelling, and concise marketing plan Educational Webinar Workshop that is no more than 500 characters"],
      ["user", "{input}"],
    ]);
    
    const chain = prompt.pipe(chatModel);
    
    const value = await chain.invoke({
      input: JSON.stringify(inputData)
    })
  
   
  
   return value.content 
      
  }

  const generateInfluencerMarketing = async (inputData:object) => {
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", "You are a world-class business consultant with extensive expertise in identifying and articulating business challenges. Based on the following input, create a detailed, compelling, and concise marketing plan Influencer Marketing that is no more than 500 characters"],
      ["user", "{input}"],
    ]);
    
    const chain = prompt.pipe(chatModel);
    
    const value = await chain.invoke({
      input: JSON.stringify(inputData)
    })
  
   
  
   return value.content 
      
  }

  const generateLocalizedDigitalMarketingCampaigns = async (inputData:object) => {
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", "You are a world-class business consultant with extensive expertise in identifying and articulating business challenges. Based on the following input, create a detailed, compelling, and concise marketing plan Localized DigitalMarketing Campaigns that is no more than 500 characters"],
      ["user", "{input}"],
    ]);
    
    const chain = prompt.pipe(chatModel);
    
    const value = await chain.invoke({
      input: JSON.stringify(inputData)
    })
  
   
  
   return value.content 
      
  }

  const generateStrategicPartnershipBuisnessIncubators = async (inputData:object) => {
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", "You are a world-class business consultant with extensive expertise in identifying and articulating business challenges. Based on the following input, create a detailed, compelling, and concise marketing plan Strategic PartnershipBuisness Incubators that is no more than 500 characters"],
      ["user", "{input}"],
    ]);
    
    const chain = prompt.pipe(chatModel);
    
    const value = await chain.invoke({
      input: JSON.stringify(inputData)
    })
  
   
  
   return value.content 
      
  }

  export {
    generateContentMarketingSEO,
    generateEducationalWebinarWorkshop,
    generateInfluencerMarketing,
    generateLocalizedDigitalMarketingCampaigns,
    generateStrategicPartnershipBuisnessIncubators
  }