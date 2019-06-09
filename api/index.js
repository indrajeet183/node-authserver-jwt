import express from 'express';
import User from './user';
import SignUp from './signup';
import Login from './login';
import Leaves from './leaves/leaves';
import Modules from './modules/modules';
import ModuleActions from './moduleactions/moduleactions';
import Roles from './roles/roles';
import RoleActions from './roleactions/roleactions';
import Timesheet from './timesheet/timesheet';
import Projects from './projects/projects';
import Attendance from './attendance/attendance';


const router = express.Router();
router.use('/users',User)
router.use('/auth',SignUp)
router.use('/login',Login)
router.use('/leaves',Leaves)
router.use('/modules',Modules)
router.use('/roles',Roles)
router.use('/roleactions',RoleActions)
router.use('/moduleactions',ModuleActions)
router.use('/timesheet',Timesheet)
router.use('/projects',Projects);
router.use('/attendance',Attendance);

export default router