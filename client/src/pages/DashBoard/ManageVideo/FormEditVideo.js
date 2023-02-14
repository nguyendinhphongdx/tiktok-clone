import { Button } from '@mui/material';
import { Formik } from 'formik';
import '../ManageMusics/Form.scss';
import { CustomInput } from '~/layouts/components/CustomInput/CustomInput';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { configBaseURL } from '~/common/common';

export const FormEditVideo = (props) => {
    const { id, handleUpdate } = props;
    const [initialValuesPackage, setInitialValuesPackage] = useState({
        video: '',
        description: '',
    });
    const getData = async () => {
        try {
            const res = await axios.get(`${configBaseURL}/api/video/detail/${id}`);
            if (res) {
                setInitialValuesPackage({
                    description: res?.data?.description,
                    video: res?.data?.video,
                });
            }
        } catch (err) {
            console.log('err', err);
        }
    };
    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    return (
        <div className="music__form">
            <Formik
                initialValues={initialValuesPackage}
                onSubmit={(values, { resetForm }) => {
                    handleUpdate(values);
                }}
                enableReinitialize
            >
                {({ handleSubmit, values, errors, handleChange, setFieldValue }) => {
                    return (
                        <div className="form">
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
                                <Button variant="contained" component="label" color="secondary">
                                    Upload Video (MP4)
                                    <input
                                        type="file"
                                        name="audio"
                                        onChange={(e) => setFieldValue('video', e.target.files[0])}
                                        hidden
                                        accept="video/mp4,video/x-m4v,video/*"
                                    />
                                </Button>
                                {values?.video && <span> {values?.video?.name}</span>}
                                {/* {values?.video && <span> {values?.video?.name}</span>} */}
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
