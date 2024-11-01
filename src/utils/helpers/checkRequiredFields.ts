const checkRequiredFields = (fields: { [key: string]: any }, res: any) => {
    for (const [key, value] of Object.entries(fields)) {
        if (!value) {
            return res.status(400).json({ message: `Missing required field: ${key}` });
        }
    }
};

export default checkRequiredFields