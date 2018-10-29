const express = require('express');
const router = express.Router();

var projectService = require('../services/project-service');

/* GET project list. */
router.get('/', function(req, res) {
    projectService.getProjectList(projectList => {
        res.json(projectList);
    });
});

/* POST create project. */
router.post('/', function(req, res) {
    const templateName = req.body.template;
    const projectName = req.body.project;

    projectService.createProject(templateName, projectName, result => {
        res.json(result);
    });
});

/* POST open project. */
router.post('/:projectName', function(req, res) {
    const projectName = req.params.projectName;

    projectService.openProject(projectName, result => {
        res.json(result);
    });
});

/* GET template list. */
router.get('/templates', function(req, res) {
    projectService.getTemplateList(templateList => {
        res.json(templateList);
    });
});

/* GET page list. */
router.get('/:projectName/pages', function(req, res) {
    const projectName = req.params.projectName;
    projectService.getPageList(projectName, pageList => {
        res.json(pageList);
    });
});

/* GET page content. */
router.get('/:projectName/pages/:pageName', function(req, res) {
    const projectName = req.params.projectName;
    const pageName = req.params.pageName;
    projectService.getPageContent(projectName, pageName, pageContent => {
        res.json(pageContent);
    });
});

/* PUT page content. */
router.put('/:projectName/pages/:pageName', function(req, res) {
    const projectName = req.params.projectName;
    const pageName = req.params.pageName;
    const content = req.body.content;
    projectService.savePageContent(projectName, pageName, content, result => {
        res.json(result);
    });
});

/* POST add page. */
router.post('/:projectName/pages/:pageName', function(req, res) {
    const projectName = req.params.projectName;
    const pageName = req.params.pageName;
    const content = req.body.content;
    projectService.addPage(projectName, pageName, content, result => {
        res.json(result);
    });
});

/* POST delete page. */
router.delete('/:projectName/pages/:pageName', function(req, res) {
    const projectName = req.params.projectName;
    const pageName = req.params.pageName;
    projectService.deletePage(projectName, pageName, result => {
        res.json(result);
    });
});


/* GET export project. */
router.get('/:projectName/export', function(req, res){
    const projectName = req.params.projectName;

    projectService.exportProject(projectName, result => {
        res.download(result);
    });
});

module.exports = router;
