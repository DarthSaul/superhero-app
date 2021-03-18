const postRequest = async (url) => {
    return await fetch(url, {method: "POST"})
};

const url = document.URL;
const docID = url.slice(29);

const deleteBtn = document.querySelector('#deleteBtn');
deleteBtn.addEventListener('click', () => {
    postRequest(`/heroes/${docID}?_method=DELETE`)
});