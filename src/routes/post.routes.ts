import { Router } from 'express';
import { PostController } from '../controllers/post.controller';

const router = Router();

/**
 * RESTful API Routes for Posts
 * GET    /api/posts          - List all
 * GET    /api/posts/:id      - Get one
 * POST   /api/posts          - Create
 * PUT    /api/posts/:id      - Update
 * DELETE /api/posts/:id      - Delete
 */
router.get('/', PostController.list);
router.get('/:id', PostController.getOne);
router.post('/', PostController.create);
router.put('/:id', PostController.update);
router.delete('/:id', PostController.remove);

export default router;
