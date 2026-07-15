import { Router } from 'express';
import { requireAuth } from '../../middleware/requireAuth';
import { requireAdmin } from '../../middleware/requireAdmin';
import * as teamController from './team.controller';

export const teamRouter = Router();

// Public
teamRouter.get('/', teamController.listTeamMembers);

// Admin
teamRouter.post('/seed', requireAuth, requireAdmin, teamController.seedTeamMembers);
teamRouter.post('/', requireAuth, requireAdmin, teamController.createTeamMember);
teamRouter.patch('/:id', requireAuth, requireAdmin, teamController.updateTeamMember);
teamRouter.delete('/:id', requireAuth, requireAdmin, teamController.deleteTeamMember);

export default teamRouter;
