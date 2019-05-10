import Settings from '@/settings';
import User from '@/store/types/User';
import TagsView from '@/store/types/TagsView';
import App from '@/store/types/App';

export default class State {
    public user: User = new User();
    public settings: Settings = new Settings();
    public tagsView: TagsView = new TagsView();
    public app: App = new App();
}
