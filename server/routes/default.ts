import * as express from 'express';
import * as path from 'path';

export function configureDefaultRoute(app: express.Application): void {
    app.get('*', (req: express.Request, res: express.Response) => {
        return res.sendFile(path.resolve(__dirname + './../public/index.html'));
    });
}