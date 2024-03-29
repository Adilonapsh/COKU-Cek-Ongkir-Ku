import { Request, Response, Router } from 'express';
import { cekOngkirRoute } from '../cekongkir/cekongkir.controller';

export const router : Router = Router();


router.get('/', (req: Request, res: Response) => {
    res.send('Apaan Ini Gan ??');
})
router.get('/api', (req: Request, res: Response) => {
    res.send('Welcome to my api!');
})

router.use('/api/cek-ongkir',cekOngkirRoute)