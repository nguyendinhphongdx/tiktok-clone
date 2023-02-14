import { Avatar, Button } from '@mui/material';
import { Formik } from 'formik';
import './Form.scss';
import { CustomInput } from '~/layouts/components/CustomInput/CustomInput';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { configBaseURL } from '~/common/common';

export const FormMusicEdit = (props) => {
    const { id, handleUpdate, handleCreateNew } = props;
    const [previewImage, setPreviewImage] = useState();
    console.log('previewImage', previewImage);
    const [initialValuesPackage, setInitialValuesPackage] = useState({
        name: '',
        singer: '',
        image: '',
        audio: '',
    });
    const getData = async () => {
        try {
            const res = await axios.get(`${configBaseURL}/api/music/detail/${id}`);
            if (res) {
                setInitialValuesPackage({
                    image: res?.data?.thumbnail,
                    name: res?.data?.name,
                    audio: res?.data?.audio,
                    singer: res?.data?.singer,
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
                        handleCreateNew(values);
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
                                    label="Tên bài hát"
                                    name="name"
                                    error={errors.name}
                                />
                            </div>
                            <div className="wrapInput">
                                <CustomInput
                                    value={values.singer}
                                    handleChange={handleChange('singer')}
                                    label="Ca sĩ"
                                    name="singer"
                                    error={errors.singer}
                                />
                            </div>
                            <div className="wrapInput">
                                {!!previewImage && <Avatar src={previewImage} />}
                                <Button variant="contained" component="label" color="secondary">
                                    Upload Thumbnail
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={(e) => {
                                            setFieldValue('image', e.target.files[0]);
                                            handleChangeImage(e);
                                        }}
                                        hidden
                                        accept="image/*"
                                    />
                                </Button>
                                {/* {values?.image && <span> {values?.image?.name}</span>} */}
                            </div>
                            <div className="wrapInput">
                                <Button variant="contained" component="label" color="secondary">
                                    Upload Song (MP3)
                                    <input
                                        type="file"
                                        name="audio"
                                        onChange={(e) => setFieldValue('audio', e.target.files[0])}
                                        hidden
                                        accept="Audio/mp3"
                                    />
                                </Button>
                                {values?.audio && <span> {values?.audio?.name}</span>}
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
