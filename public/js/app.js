const postRequest = async (url) => {
    return await fetch(url, {method: "POST"})
};

const url = document.URL;
const docID = url.slice(31);

const deleteBtn = document.querySelector('#deleteBtn');
deleteBtn.addEventListener('click', () => {
    postRequest(`/database/${docID}?_method=DELETE`)
});