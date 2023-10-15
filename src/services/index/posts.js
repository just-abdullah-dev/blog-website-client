import axios from 'axios';

const post = axios.create({
    baseURL: '/api/posts'
})

export const getAllPosts = async (searchKeyword = '', page = 1, limit = 9)=>{
    try {
        const {data, headers} = await post.get(`/?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`);
        return {data, headers};
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
}

export const getSinglePost = async ({slug})=>{
    try {
        const data = await post.get(`/${slug}`);
        return data.data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
}

export const createPost = async ({token, title, caption})=>{
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const data = await post.post(`/`, {title, caption}, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
}

export const deletePost = async ({token, slug})=>{
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const data = await post.delete(`/${slug}`, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
}

export const updatePost = async ({token, slug, updatedData})=>{
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const data = await post.put(`/${slug}`, updatedData, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
}

export const updatePostStatus = async ({token, slug, status})=>{
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const data = await post.put(`/status/${slug}`, {status}, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
}


