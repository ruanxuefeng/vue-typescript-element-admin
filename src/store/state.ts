import {User} from './types';
import Settings from '@/settings';

export default class State {
    public user!: User;
    public settings: Settings = new Settings();
}
