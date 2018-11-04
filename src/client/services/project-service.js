import 'whatwg-fetch'
import { getResponseJson } from '../tools';

class ProjectService {
    getTemplateList() {
        const url = '/api/projects/templates';
        return fetch(url).then(getResponseJson);
    }

    createProject(templateName, projectName) {
        const url = '/api/projects';
        return fetch(url, {
            method: 'post',
            body: JSON.stringify({
                template: templateName,
                project: projectName
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(getResponseJson);
    }

    openProject(projectName) {
        const url = `/api/projects/${projectName}`;
        return fetch(url, {
            method: 'post'
        }).then(getResponseJson);
    }

    getProjectList() {
        const url = '/api/projects';
        return fetch(url).then(getResponseJson);
    }

    getPageList(projectName) {
        const url = `/api/projects/${projectName}/pages`;
        return fetch(url).then(getResponseJson);
    }

    getPageContent(projectName, pageName) {
        const url = `/api/projects/${projectName}/pages/${pageName}`;
        return fetch(url).then(getResponseJson);
    }

    savePageContent(projectName, pageName, content) {
        const url = `/api/projects/${projectName}/pages/${pageName}`;
        return fetch(url, {
            method: 'put',
            body: JSON.stringify({
                content: content
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(getResponseJson);
    }

    exportProject(projectName) {
        const url = `/api/projects/${projectName}/export`;
        return fetch(url).then(getResponseJson);
    }

    addPage(projectName, pageName, content) {
        const url = `/api/projects/${projectName}/pages/${pageName}`;
        return fetch(url, {
            method: 'post',
            body: JSON.stringify({
                content: content
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(getResponseJson);
    }

    deletePage(projectName, pageName) {
        const url = `/api/projects/${projectName}/pages/${pageName}`;
        return fetch(url, {
            method: 'delete'
        }).then(getResponseJson);
    }

    deleteProject(projectName) {
        const url = `/api/projects/${projectName}`;
        return fetch(url, {
            method: 'delete'
        }).then(getResponseJson);
    }

    importProject(projectForm) {
        const url = `/api/projects/import`;
        const formData = new FormData(projectForm);

        return fetch(url, {
            method: 'POST',
            body: formData
        }).then(getResponseJson);
    }
}

const projectService = new ProjectService();

export default projectService;
