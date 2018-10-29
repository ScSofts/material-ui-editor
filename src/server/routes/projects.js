const express = require('express');
const router = express.Router();

var projectService = require('../services/project-service');

/* GET project list. */
router.get('/', function(req, res, next) {
    projectService.getProjectList((error, result) => {
        if(error) {
            next(error);
        }
        else {
            res.json(result);
        }
    });
});

/* POST create project. */
router.post('/', function(req, res, next) {
    const templateName = req.body.template;
    const projectName = req.body.project;

    projectService.createProject(templateName, projectName, (error, result) => {
        if(error) {
            next(error);
        }
        else {
            res.json(result);
        }
    });
});

/* POST open project. */
router.post('/:projectName', function(req, res, next) {
    const projectName = req.params.projectName;

    projectService.openProject(projectName, (error, result) => {
        if(error) {
            next(error);
        }
        else {
            res.json(result);
        }
    });
});

/* GET template list. */
router.get('/templates', (req, res, next) => {
    projectService.getTemplateList((error, result) => {
        if(error) {
            next(error);
        }
        else {
            res.json(result);
        }
    });
});

/* GET page list. */
router.get('/:projectName/pages', function(req, res, next) {
    const projectName = req.params.projectName;
    projectService.getPageList(projectName, (error, result) => {
        if(error) {
            next(error);
        }
        else {
            res.json(result);
        }
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
