const { exec, execSync } = require('child_process')
const { readdir, readFile, writeFile, unlink, createWriteStream, readdirSync, chmodSync } = require('fs');
const { copy, remove } = require('fs-extra');
const { join, parse } = require('path');
const { setSync } = require('winattr');
const AdmZip = require('adm-zip');
const archiver = require('archiver');
const psTree = require('ps-tree');

const logger = require('./log-service')('services:project-service');

const projectsPath = './projects/';
const templatesPath = `${projectsPath}templates/`;
const exportPath = './export/';
const importPath = './import/';
const pagesPath = 'src/components/pages';
const tenMegaBytes = 1024 * 1024 * 10;

class ProjectService {
    constructor() {
        this.projects = [];        
    }

    getTemplateList (callback) {
        readdir(templatesPath, { withFileTypes: true }, (err, files) => {
            if(err) {
                callback(err, null);
            }
            else {
                const templateList = files.filter(file => file.isDirectory()).map(dir => dir.name);
                callback(null, templateList);
            }
        });
    }

    getProjectList (callback) {
        readdir(projectsPath, { withFileTypes: true }, (err, files) => {
            if(err) {
                callback(err, null);
            }
            else {
                const projectList = files.filter(file => file.isDirectory() && file.name !== 'templates').map(dir => dir.name);
                callback(null, projectList);
            }
        });
    }

    getPageList (projectName, callback) {
        const pagesDir = join(projectsPath, projectName, pagesPath);

        readdir(pagesDir, { withFileTypes: true }, (err, files) => {
            if(err) {
                callback(err, null);
            }
            else {
                const pageList = files.filter(file => !file.isDirectory() && file.name !== 'index.js').map(file => parse(file.name).name);
                callback(null, pageList);
            }
        });
    }

    createProject (templateName, projectName, callback) {
        var projects = this.projects.filter(p => p.name === projectName.toLowerCase());

        if (projects.length === 0) {      
            var maxPort = this.getMaxProt();
            maxPort = (maxPort ? maxPort.port: 3000) + 1;

            const sourceDir = join(templatesPath, templateName);
            const destDir = join(projectsPath, projectName);

            logger.logDebug(`createProject : Copying file for project on port ${maxPort}`);

            copy(sourceDir, destDir, err => {
                if(err) {
                    logger.logError(err);
                    callback(err, null);
                }
                else {
                    logger.logDebug(`createProject : Copying file completed`);
                    const pagesDir = join(destDir, pagesPath);

                    try {
                        logger.logDebug(`createProject : Clearing read-only flags`);
                        // Remove read-only attribute from the files in the pages directory
                        this.clearReadonly(pagesDir);

                        logger.logDebug(`createProject : Running npm install`);
                        execSync('npm install', {
                            cwd: destDir,
                            maxBuffer: tenMegaBytes
                        });

                        logger.logDebug(`createProject : Starting project on port ${maxPort}`);
                        const process = exec('npm start -- --port ' + maxPort, {
                            cwd: destDir,
                            maxBuffer: tenMegaBytes
                        }, err => {
                            logger.logError(err);
                        });

                        this.projects.push({name: projectName.toLowerCase(), port: maxPort, process: process});
                        callback(null, {port: maxPort});
                    }
                    catch(ex) {
                        logger.logError(ex);
                        callback(ex, null);
                    }
                }
            });
        }
    }

    openProject (projectName, callback) {
        var projects = this.projects.filter(p => p.name === projectName.toLowerCase());

        if (projects.length === 0) {      
            var maxPort = this.getMaxProt();
            maxPort = (maxPort || 3000) + 1;

            logger.logDebug(`openProject : Starting project on port ${maxPort}`);

            const projectDir = join(projectsPath, projectName);
            const process = exec('npm start -- --port ' + maxPort, {
                cwd: projectDir,
                maxBuffer: tenMegaBytes
            }, err => {
                logger.logError(err);
            });

            this.projects.push({name: projectName.toLowerCase(), port: maxPort, process: process});
            callback(null, {port: maxPort});  
        }
        else {
            const port = projects[0].port;
            logger.logDebug(`openProject : Project already running on port ${port}`);

            callback(null, {port: port});
        }
    }

    getMaxProt() {
        const ports = this.projects.map(project => project.port);
        return ports.length > 0 ? Math.max(...[ports]) : 0;
    }

    clearReadonly(dir) {
        const files = readdirSync(dir, { withFileTypes: true });
        const fileList = files.filter(file => !file.isDirectory()).map(file => file.name);

        fileList.forEach(file => {
            const filePath = join(dir, file);
            const isWin = /^win/.test(process.platform);

            if(!isWin) {
                // Clear read-only for non windows
                chmodSync(filePath, '777');
            }
            else {
                // Clear read-only for windows
                setSync(filePath, {readonly: false});
            }
        });
    }

    getPageContent(projectName, pageName, callback) {
        const pagePath = join(projectsPath, projectName, pagesPath, pageName) + '.jsx';

        readFile(pagePath, (err, data) => {
            if(err) {
                callback(err, null);
            }
            else {
                callback(null, data.toString());
            }
          });
    }

    savePageContent(projectName, pageName, content, callback) {
        const pagePath = join(projectsPath, projectName, pagesPath, pageName) + '.jsx';

        writeFile(pagePath, content, err => {
            if(err) {
                callback(err, null);
            }
            else {
                callback(null, {status: 'success'});
            }
        });
    }

    addPage(projectName, pageName, content, callback) {
        const pagePath = join(projectsPath, projectName, pagesPath, pageName) + '.jsx';

        writeFile(pagePath, content, err => {
            if(err) {
                callback(err, null);
            }
            else {
                this.updatePageIndex(projectName, callback);
            }
        });
    }

    deletePage(projectName, pageName, callback) {
        const pagePath = join(projectsPath, projectName, pagesPath, pageName) + '.jsx';

        unlink(pagePath, err => {
            if (err) {
                callback(err, null);
            }
            else {
                this.updatePageIndex(projectName, callback);
            }
        });
    }

    updatePageIndex(projectName, callback) {
        const pagesDir = join(projectsPath, projectName, pagesPath);
        
        readdir(pagesDir, { withFileTypes: true }, (err, files) => {
            if(err) {
                callback(err, null);
            }
            else {
                const pageList = files.filter(file => !file.isDirectory() && file.name !== 'index.js').map(file => parse(file.name).name);
                const pageIndexPath = join(pagesDir, 'index.js');
                const pageIndexContentList = [];
                
                pageList.forEach(page => {
                    const pageIndexEntry = `export * from './${page}';`;
                    pageIndexContentList.push(pageIndexEntry);
                });

                writeFile(pageIndexPath, pageIndexContentList.join('\n'), err => {
                    if(err) {
                        callback(err, null);
                    }
                    else {
                        callback(null, {status: 'success'});
                    }
                });
            }
        })
    }

    exportProject(projectName, callback) {
        const projectDir = join(projectsPath, projectName);
        const excludePatterns = ['node_modules/**'];

        this.archeveDirectory(
            projectDir, 
            exportPath, 
            projectName, 
            excludePatterns, 
            (err, result) => callback(err, result));
    }

    archeveDirectory(sourceDirPath, destDirPath, destFileName, excludePatterns, callback) {
        const archiveFile = join(destDirPath, `${destFileName}.zip`);

        // create a file to stream archive data to.
        const output = createWriteStream(archiveFile);
        const archive = archiver('zip');

        output.on('close', () => {
            logger.logInfo(`archeveDirectory: ${archive.pointer()} total bytes`);
            logger.logInfo(`archeveDirectory: Archiver has been finalized and the output file descriptor has closed.`);
            callback(null, archiveFile);
        });
        
        archive.on('error', err => {
            callback(err, null);
        });
        
        archive.pipe(output);

        // Archive everything in the source directory except for excluded patterns
        archive.glob('**', {
            cwd: sourceDirPath,
            ignore: excludePatterns
        });

        archive.finalize();
    }

    deleteProject(projectName, callback) {
        const projectIndex = this.projects.findIndex(p => p.name === projectName.toLowerCase());
        const projectDir = join(projectsPath, projectName);

        if(projectIndex >= 0) {
            const project = this.projects[projectIndex];
            const pid = project.process.pid;
            const isWin = /^win/.test(process.platform);

            if(!isWin) {
                this.killProcess(pid, null, err => {
                    if(err) {
                        callback(err, null);
                    }
                    else {
                        this.deleteFileOrDirectory(projectDir, callback);
                    }
                });
            } else {
                var cp = require('child_process');
                cp.exec('taskkill /PID ' + pid + ' /T /F', (err, stdout, stderr) => {
                    logger.logDebug('stdout: ' + stdout);
                    logger.logError('stderr: ' + stderr);

                    if(err) {
                        callback(err, null);
                    }
                    else {
                        this.deleteFileOrDirectory(projectDir, callback);
                    }
                });             
            }

            this.projects.splice(projectIndex, 1);
        }
    }

    killProcess (pid, signal, callback) {
        signal   = signal || 'SIGKILL';
        callback = callback || function () {};
        var killTree = true;
        if(killTree) {
            psTree(pid, (err, children) => {
                if(err) {
                    callback(err, null);
                }
                else {
                    [pid].concat(children.map(p => {
                        return p.PID;
                    }))
                    .forEach(tpid => {
                        try { 
                            process.kill(tpid, signal); 
                        }
                        catch (ex) {
                            callback(ex, null);
                            return;
                        }
                    });

                    callback(null, {status: 'success'});
                }
            });
        } else {
            try { 
                process.kill(pid, signal);
                callback(null, {status: 'success'});
            }
            catch (ex) {
                callback(ex);
            }
        }
    }

    deleteFileOrDirectory(path, callback) {
        remove(path, err => {
            if(err) {
                callback(err, null);
            }
            else {
                callback(null, {status: 'success'});
            }
        });
    }

    importProject(projectFile, callback) {
        const fileName = projectFile.filename;
        const originalFileName = projectFile.originalname;
        const importFilePath = join(importPath, fileName);
        const extractPath = join(projectsPath, parse(originalFileName).name);

        this.extractArchive(importFilePath, extractPath, callback);
    }

    extractArchive(sourceFilePath, destPath, callback) {
        const zip = new AdmZip(sourceFilePath);

        try {
            zip.extractAllTo(destPath, true);
            callback(null, {status: 'success'});
        }
        catch(ex) {
            callback(ex, null);
        }

        // delete archive file after extracting
        this.deleteFileOrDirectory(sourceFilePath, err => {
            if(err) {
                logger.logError(err);
            }
        });
    }
}

module.exports = new ProjectService();
