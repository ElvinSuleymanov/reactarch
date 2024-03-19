import { errorToast } from 'core/shared/toast/toast';
import { useMutation, useQueryClient } from 'react-query';
import { deletePostsService, updatePostsService } from './table.service';
import TableModel from '../models/table.model';

export const useRemovePosts = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(id:string | number) => {
           return deletePostsService(id);
        },
        onSuccess:() => {
            queryClient.invalidateQueries('table');
        },
        onError:(error:Error) => {
                errorToast(error.message);
        }
    });
};

export const useUpdatePosts = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(updatedModel:TableModel) => {
            return updatePostsService(updatedModel);
        },
        onSuccess:() => {
            queryClient.invalidateQueries();
        }
    });
};