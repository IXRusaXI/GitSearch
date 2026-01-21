import {createSaveRepo} from "./insert.js";
import {createDropDownItem} from "./insert.js";

const searchInput = document.querySelector(".search-form__input");
const storagePanel = document.querySelector(".github-search__storage");
const resultPanel = document.querySelector(".github-search__results");
const savedRepoMap = new Map();
let timeOut;

function sendRequest(partOfName) {
    fetch(`https://api.github.com/search/repositories?${partOfName}`, {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            'Accept': 'application/vnd.github+json'
        },
    })
        .then(resp => {
            return resp.json()
        })
        .then(json => {
            let counter = 5;
            resultPanel.replaceChildren();

            for (let i = 0; i < counter; i++) {
                if (savedRepoMap.has(json.items[i].id + '')) {
                    counter++
                } else {
                    if (json.items[i] === undefined) {
                        return
                    }

                    resultPanel.appendChild(createDropDownItem(json.items[i]))
                }
            }
        })
        .catch(error => {
            console.log(`Возникла ошибка ${error.name}`)
        })
}

searchInput.addEventListener('input', (evt) => {
    const query = searchInput.value.trim();
    let debouncedFn;
    if (query.length > 0) {
        const searchParam = new URLSearchParams()
        searchParam.append('q', query)

        debouncedFn = debounce(() => sendRequest(searchParam), 1000)
    } else {
        clearTimeout(timeOut)
        debouncedFn = debounce(() => resultPanel.replaceChildren(), 300)
    }
    debouncedFn()
})

resultPanel.addEventListener('click', (evt) => {
    const listItem = evt.target.closest('.drop-down__item');
    const savedRepoElement = createSaveRepo(listItem.dataset.id, listItem.dataset.name, listItem.dataset.owner, listItem.dataset.stars);

    storagePanel.appendChild(savedRepoElement)
    savedRepoMap.set(listItem.dataset.id, savedRepoElement)
    searchInput.value = '';
    resultPanel.replaceChildren();
})

storagePanel.addEventListener('click', (evt) => {
    const savedItem = evt.target.closest('.saved-list__delete-button');

    if (savedItem) {
        const item = evt.target.closest('.saved-list__item')
        const savedRepoElement = savedRepoMap.get(item.dataset.id);
        savedRepoMap.delete(item.dataset.id)
        savedRepoElement.remove()
    }
})

function debounce(fn, debounceTime) {
    return function(...args) {
        if (!timeOut) {
            timeOut = setTimeout(() => {
                fn.apply(this, args)
            }, debounceTime)
        } else {
            clearTimeout(timeOut)
            timeOut = setTimeout(() => {
                fn.apply(this, args)
            }, debounceTime)
        }
    }
}