const fetch = require("node-fetch");
const fs = require('fs');

function getAllRepos() {
    return fetch('https://api.github.com/users/%7BuserName%7D/repos');
}

function getRepoInfo(repoName) {
    return fetch(`https://api.github.com/users/%7BuserName%7D/repos${repoName}`);
}

async function fetchAllRepos() {
    try {
        const response = await getAllRepos();
        return response.json();
    }
    catch (e) {
        console.log("Error found", e.message);
        throw e;
    }
}

async function fetchRepoData(repoName) {
    try {
        const repo = await getRepoInfo(repoName);
        return repo.json();
    }
    catch (e) {
        console.log("Error found", e.message);
        throw e;
    }
}

(async  function () {
    try {
        const allrepos = await fetchAllRepos();
        const repo = await fetchRepoData(allrepos[0].name);
        const data = Object.assign({}, { repositories: allrepos }, { firstRepository: repo });
        fs.writeFileSync('./reponse.json', JSON.stringify(data, null, 2));
        console.log('Response saved to file')
    } catch (e) {
        console.log(e);
    }
})();
