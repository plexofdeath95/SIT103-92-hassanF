import express from 'express';
const router = express.Router();

import createUser from './create';
import userFunctions from './read';
import updateUser from './update';
import deleteUser from './delete';

router.post('/', createUser);
router.get('/allUsers', (req, res) => {
    userFunctions.readAllUsers(req, res);
  });
router.get('/:id', userFunctions.readUser); // This comes after the static route
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
