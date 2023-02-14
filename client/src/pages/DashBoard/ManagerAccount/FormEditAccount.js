import { Button, FormControl, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { configBaseURL } from '~/common/common';
import { CustomInput } from '~/layouts/components/CustomInput/CustomInput';
import { formEditAccount } from '~/utils/validation';
import '../ManageMusics/Form.scss';

export const FormEditAccount = (props) => {
    const { id, handleUpdate } = props;
    const [initialValuesPackage, setInitialValuesPackage] = useState({
        email: '',
        phone: '',
        role: '',
    });
    const getData = async () => {
        try {
            const res = await axios.get(`${configBaseURL}/api/accounts/${id}`);
            if (res) {
                setInitialValuesPackage({
                    email: res?.data?.email,
                    phone: res?.data?.phone,
                    role: res?.data?.role,
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
                    console.log(values);
                    // resetForm({ values: initialValuesPackage });
                }}
                validationSchema={formEditAccount}
                enableReinitialize
            >
                {({ handleSubmit, values, errors, handleChange, setFieldValue }) => {
                    console.log(errors);
                    return (
                        <div className="form">
                            <div className="wrapInput">
                                <CustomInput
                                    value={values.email}
                                    handleChange={handleChange('email')}
                                    label="Email"
                                    name="email"
                                    error={errors.email}
                                />
                            </div>
                            <div className="wrapInput">
                                <CustomInput
                                    value={values.phone}
                                    handleChange={handleChange('phone')}
                                    label="Phone"
                                    name="phone"
                                    error={errors.phone}
                                    type="number"
                                />
                            </div>
                            <FormControl>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={values.role}
                                    sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                                    onChange={(e) => setFieldValue('role', e.target.value)}
                                >
                                    <MenuItem value={'admin'}>Admin</MenuItem>
                                    <MenuItem value={'user'}>User</MenuItem>
                                </Select>
                            </FormControl>
                            <div className="wrapBtn">
                                <Button onClick={handleSubmit} variant="contained">
                                    Edit
                                </Button>
                            </div>
                        </div>
                    );
                }}
            </Formik>
        </div>
    );
};
