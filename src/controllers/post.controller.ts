import { Request, Response } from 'express';
import { PostService } from '../services/post.service';

/**
 * PostController - Handles HTTP requests and responses.
 * It calls the service layer and returns the appropriate data/status.
 */
export class PostController {
    static async list(req: Request, res: Response) {
        try {
            const skip = Number(req.query.skip) || 0;
            const take = Number(req.query.take) || 20;
            const search = req.query.search as string;

            const posts = await PostService.getAllPosts({ skip, take, search });
            res.json(posts);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getOne(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const post = await PostService.getPostById(id);
            if (!post) return res.status(404).json({ error: 'Post not found' });
            res.json(post);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const post = await PostService.createPost(req.body);
            res.status(201).json(post);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const post = await PostService.updatePost(id, req.body);
            res.json(post);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async remove(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await PostService.deletePost(id);
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
