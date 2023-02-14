import { Avatar, Button } from '@mui/material';
import axios from 'axios';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { configBaseURL } from '~/common/common';
import { CustomInput } from '~/layouts/components/CustomInput/CustomInput';
import { formEditUser } from '~/utils/validation';
import '../ManageMusics/Form.scss';

export const FormEditUser = (props) => {
    const { id, handleUpdate } = props;
    const [previewImage, setPreviewImage] = useState();
    const [image, setImage] = useState();
    console.log('image', image)
    const [initialValuesPackage, setInitialValuesPackage] = useState({
        description: '',
        name: '',
        nickname: '',
    });
    const getData = async () => {
        try {
            const res = await axios.get(`${configBaseURL}/api/users/get-info/${id}`);
            if (res) {
                setInitialValuesPackage({
                    name: res?.data?.name,
                    description: res?.data?.description,
                    nickname: res?.data?.nickname,
                });
                setPreviewImage(res?.data?.avatar);
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
        setImage(e.target.files[0]);
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
    };
    return (
        <div className="music__form">
            <Formik
                initialValues={initialValuesPackage}
                onSubmit={(values, { resetForm }) => {
                    handleUpdate({
                        ...values,
                        image: image,
                    });
                    // resetForm({ values: initialValuesPackage });
                }}
                validationSchema={formEditUser}
                enableReinitialize
            >
                {({ handleSubmit, values, errors, setFieldValue, handleChange }) => {
                    console.log(errors);
                    return (
                        <div className="form">
                            <div className="wrapInput">
                                <CustomInput
                                    value={values.name}
                                    handleChange={handleChange('name')}
                                    label="Tên"
                                    name="name"
                                    error={errors.name}
                                />
                            </div>
                            <div className="wrapInput">
                                <CustomInput
                                    value={values.nickname}
                                    handleChange={handleChange('nickname')}
                                    label="nickname"
                                    name="nickname"
                                    error={errors.nickname}
                                />
                            </div>
                            <div className="wrapInput">
                                <CustomInput
                                    value={values.description}
                                    handleChange={handleChange('description')}
                                    label="Mô tả"
                                    name="description"
                                    error={errors.description}
                                />
                            </div>
                            <div className="wrapInput">
                                {!!previewImage && <Avatar src={previewImage} />}
                                <Button variant="contained" component="label" color="secondary">
                                    Thay đổi ảnh đại diện
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={(e) => handleChangeImage(e)}
                                        hidden
                                        accept="image/*"
                                    />
                                </Button>
                            </div>
                            <div className="wrapBtn">
                                <Button onClick={handleSubmit} variant="contained">
                                    Cập nhật
                                </Button>
                            </div>
                        </div>
                    );
                }}
            </Formik>
        </div>
    );
};
