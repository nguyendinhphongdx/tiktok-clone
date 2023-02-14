import { Avatar, Button } from '@mui/material';
import { Formik } from 'formik';
import '../ManageMusics/Form.scss';
import { CustomInput } from '~/layouts/components/CustomInput/CustomInput';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { configBaseURL } from '~/common/common';

export const FormTrendy = (props) => {
    const { id, handleUpdate, handleCreate } = props;
    const [previewImage, setPreviewImage] = useState();
    console.log('previewImage', previewImage);
    const [initialValuesPackage, setInitialValuesPackage] = useState({
        name: '',
        description: '',
        thumbnail: '',
    });
    const getData = async () => {
        try {
            const res = await axios.get(`${configBaseURL}/api/trendy/detail/${id}`);
            if (res) {
                setInitialValuesPackage({
                    thumnail: res?.data?.thumbnail,
                    name: res?.data?.name,
                    description: res?.data?.description,
                });
                setPreviewImage(res?.data?.thumbnail);
            }
        } catch (err) {
            console.log('err', err);
        }
    };
    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    const handleChangeImage = (e) => {
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
    };
    return (
        <div className="music__form">
            <Formik
                initialValues={initialValuesPackage}
                onSubmit={(values, { resetForm }) => {
                    // handleUpdate(values);
                    // resetForm({ values: initialValuesPackage });
                    if (id) {
                        handleUpdate(values);
                    } else {
                        handleCreate(values);
                    }
                }}
                // validationSchema={id?}
                enableReinitialize
            >
                {({ handleSubmit, values, errors, handleChange, setFieldValue }) => {
                    console.log('error', errors);
                    return (
                        <div className="form">
                            <div className="wrapInput">
                                <CustomInput
                                    value={values.name}
                                    handleChange={handleChange('name')}
                                    label="Tên tag"
                                    name="name"
                                    error={errors.name}
                                />
                            </div>
                            <div className="wrapInput">
                                <CustomInput
                                    value={values.description}
                                    handleChange={handleChange('description')}
                                    label="Description"
                                    name="description"
                                    error={errors.description}
                                />
                            </div>
                            <div className="wrapInput">
                                {!!previewImage && <Avatar src={previewImage} />}
                                <Button variant="contained" component="label" color="secondary">
                                    Upload Thumbnail
                                    <input
                                        type="file"
                                        name="thumnail"
                                        onChange={(e) => {
                                            setFieldValue('thumnail', e.target.files[0]);
                                            handleChangeImage(e);
                                        }}
                                        hidden
                                        accept="image/*"
                                    />
                                </Button>
                            </div>
                            <div className="wrapBtn">
                                <Button onClick={handleSubmit} variant="contained">
                                    {id ? 'Cập nhật' : 'thêm'}
                                </Button>
                            </div>
                        </div>
                    );
                }}
            </Formik>
        </div>
    );
};
