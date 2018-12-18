import {Story} from '../promises/stories';

const story = new Story();

async function getFirstSections() {
    try {
        for (const n of [1, 2, 3]) {
            story.spawn(await story.getChapter(n));
        }
    } finally {
        story.displayFinished();
    }
}

getFirstSections();

async function getFirstSectionsInParallel() {
    try {
        const promises = [];

        [1, 2, 3].forEach(n => promises.push(story.getChapter(n)));

        story.spawn(await Promise.all(promises));
    } finally {
        story.displayFinished();
    }
}

getFirstSectionsInParallel();
