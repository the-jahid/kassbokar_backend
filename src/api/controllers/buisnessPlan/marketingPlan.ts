import {Request, Response, NextFunction} from 'express'
import { createmarketingPlanService, deletemarketingPlanService, getmarketingPlanService, updatemarketingPlanService } from '../../services/buisnessPlan/marketingPlan';

export interface AuthenticatedRequest extends Request {
    user?: any;
  }

export const createMarketingPlancontroller = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {

    let {buisness_plan_id} = req?.params;
    const inputData = {...req.body}
    
    if (!buisness_plan_id || !inputData) {
        return res.status(400).json({ message: 'Business plan ID and input data are required' });
    }

    if(buisness_plan_id.startsWith(':')) {
        buisness_plan_id = buisness_plan_id.replace(':', '')
    }

    try {  
        const MarketingPlan = await createmarketingPlanService(buisness_plan_id, inputData);
        return res.status(200).json({message:'Successfully created marketing plan', data:MarketingPlan })
    } catch (error) {
        next(error)
    }
}

export const getMarketingPlancontroller = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {

        let {buisness_plan_id} = req?.params;

        if(!buisness_plan_id) {
            return res.status(400).json({message:'user does not get buisness plan id'})
        }

        if(buisness_plan_id.startsWith(':')) {
            buisness_plan_id = buisness_plan_id.replace(':', '')
        }

        try {    
            const MarketingPlan = await getmarketingPlanService(buisness_plan_id)

            return res.status(200).json({message:'Successfully get marketing plan', data:MarketingPlan})
        } catch (error) {
            next(error)
        }
    }

export const updateMarketingPlancontroller = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {

    let {  marketing_plan_id } = req.params;
    
    if(!marketing_plan_id) {
        return res.status(400).json({message:'Strategy implementation id is required'})
    }

    if (marketing_plan_id.startsWith(':')) {
        marketing_plan_id = marketing_plan_id.replace(':', '');
    }

    const {
        content_marketing_seo,
        educationl_webinar_workshop,
        influencer_marketing,
        localized_digital_marketing_campaigns,
        strategic_partnership_buisness_incubators,
      } = req.body;
    
    try {

        const MarketingPlan = await updatemarketingPlanService(content_marketing_seo, educationl_webinar_workshop, influencer_marketing, localized_digital_marketing_campaigns, strategic_partnership_buisness_incubators, marketing_plan_id)

        return res.status(200).json({message:'Successfully updated marketing plan', data:MarketingPlan })
    } catch (error) {
        next(error)
    }
}


export const deleteMarketingPlancontroller = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {
    
    let {marketing_plan_id} = req.params;
    
    if(!marketing_plan_id) {
        return res.status(400).json({message:'marketing plan id is required'})
    }
    
      if (marketing_plan_id.startsWith(':')) {
        marketing_plan_id = marketing_plan_id.replace(':', '');
      }

    try {
        const MarketingPlan = await deletemarketingPlanService(marketing_plan_id);

        return res.status(200).json({
            message: 'Marketing plan deleted successfully',
            data: MarketingPlan,
          });
        
    } catch (error) {
        next (error)
    }
} 









