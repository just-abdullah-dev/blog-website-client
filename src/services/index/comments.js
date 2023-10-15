import axios from 'axios';

const comment = axios.create({
    baseURL: '/api/comments'
})

export const createNewComment = async ({
    token, slug, desc, parent, replyOnUser
}) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const data = await comment.post('/', { slug, desc, parent, replyOnUser }, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
}

export const updateComment = async ({
    token, desc, _id
}) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const data = await comment.put('/', { desc, _id }, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
}

export const deleteComment = async ({ token, _id }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const data = await comment.delete(`/${_id}`, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
}

