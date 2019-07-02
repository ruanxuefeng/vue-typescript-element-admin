import Settings from '@/settings';
import User from '@/store/types/User';
import TagsView from '@/store/types/TagsView';
import App from '@/store/types/App';

export default class State {
    public user!: User;
    public settings = new Settings();
    public tagsView = new TagsView();
    public app = new App();
}
