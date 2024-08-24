import { httpService } from "."

export const authenticateUser = async () => {
    return await httpService.request('POST', 'users/auth');
}