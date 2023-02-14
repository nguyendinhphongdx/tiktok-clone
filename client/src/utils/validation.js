import * as Yup from 'yup';

export const formEditMusic = Yup.object().shape({
    name: Yup.string().required('Tên bài hát không được để trống!'),
    image: Yup.mixed().required('File is required'),
    audio: Yup.mixed().required('File is required'),
    singer: Yup.string().required('Tên ca sĩ không được để trống!'),
});
export const formEditUser = Yup.object().shape({
    nickname: Yup.string().required('Nickname không được để trống!'),
    name: Yup.string().required('Tên người dùng không được để trống!'),
    description: Yup.string().required('Description không được để trống!'),
});

export const formEditAccount = Yup.object().shape({
    phone: Yup.number().required('Số điện thoại không được để trống!'),
    email: Yup.string().required('Email không được để trống!'),
});
