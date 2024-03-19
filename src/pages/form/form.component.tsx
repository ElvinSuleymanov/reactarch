import {useAddPost} from './actions/form.mutation';
import React, {useCallback, useMemo, useState} from 'react';
import {Form, Input, Button, Checkbox, DatePicker, TimePicker, Radio, Select} from 'antd';
import useLocalization from 'assets/lang';
import {IFormValues} from './form';

const FormComponent = ()=> {
    const translate = useLocalization();

    const addPost = useAddPost();
    
    const initialValues: IFormValues = {
        name: '',
        surname: '',
        birthdate: '',
        country: '',
        language: '',
        address: '',
        phoneNumber: '+994 ',
       
    };

    // const onSubmit = useCallback((values: IFormValues) => {
    //     console.log(values);
    //     // addPost.mutate(values);
    // }, [addPost]);

    const onSubmit = useCallback(async (e:IFormValues) => {
        const fullDate = new Date(e.birthdate);
        const formattedDate = `${fullDate.getFullYear()}-${String(fullDate.getMonth() + 1).padStart(2, '0')}-${String(fullDate.getDate()).padStart(2, '0')}`;
        const payload = {
            id:Math.floor(Math.random() * 900),
            ...e,
            birthdate:formattedDate,
        };
        await addPost.mutateAsync(payload);
        
    }, [addPost]);

    const rules = useMemo(() => ({ 
        title: [
            {
                required: true,
                message: translate('input_required'),
            }
        ],
        body: [
            {
                min: 8,
                message: translate('input_min_length', {
                    min: <span style={{color: 'green',}}>8</span>,
                }),
                
            }
        ],
        name: [
            {
                
            }
        ]

    }), [translate]);


    return (
        <div>
            <Form
                name='basic'
                initialValues={initialValues}
                onFinish={onSubmit}
                layout='vertical'
            >
                    <div className='row'>
                        <div className='col-lg-6'>
                            <Form.Item
                                name='name'
                                label={translate('your_name')}>
                                <Input placeholder='Adınızı qeyd edin'/>
                            </Form.Item>
                        </div>
                        <div className='col-lg-6'>
                            <Form.Item
                                name='surname' 
                                label={translate('your_surname')}>
                                <Input placeholder='Soyadınızı qeyd edin'/>
                            </Form.Item>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <Form.Item
                            name={'location'}
                            label={translate('location')}>
                                <Input
                                placeholder='Ünvanınızı qeyd edin'
                                />
                            </Form.Item>
                        </div>
                        <div className='col-lg-6'>
                            <Form.Item 
                            name={'phoneNumber'}
                            label={translate('phone_number')}
                            >
                            <Input
                            placeholder='Telefon nömrənizi qeyd edin' />
                            </Form.Item>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <Form.Item 
                                label={translate('birth_date')}
                                name={'birthdate'}
                             >
                                <DatePicker  
                                style={{width:'100%'}}
                                placeholder={translate('select_date')}
                                />
                            </Form.Item>
                        </div>
                        <div className='col-lg-6'>
                                <Form.Item 
                                label={translate('citizenship')} 
                                name={'citizenship'}>
                                    <Input
                                    placeholder='Vətəndaşlığınızı qeyd edin'
                                    />
                                </Form.Item>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <Form.Item
                            label={translate('email')}
                            name={'email'}
                            >
                                <Input 
                                type='email'
                                placeholder='Elektron poçtunuzu qeyd edin'
                                />
                            </Form.Item>
                        </div>
                       
                    </div>
                <div className='row mt-20'>
                    <div className='col-lg-3'>
                        <Button type='primary' htmlType='submit'>
                            Submit
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default FormComponent;
