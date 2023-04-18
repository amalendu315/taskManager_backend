import { Request, Response, NextFunction } from "express";
import * as service from "./auth_service";

const login = async(req: Request, res: Response, next: NextFunction) => {
    try {
        
        const { db } = req.app.locals;
        const result = await service.login(db, req.body);
        res.status(200).json({
            user: result.user,
            token: result.token
        });

    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
};

const register = async(req: Request, res: Response, next: NextFunction) => {
    try {
        
        const { db } = req.app.locals;
        const result = await service.register(db, req.body);
        res.status(200).json({
            user: result.user,
            token: result.token
        });

    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
};

export { login, register };
