const express = require('express');
const router = express.Router();

const multer  = require('multer');
const upload = multer({dest: './import'});

const projectService = require('../services/project-service');

/* GET project list. */
router.get('/', (req, res, next) => {
    projectService.getProjectList((err, result) => {
        if(err) {
            next(err);
        }
        else {
            res.json(result);
        }
    });
});

/* POST create project. */
router.post('/', (req, res, next) => {
    const templateName = req.body.template;
    const projectName = req.body.project;

    projectService.createProject(templateName, projectName, (err, result) => {
        if(err) {
            next(err);
        }
        else {
            res.json(result);
        }
    });
});

/* POST import project. */
router.post('/import', upload.single('project'), (req, res, next) => {
    const projectFile = req.file;

    projectService.importProject(projectFile, (err, result) => {
        if(err) {
            next(err);
        }
        else {
            res.json(result);
        }
    });
});

/* POST open project. */
router.post('/:projectName', (req, res, next) => {
    const projectName = req.params.projectName;

    projectService.openProject(projectName, (err, result) => {
        if(err) {
            next(err);
        }
        else {
            res.json(result);
        }
    });
});

/* GET template list. */
router.get('/templates', (req, res, next) => {
    projectService.getTemplateList((err, result) => {
        if(err) {
            next(err);
        }
        else {
            res.json(result);
        }
    });
});

/* GET page list. */
router.get('/:projectName/pages', (req, res, next) => {
    const projectName = req.params.projectName;
    projectService.getPageList(projectName, (err, result) => {
        if(err) {
            next(err);
        }
        else {
            res.json(result);
        }
    });
});

/* GET page content. */
router.get('/:projectName/pages/:pageName', (req, res, next) => {
    const projectName = req.params.projectName;
    const pageName = req.params.pageName;
    
    projectService.getPageContent(projectName, pageName, (err, result) => {
        if(err) {
            next(err);
        }
        else {
            res.json(result);
        }
    });
});

/* PUT page content. */
router.put('/:projectName/pages/:pageName', (req, res, next) => {
    const projectName = req.params.projectName;
    const pageName = req.params.pageName;
    const content = req.body.content;

    projectService.savePageContent(projectName, pageName, content, (err, result) => {
        if(err) {
            next(err);
        }
        else {
            res.json(result);
        }
    });
});

/* POST add page. */
router.post('/:projectName/pages/:pageName', (req, res, next) => {
    const projectName = req.params.projectName;
    const pageName = req.params.pageName;
    const content = req.body.content;

    projectService.addPage(projectName, pageName, content, (err, result) => {
        if(err) {
            next(err);
        }
        else {
            res.json(result);
        }
    });
});

/* DELETE delete page. */
router.delete('/:projectName/pages/:pageName', (req, res, next) => {
    const projectName = req.params.projectName;
    const pageName = req.params.pageName;

    projectService.deletePage(projectName, pageName, (err, result) => {
        if(err) {
            next(err);
        }
        else {
            res.json(result);
        }
    });
});


/* GET export project. */
router.get('/:projectName/export', (req, res, next) => {
    const projectName = req.params.projectName;

    projectService.exportProject(projectName, (err, result) => {
        if(err) {
            next(err);
        }
        else {
            res.download(result);
        }
    });
});

/* DELETE delete project. */
router.delete('/:projectName', (req, res, next) => {
    const projectName = req.params.projectName;

    projectService.deleteProject(projectName, (err, result) => {
        if(err) {
            next(err);
        }
        else {
            res.json(result);
        }
    });
});

module.exports = router;
