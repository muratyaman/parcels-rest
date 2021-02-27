import { Request, Response } from 'express';

export function getHealthCheck(req: Request, res: Response) {
  res.json({
    data: {
      ts: new Date(),
    },
  });
}
