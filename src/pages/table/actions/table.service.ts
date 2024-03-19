import {API} from 'core/configs/api.config';
import axiosInstance from 'core/configs/axios.config';
import TableModel from '../models/table.model';
import { successToast } from 'core/shared/toast/toast';

export const getPostsService = () => {
    return axiosInstance.get(API.posts).then(res => {
        return res.data.map((item: any) => new TableModel(item));
    });
};

export const deletePostsService = (id:string | number) => {
    return axiosInstance.delete(API.posts
        + `/${id}` // for json server
        // {params: id} // for api
            ).then(data => {if (data.status === 200) successToast('Əməliyyat uğurla icra edildi'); });
};

export const updatePostsService = (updatedModel:TableModel) => {
    return axiosInstance.put(API.posts + `/${updatedModel.id}`, updatedModel).then(
        data => {if (data.status === 200) successToast('Əməliyyat uğurla icra edildi');}
    );
};