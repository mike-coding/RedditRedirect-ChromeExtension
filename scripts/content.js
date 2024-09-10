// bools
const isRelativeURL = url => !new RegExp('^(?:[a-z+]+:)?//', 'i').test(url);
const isARedditURL = url => url.includes('reddit.com');
const isOldRedditURL = url => url.includes('old.reddit.com');
const isNewRedditURL = url => url.includes('reddit.com') && !isOldRedditURL(url);
const isNewRedditOrRelativeURL = url => isRelativeURL(url) || isNewRedditURL(url);

// funcs
const makeOld = link =>
{
    if (isRelativeURL(link.href) && !link.href.includes("javascript")) link.href = 'old.reddit.com/'+link.href;
    else if (link.href.includes('www.reddit.com') && !link.href.includes('gallery')) link.href = link.href.replace('www.reddit.com', 'old.reddit.com');
    else link.href = link.href.replace('reddit.com', 'old.reddit.com');
}

let url = window.location.hostname;
let redditLinks;
redditLinks = isARedditURL(url) ? [...document.querySelectorAll('a[href]')].filter(link =>isNewRedditOrRelativeURL(link.href)) 
                                : [...document.querySelectorAll('a[href*="reddit.com"]')].filter(link =>isNewRedditURL(link.href));
redditLinks.forEach(makeOld);

