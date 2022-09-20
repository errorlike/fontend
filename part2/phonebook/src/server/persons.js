import axios from "axios";
const baseUrl = "http://localhost:3001/persons";
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
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll,
    create,
    deleteById
};