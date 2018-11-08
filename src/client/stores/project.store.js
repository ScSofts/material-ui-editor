import { observable, action, runInAction } from 'mobx';

import { CreateProjectStep } from '../enums';
import projectService from '../services/project-service';

export default class ProjectStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable templateList = [];
    @observable getTemplateListError;
    @observable projectList = [];
    @observable getProjectListError;
    @observable pageList = [];
    @observable getPageListError;
    @observable createProjectStep = CreateProjectStep.SelectTemplate;
    @observable tempTemplateName = null;
    @observable tempProjectName = null;
    @observable templateName = null;
    @observable projectName = null;
    @observable selectedPage = null;
    @observable tempPageName = null;
    @observable currentProjectResult = null;
    @observable createProjectError = null;
    @observable openProjectError = null;
    @observable currentPageContent = '';
    @observable getPageContentError = null;
    @observable savePageContentResult = null;
    @observable savePageContentError = null;
    @observable deletePageResult = null;
    @observable deletePageError = null;
    @observable addPageResult = null;
    @observable addPageError = null;
    @observable deleteProjectResult = null;
    @observable deleteProjectError = null;
    @observable importProjectFile = null;
    @observable importProjectForm = null;
    @observable importProjectResult = null;
    @observable importProjectError = null;

    @action
    getTemplateList = () => {
        projectService.getTemplateList().then(response =>{
            runInAction(() =>{
                this.templateList = response;
            });
        }).catch(error => {
            this.getTemplateListError = error;
        });
    }

    @action
    getProjectList = () => {
        projectService.getProjectList().then(response =>{
            runInAction(() =>{
                this.projectList = response;
            });
        }).catch(error => {
            this.getProjectListError = error;
        });
    }

    @action
    getPageList = (projectName) => {
        projectService.getPageList(projectName).then(response =>{
            runInAction(() =>{
                this.pageList = response;
            });
        }).catch(error => {
            this.getPageListError = error;
        });
    }

    @action 
    createProject = (templateName, projectName) => {
        this.rootStore.setBusy(true);

        projectService.createProject(templateName, projectName).then(response =>{
            runInAction(() =>{
                this.currentProjectResult = response;
            });

            this.setSelectedPage(null);
            this.clearCurrentPageContent();
            this.getProjectList();
            this.getPageList(this.projectName);
        }).catch(error => {
            this.createProjectError = error;
        }).finally(() => {
            this.rootStore.setBusy(false);
        });
    }

    @action 
    openProject = (projectName) => {
        this.rootStore.setBusy(true);

        projectService.openProject(projectName).then(response =>{
            runInAction(() =>{
                this.currentProjectResult = response;
            });

            this.setSelectedPage(null);
            this.clearCurrentPageContent();
            this.getPageList(this.projectName);
        }).catch(error => {
            this.openProjectError = error;
        }).finally(() => {
            this.rootStore.setBusy(false);
        });
    }

    @action
    setCreateProjectStep = (step) => {
        this.createProjectStep = step;
    }

    @action
    setTempTemplateName = (template) => {
        this.tempTemplateName = template;
    }

    @action
    setTemplateName = (template) => {
        this.templateName = template;
    }

    @action
    setTempProjectName = (name) => {
        this.tempProjectName = name;
    }

    @action
    setProjectName = (project) => {
        this.projectName = project;
    }

    @action
    setSelectedPage = (page) => {
        this.selectedPage = page;
    }

    @action
    setTempPageName = (name) => {
        this.tempPageName = name;
    }
    
    @action
    getPageContent = (projectName, pageName) => {
        projectService.getPageContent(projectName, pageName).then(response => {
            runInAction(() =>{
                this.currentPageContent = response;
            });
        }).catch(error => {
            this.getPageContentError = error;
        });
    }

    @action
    savePageContent = (projectName, pageName, content) => {
        projectService.savePageContent(projectName, pageName, content).then(response => {
            runInAction(() =>{
                this.savePageContentResult = response;
            });
        }).catch(error => {
            this.savePageContentError = error;
        });
    }

    @action
    clearCurrentPageContent = () => {
        this.currentPageContent = '';
    }

    @action
    clearPageList = () => {
        this.pageList = [];
    }

    @action
    addPage = (projectName, pageName, content) => {
        projectService.addPage(projectName, pageName, content).then(response => {
            runInAction(() =>{
                this.addPageResult = response;
            });

            this.getPageList(projectName);
            this.setSelectedPage(pageName);
        }).catch(error => {
            this.addPageError = error;
        });
    }

    @action
    deletePage = (projectName, pageName) => {
        projectService.deletePage(projectName, pageName).then(response => {
            runInAction(() =>{
                this.deletePageResult = response;
            });

            this.setSelectedPage(null);
            this.clearCurrentPageContent();
            this.getPageList(projectName);
        }).catch(error => {
            this.deletePageError = error;
        });
    }

    @action
    deleteProject = (projectName) => {
        projectService.deleteProject(projectName).then(response => {
            runInAction(() =>{
                this.deleteProjectResult = response;
            });

            this.clearCurrentProject();
            this.getProjectList();
        }).catch(error => {
            this.deleteProjectError = error;
        });
    }

    @action
    clearCurrentProject = () => {
        this.currentProjectResult = null;
        this.setProjectName(null)
        this.setSelectedPage(null);
        this.clearCurrentPageContent();
        this.clearPageList();
    }

    @action
    setImportProjectFile = (file) => {
        this.importProjectFile = file;
    }

    @action
    setImportProjectForm = (form) => {
        this.importProjectForm = form;
    }

    @action
    importProject = (projectForm) => {
        projectService.importProject(projectForm).then(response => {
            runInAction(() =>{
                this.importProjectResult = response;
            });

            this.getProjectList();
        }).catch(error => {
            this.importProjectError = error;
        });
    }
}
