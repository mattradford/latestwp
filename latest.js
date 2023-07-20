"use strict";

async function showLatest() {
    const response = await fetch("http://api.wordpress.org/core/stable-check/1.0/");
    const versions = await response.json();
    const versionsStr = JSON.stringify(versions);
    const indexOfLatest = versionsStr.indexOf('latest');
    const versionPosition = (indexOfLatest-8);
    const ver = versionsStr.slice(versionPosition, versionPosition+5)
    document.title += " " + ver;
    const target = document.getElementsByTagName("span");
    target[0].insertAdjacentText("beforeend", ver);
}
showLatest();