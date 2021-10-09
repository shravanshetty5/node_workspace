import 'colors';
import shell from 'shelljs';
import config from './config.json';

console.log(config);

//put any path you want the git files to be added at
const repositoriesDirectory = '/Users/shravan.shetty/personal_projects';

const cloneRepos = (repoPath, repoList = []) => {
    if (!repoPath) {
        console.log(`path :${repoPath} is not valid`.red);
        return;
    }
    if (!repoList.length) {
        console.log(`Repo list is empty`.red);
        return;
    }

    console.log(`Cloning repositories to: ${repoPath}`.blue);
    shell.cd(repoPath);
    repoList.forEach((repo, index) => {
        console.log(`Cloning ${index + 1} of ${repoList.length}`.cyan);
        shell.exec(`git clone ${repo} --progress -b master`);
    });
    console.log('Completed cloning of repositories'.green);
};

cloneRepos(repositoriesDirectory, config.repositories);
