import axios from "axios";
const baseUrl = "/api/persons";
const getAll = () =>
    axios
        .get(baseUrl)
        .then(response => response.data);
const create = newObject =>
    axios
        .post(baseUrl, newObject)
        .then(response => response.data);
const deleteById = id =>
    axios
        .delete(`${baseUrl}/${id}`)
        .then(response => {
            console.log(response);
        });
export default {
    getAll,
    create,
    deleteById
};