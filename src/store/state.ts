import Settings from '@/settings';
import User from '@/store/types/User';
import TagsView from '@/store/types/TagsView';
import Permission from '@/store/types/Permission';
import App from '@/store/types/App';

export default class State {
    public user!: User;
    public settings = new Settings();
    public tagsView = new TagsView();
    public permission = new Permission();
    public app = new App();
}
