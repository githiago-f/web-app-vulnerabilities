import { Router } from "express";

const router = Router();

/**
 * @allowed_roles admin
 * @access any
 */
router.get('/', () => {});

/**
 * @allowed_roles user, admin
 * @access is_own
 */
router.get('/:id', () => {});

export default router;