import {Request, Response, NextFunction} from 'express'

import { createindustryOverviewService, deleteindustryOverviewService, getindustryOverviewService, updateindustryOverviewService } from '../../services/buisnessPlan/industryOverview';


export interface AuthenticatedRequest extends Request {
    user?: any;
  }
  export const createIndustryOverviewcontroller = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    let { buisness_plan_id } = req?.params;
    const inputData = { ...req.body };

    if (!buisness_plan_id || !inputData) {
        return res.status(400).json({ message: 'Business plan ID and input data are required' });
    }

    if (buisness_plan_id.startsWith(':')) {
        buisness_plan_id = buisness_plan_id.replace(':', '');
    }

    try {
        const IndustryOverview = await createindustryOverviewService(buisness_plan_id, inputData);
        return res.status(200).json({ message: 'Industry overview created successfully', data: IndustryOverview });
    } catch (error) {
        next(error);
    }
};

export const getIndustryOverviewcontroller = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    let { buisness_plan_id } = req?.user;

    if (!buisness_plan_id) {
        return res.status(400).json({ message: 'Business plan ID is missing' });
    }

    if (buisness_plan_id.startsWith(':')) {
        buisness_plan_id = buisness_plan_id.replace(':', '');
    }

    try {
        const IndustryOverview = await getindustryOverviewService(buisness_plan_id);
        return res.status(200).json({ message: 'Industry overview retrieved successfully', data: IndustryOverview });
    } catch (error) {
        next(error);
    }
};

export const updateIndustryOverviewcontroller = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    let { industry_overview_id } = req?.params;

    if (!industry_overview_id) {
        return res.status(400).json({ message: 'Industry overview ID is required' });
    }

    if (industry_overview_id.startsWith(':')) {
        industry_overview_id = industry_overview_id.replace(':', '');
    }

    const {
        industry_description,
        market_needs,
        market_trends,
        market_segmentation,
    } = req.body;

    try {
        const IndustryOverview = await updateindustryOverviewService(
            industry_description,
            market_needs,
            market_trends,
            market_segmentation,
            industry_overview_id
        );

        return res.status(200).json({ message: 'Industry overview updated successfully', data: IndustryOverview });
    } catch (error) {
        next(error);
    }
};


export const deleteIndustryOverviewController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    
    let { industry_overview_id } = req?.params;
    
    if (!industry_overview_id) {
        return res.status(400).json({ message: 'Industry overview ID is required' });
    }
    
    if (industry_overview_id.startsWith(':')) {
        industry_overview_id = industry_overview_id.replace(':', '');
    }
    
    try {
        const industryOverview = await deleteindustryOverviewService(industry_overview_id);

        return res.status(200).json({
            message: 'Industry overview removed successfully',
            data: industryOverview,
        });
        
    } catch (error) {
        next(error);
    }
};
