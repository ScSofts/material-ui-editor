import RootStore from './root.store';
import ProjectStore from './project.store';

export default class SessionStore {
    constructor() {
        this.rootStore = new RootStore(this);
        this.projectStore = new ProjectStore(this.rootStore);
    }
}
