const { exec, execSync } = require('child_process')
const { readdir, readFile, writeFile, unlink, createWriteStream } = require('fs');
const { copy } = require('fs-extra');
const { join, parse } = require('path');
const archiver = require('archiver');

const projectsPath = './projects/';
const templatesPath = `${projectsPath}templates/`;
const exportPath = './export/';

class ProjectService {
    constructor() {
        this.projects = [];        
    }

    getTemplateList (callback) {
        readdir(templatesPath, { withFileTypes: true }, (error, files) => {
            if(error) {
                callback(error, null);
            }
            else {
                const templateList = files.filter(file => file.isDirectory()).map(dir => dir.name);
                callback(null, templateList);
            }
        })
    }

    getProjectList (callback) {
        readdir(projectsPath, { withFileTypes: true }, (error, files) => {
            if(error) {
                callback(error, null);
            }
            else {
                const projectList = files.filter(file => file.isDirectory() && file.name !== 'templates').map(dir => dir.name);
                callback(null, projectList);
            }
        })
    }

    getPageList (projectName, callback) {
        const pagesPath = `${projectsPath}${projectName}/src/components/pages/`;
        readdir(pagesPath, { withFileTypes: true }, (error, files) => {
            if(error) {
                callback(error, null);
            }
            else {
                const pageList = files.filter(file => !file.isDirectory() && file.name !== 'index.js').map(file => parse(file.name).name);
                callback(null, pageList);
            }
        })
    }

    createProject (templateName, projectName, callback) {
        var p = this.projects.filter((p) => p.name === projectName.toLowerCase());

        if (p.length === 0) {      
            var maxPort = this.getMaxProt();
            maxPort = (maxPort ? maxPort.port: 3000) + 1;

            const sourceDir = join(__dirname, '..', templatesPath, templateName);
            const destDir = join(__dirname, '..', projectsPath, projectName);
            copy(sourceDir, destDir, error => {
                if(error) {
                    callback(error, null);
                }
                else {
                    execSync('npm install', {
                        cwd: destDir
                    });
    
                    exec('npm start -- --port ' + maxPort, {
                        cwd: destDir
                    },
                    error => {
                        if(error) {
                            callback(error, null);
                        }
                        else {
                            this.projects.push({name: projectName.toLowerCase(), port: maxPort});
                            callback(null, {port: maxPort});                            
                        }
                    });
                }
            });
        }
    }

    openProject (projectName, callback) {
        var p = this.projects.filter((p) => p.name === projectName.toLowerCase());

        if (p.length === 0) {      
            var maxPort = this.getMaxProt();
            maxPort = (maxPort || 3000) + 1;

            const projectDir = join(__dirname, '..', projectsPath, projectName);
            exec('npm start -- --port ' + maxPort, {
                cwd: projectDir
            });

            this.projects.push({name: projectName.toLowerCase(), port: maxPort});
            callback(null, {port: maxPort});  
        }
        else {
            callback(null, {port: p[0].port});
        }
    }

    getMaxProt() {
        const ports = this.projects.map(project => project.port);
        return ports.length > 0 ? Math.max(...[ports]) : 0;
    }

    getPageContent(projectName, pageName, callback) {
        const pagePath = join(projectsPath, projectName, 'src/components/pages', pageName) + '.jsx';

        readFile(pagePath, function (error, data) {
            if(error == null) {
                callback(data.toString());
            }
            else {
                callback(error);
            }
          });
    }

    savePageContent(projectName, pageName, content, callback) {
        const pagePath = join(projectsPath, projectName, 'src/components/pages', pageName) + '.jsx';

        writeFile(pagePath, content, function (error) {
            callback(error);
        });
    }

    addPage(projectName, pageName, content, callback) {
        const pagePath = join(projectsPath, projectName, 'src/components/pages', pageName) + '.jsx';

        writeFile(pagePath, content, function (error) {
            if(error == null) {
                this.updatePageIndex(projectName, callback);
            }
            else {
                callback(error);
            }
        });
    }

    deletePage(projectName, pageName, callback) {
        const pagePath = join(projectsPath, projectName, 'src/components/pages', pageName) + '.jsx';

        unlink(pagePath, error => {
            if (error == null) {
                this.updatePageIndex(projectName, callback);
            }
            else {
                callback(error);
            }
        });
    }

    updatePageIndex(projectName, callback) {
        const pagesPath = `${projectsPath}${projectName}/src/components/pages/`;
        
        readdir(pagesPath, { withFileTypes: true }, (err, files) => {
            const pageList = files.filter(file => !file.isDirectory() && file.name !== 'index.js').map(file => parse(file.name).name);
            const pageIndexPath = join(projectsPath, projectName, 'src/components/pages/index.js');
            const pageIndexContentList = [];
            
            pageList.forEach(page => {
                const pageIndexEntry = `export * from './${page}';`;
                pageIndexContentList.push(pageIndexEntry);
            });

            writeFile(pageIndexPath, pageIndexContentList.join('\n'), function (error) {
                callback(error);
            });
        })
    }

    exportProject(projectName, callback) {
        this.archiveProject(projectName, result => callback(result))
    }

    archiveProject(projectName, callback) {
        const exportFile = join(__dirname, '..', exportPath, `${projectName}.zip`);
        const projectDir = join(__dirname, '..', projectsPath, projectName);

        // create a file to stream archive data to.
        const output = createWriteStream(exportFile);
        const archive = archiver('zip');

        output.on('close', function () {
            console.log(archive.pointer() + ' total bytes');
            console.log('archiver has been finalized and the output file descriptor has closed.');
            callback(exportFile);
        });
        
        archive.on('error', function(err){
            throw err;
        });
        
        archive.pipe(output);

        // Archive everything in the project directory except node modules
        archive.glob('**', {
            cwd: projectDir,
            ignore: ['node_modules/**']
        });

        archive.finalize();
    }
}

module.exports = new ProjectService();