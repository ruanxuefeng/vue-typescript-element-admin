import Settings from '@/settings';

const setting = new Settings();
const title = setting.title;

export default function getPageTitle(pageTitle: string) {
    if (pageTitle) {
        return `${pageTitle} - ${title}`;
    }
    return `${title}`;
}
