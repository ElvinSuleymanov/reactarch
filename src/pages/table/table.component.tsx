import {usePosts} from './actions/table.query';
import {Form, Input, Skeleton, Space, Table} from 'antd';
import useLocalization from 'assets/lang';
import {generateGuid} from 'core/helpers/generate-guid';
import { useRemovePosts, useUpdatePosts } from './actions/table.mutation';
import TableModel from './models/table.model';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {Button} from 'antd';
import { Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';

function TableComponent() {

    const {data, isLoading} = usePosts();
    const deletePost = useRemovePosts();
    const updatePost = useUpdatePosts();
    const [isModalOpen, setModalIsOpen] = useState(false);
    const [form] = useForm();
    useEffect(() => {
        setTables(data);

    }, [data]);

    const translate = useLocalization();
    const [targetEntity, setTargetEntity] = useState<null | TableModel>(null);
    const [tables, setTables] = useState<TableModel[] | null | undefined | readonly TableModel[]>();

    const deleteHandler =  async (record:TableModel) => {
        await deletePost.mutateAsync(record.id as number);
        setTables(tables?.filter(row => row.id !== record.id));
    };

    const updateHandler = async (values:TableModel) => {
        const payload = {
            ...values,
            id:targetEntity?.id
        };
        const tm = new TableModel(payload);
        await updatePost.mutateAsync(tm);
    };

    const closeModal = useCallback(() => {
        setTargetEntity(null);
        setModalIsOpen(false);
    }, []);

    const openModal = (record:TableModel) => {
        setTargetEntity(record);
        setModalIsOpen(true);
    };
    
    useEffect(() => {
        form.setFieldsValue(targetEntity);
    }, [targetEntity, form]);

    const columns = [
        {
            title:'Id',
            dataIndex:'id'
        },
        {
            title: translate('name'),
            dataIndex: 'name',
        },
        {
            title: translate('phone_number'),
            dataIndex: 'phoneNumber'
        },
        {
            title:translate('citizenship'),
            dataIndex:'citizenship'
        },
        {
            title:translate('birth_date'),
            dataIndex:'birthdate'
        },
        {
            title:translate('email'),
            dataIndex:'email'
        },
        {
            title:'',
            render:(record:TableModel) => (
                <Space size='middle'
                >
                  <Button
                  danger
                  onClick={() => deleteHandler(record)}
                  >Sil</Button>
                </Space>
              )
            },
            {
                title:'',
                render:(record:TableModel) => {

                   return (
                    <Space size={'middle'}>
                        <Button onClick={() => openModal(record)}>Redakte et</Button>
                    </Space>
                );
            }}
        
    ];

    const initialValues = useMemo(() => {
        return {
            ...targetEntity
        };
    }, [targetEntity]);



    return (
        <div>
            {
                isLoading 
                ?
                <Skeleton active/> 
                : 
                <>
                <Table
                    dataSource={tables as readonly TableModel[]}
                    columns={columns}
                    pagination={false}
                    rowKey={generateGuid()}
                    
                />
                 <Modal 
                 cancelButtonProps={{style:{display:'none'}}}  
                 okButtonProps={{style:{display:'none'}}}  
                 cancelText={translate('cancel')} 
                 okText={translate('submit')}  
                 onCancel={closeModal}   
                 open={isModalOpen}>
                
                    <Form form={form} initialValues={initialValues} style={{padding:'13px'}} onFinish={updateHandler}>

                        <Form.Item label={translate('name_surname')} name={'name'}>
                            <Input  placeholder={translate('name_surname')}/>
                        </Form.Item>

                        <Form.Item label={translate('birth_date')}  name={'birthdate'}>
                            <Input    />
                        </Form.Item>

                        <Form.Item label={translate('phone_number')} name={'phoneNumber'}>
                            <Input />
                        </Form.Item>

                        <Form.Item label={translate('email')} name={'email'}>
                            <Input />
                        </Form.Item>

                        <Form.Item label={translate('citizenship')} name={'citizenship'}>
                            <Input />
                        </Form.Item>

                        <Button htmlType='submit'  type='primary' >
                            Təsdiq et
                        </Button>

                        <Button style={{marginLeft:'10px'}} onClick={() => setModalIsOpen(false)}>
                            Ləğv et
                        </Button>

                    </Form>

                 </Modal>
                </>
            }
        </div>
    );
}

export default TableComponent;
