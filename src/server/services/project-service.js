const { execSync, spawn } = require('child_process')
const { readdir, readFile, writeFile, unlink, createWriteStream, readdirSync, chmodSync } = require('fs');
const { copy, remove } = require('fs-extra');
const { join, parse } = require('path');
const { setSync } = require('winattr');
const archiver = require('archiver');

const projectsPath = './projects/';
const templatesPath = `${projectsPath}templates/`;
const exportPath = './export/';
const pagesPath = 'src/components/pages';

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

            copy(sourceDir, destDir, err => {
                if(err) {
                    callback(err, null);
                }
                else {
                    const pagesDir = join(destDir, pagesPath);
                    // Remove read-only attribute from the files in the pages folder
                    this.clearReadonly(pagesDir);

                    execSync('npm install', {
                        cwd: destDir
                    });
    
                    const process = spawn('npm start -- --port ' + maxPort, {
                        cwd: destDir
                    });

                    this.projects.push({name: projectName.toLowerCase(), port: maxPort, process: process});
                    callback(null, {port: maxPort});                            
                }
            });
        }
    }

    openProject (projectName, callback) {
        var projects = this.projects.filter(p => p.name === projectName.toLowerCase());

        if (projects.length === 0) {      
            var maxPort = this.getMaxProt();
            maxPort = (maxPort || 3000) + 1;

            const projectDir = join(projectsPath, projectName);
            const process = spawn('npm start -- --port ' + maxPort, {
                cwd: projectDir
            });

            this.projects.push({name: projectName.toLowerCase(), port: maxPort, process: process});
            callback(null, {port: maxPort});  
        }
        else {
            callback(null, {port: projects[0].port});
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
            try {
                // Clear read-only for windows
                setSync(filePath, {readonly: false});
            }
            catch(ex) {
                // Clear read-only for non windows
                chmodSync(filePath, 777);
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
        this.archiveProject(projectName, (err, result) => callback(err, result));
    }

    archiveProject(projectName, callback) {
        const exportFile = join(exportPath, `${projectName}.zip`);
        const projectDir = join(projectsPath, projectName);

        // create a file to stream archive data to.
        const output = createWriteStream(exportFile);
        const archive = archiver('zip');

        output.on('close', () => {
            console.log(archive.pointer() + ' total bytes');
            console.log('archiver has been finalized and the output file descriptor has closed.');
            callback(null, exportFile);
        });
        
        archive.on('error', err => {
            callback(err, null);
        });
        
        archive.pipe(output);

        // Archive everything in the project directory except node modules
        archive.glob('**', {
            cwd: projectDir,
            ignore: ['node_modules/**']
        });

        archive.finalize();
    }

    deleteProject(projectName, callback) {
        const projectIndex = this.projects.findIndex(p => p.name === projectName.toLowerCase());
        const projectDir = join(projectsPath, projectName);

        if(projectIndex >= 0) {
            const project = this.projects[projectIndex];

            this.projects.splice(projectIndex, 1);
            project.process.kill();
        }

        remove(projectDir, err => {
            if(err) {
                callback(err, null);
            }
            else {
                callback(null, {status: 'success'});
            }
        });
    }
}

module.exports = new ProjectService();