import { observable, action } from 'mobx';

export default class RootStore {
    constructor(sessionStore) {
        this.sessionStore = sessionStore;
    }
    
    @observable isBusy = false;
    @observable showPageList = true;
    @observable currentProjectUrl = '';
    @observable isCreateProjectDialogOpen = false;
    @observable isOpenProjectDialogOpen = false;
    @observable isAddPageDialogOpen = false;
    @observable isDeletePageDialogOpen = false;
    @observable isDeleteProjectDialogOpen = false;
    @observable isImportProjectDialogOpen = false;

    @action
    setBusy(busy) {
        this.isBusy = busy;
    }

    @action
    togglePageList() {
        this.showPageList = !this.showPageList;
    }

    @action
    setCurrentProjectUrl(url) {
        this.currentProjectUrl = url;
    }

    @action
    setCreateProjectDialogOpen(open) {
        this.isCreateProjectDialogOpen = open;
    }

    @action
    setOpenProjectDialogOpen(open) {
        this.isOpenProjectDialogOpen = open;
    }

    @action
    setAddPageDialogOpen(open) {
        this.isAddPageDialogOpen = open;
    }

    @action
    setDeletePageDialogOpen(open) {
        this.isDeletePageDialogOpen = open;
    }

    @action
    setDeleteProjectDialogOpen(open) {
        this.isDeleteProjectDialogOpen = open;
    }

    @action
    setImportProjectDialogOpen(open) {
        this.isImportProjectDialogOpen = open;
    }
}
