import {Story} from './stories';

/*** Execution **/

const story = new Story();

story.getAllStories()
    .then((response: XMLHttpRequestResponseType) =>
        story.spawn(response)
    )
    .finally(() =>
        story.displayFinished()
    );

console.time('Promise-Verkettung');
story.getChapter(1) // (*)
    .then((response1: XMLHttpRequestResponseType) => story.spawn(response1))
    .then(() => story.getChapter(2)) // (**)
    .then((response2: XMLHttpRequestResponseType) => story.spawn(response2))
    .then(() => story.getChapter(3)) // (***)
    .then((response3: XMLHttpRequestResponseType) => story.spawn(response3))
    .finally(() => {
        story.displayFinished();
        console.timeEnd('Promise-Verkettung');
    });

const chapters: Array<Promise<any>> = [];

for (const n of [1, 2, 3]) {
    chapters.push(story.getChapter(n));
}

console.time('Promise-all');
Promise.all(chapters).then((response) =>
    story.spawn(response)
).finally(() => {
    story.displayFinished();
    console.timeEnd('Promise-all');
});


Promise.race(chapters).then((response) =>
    story.spawn(response)
).finally(() =>
    story.displayFinished()
);

story.getChapter(1)
    .then(() => {
        throw new Error('Faked Error');
    })
    .catch((err) => {
        console.log(err);
        return story.getChapter(2);
    })
    .then((response2) => story.spawn(response2))
    .then(() => story.getChapter(3).then(response3 => story.spawn(response3)))
    .finally(() => story.displayFinished());