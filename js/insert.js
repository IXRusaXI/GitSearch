export function createSaveRepo(id, name, author, stars) {
    const cardWrapper = document.createElement('div')

    const leftColumn = document.createElement('div')
    const rightColumn = document.createElement('div')

    const cardName = document.createElement('span')
    const cardAuthor = document.createElement('span')
    const countOfStars = document.createElement('span')
    const deleteButton = document.createElement('button')

    cardName.textContent = 'Name:' + name
    cardAuthor.textContent = 'Owner:' + author
    countOfStars.textContent = 'Stars:' + stars
    cardWrapper.dataset.id = id

    leftColumn.appendChild(cardName)
    leftColumn.appendChild(cardAuthor)
    leftColumn.appendChild(countOfStars)

    rightColumn.appendChild(deleteButton)

    cardWrapper.appendChild(leftColumn)
    cardWrapper.appendChild(rightColumn)

    deleteButton.classList.add('saved-list__delete-button')
    leftColumn.classList.add('saved-list__left-column')
    rightColumn.classList.add('saved-list__right-column')
    cardWrapper.classList.add('saved-list__item')
    return cardWrapper
}

export function createDropDownItem(result) {
    const item = document.createElement('div')
    const repoName = document.createElement('span')

    repoName.textContent = result.full_name
    item.dataset.id = result.id
    item.dataset.name = result.name
    item.dataset.owner = result.owner.login
    item.dataset.stars = result.stargazers_count

    item.appendChild(repoName)

    item.classList.add('drop-down__item')
    return item
}