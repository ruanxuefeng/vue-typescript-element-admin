import Settings from '@/settings';
import User from '@/store/modules/User';
import TagsView from '@/store/modules/TagsView';
import App from '@/store/modules/App';

export default class State {
    public user!: User;
    public settings !: Settings;
    public tagsView !: TagsView;
    public app!: App;
}
