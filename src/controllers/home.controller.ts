import { Request, Response } from 'express';
import { prisma } from '../db';

export class HomeController {
    static async index(req: Request, res: Response) {
        const userCount = await prisma.user.count();
        const postCount = await prisma.post.count();
        const productCount = await prisma.product.count();

        res.render('index', {
            title: 'Graphile Core Dashboard',
            stats: {
                users: userCount,
                posts: postCount,
                products: productCount
            }
        });
    }

    static async postsPage(req: Request, res: Response) {
        const posts = await prisma.post.findMany({
            take: 10,
            include: { author: true }
        });
        res.render('posts', { title: 'Recent Posts', posts });
    }
}
