import React, { useEffect }  from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { connect } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { putData, getData } from './redux/action';
import './styles.module.scss';
import makeStyles from "@material-ui/core/styles/makeStyles";
const now = new Date();

const useStyles = makeStyles(() => ({
  textField: {
    marginTop: '10px',
    width: '100%',
  },
}));
const schema = yup.object().shape({
  name: yup.string()
    .required('Enter your name.')
    .matches(/[a-zA-Z]/, 'Your name can only contain Latin letters.')
    .min(3, 'Your name should be more than 3 letters'),
  surname: yup.string()
    .required('Enter your surname.')
    .matches(/[a-zA-Z]/, 'Your surname can only contain Latin letters.')
    .min(3, 'Your surname should be more than 3 letters'),
  patronymic: yup.string()
    .required('Enter your patronymic.')
    .matches(/[a-zA-Z]/, 'Patronymic can only contain Latin letters.')
    .min(3, 'Your patronymic should be more than 3 letters'),
  birthday: yup.date()
    .required('Enter your birthday.')
    .test(value => {
      let newDate = moment(value).toISOString();
      let newNow = moment(now).toISOString();
      return moment(newDate).diff(newNow) < 0;
    }),
  email: yup.string()
    .required('Enter your email.')
    .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Wrong format of email.'),
  password: yup.string()
    .required('Enter password.')
    .min(6, 'Your password should be more than 6 chars.'),
  confirmPassword: yup.string()
    .required('Confirm password.')
    .oneOf([yup.ref('password')], 'Passwords mismatched.')
    .min(6, 'Your password should be more than 6 chars.'),
});

const App = ({
  formData,
  dispatchPutData,
  dispatchGetData,
}) => {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({
    resolver: yupResolver(schema)
  });

  const classes = useStyles();

  useEffect(() => {
    dispatchGetData();
    if (formData && formData.name !== '') {
      alert("My congratulations!\nYour name is " + formData.name +
        '\nYour surname is ' + formData.surname +
        '\nYour patronymic is ' + formData.patronymic +
        '\nYour birthday is ' + formData.birthday +
        '\nYour email is ' + formData.email);
    }
  }, [formData, dispatchGetData]);

  const onSubmit = (data) => {
    const newData = {
      name: data.name,
      surname: data.surname,
      patronymic: data.patronymic,
      birthday: moment(data.birthday).format('LL'),
      email: data.email
    };
    dispatchPutData(newData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <TextField
          {...register("name")}
          className={classes.textField}
          fullWidth
          type='text'
          variant="outlined"
          label="Enter your name"
        />
        {errors?.name && <p>{errors?.name.message}</p>}
        <TextField
          {...register("surname")}
          className={classes.textField}
          fullWidth
          type='text'
          variant="outlined"
          label="Enter your surname"
        />
        {errors?.surname && <p>{errors?.surname.message}</p>}
        <TextField
          {...register("patronymic")}
          className={classes.textField}
          fullWidth
          type='text'
          variant="outlined"
          label="Enter your patronymic"
        />
        {errors?.patronymic && <p>{errors?.patronymic.message}</p>}
        <TextField
          {...register("birthday")}
          InputLabelProps={{ shrink: true }}
          className={classes.textField}
          fullWidth
          type="date"
          variant="outlined"
          label="Enter your birthday"
        />
        {errors?.birthday && <p>{errors?.birthday.message}</p>}
        <TextField
          {...register("email")}
          className={classes.textField}
          fullWidth
          type='email'
          variant="outlined"
          label="Enter your email"
        />
        {errors?.email && <p>{errors?.email.message}</p>}
        <TextField
          {...register("password")}
          className={classes.textField}
          fullWidth
          type="password"
          variant="outlined"
          label="Enter password"
        />
        {errors?.password && <p>{errors?.password.message}</p>}
        <TextField
          {...register("confirmPassword")}
          className={classes.textField}
          fullWidth
          type="password"
          variant="outlined"
          label="Confirm your password"
        />
        {errors?.confirmPassword && <p>{errors?.confirmPassword.message}</p>}
      </div>
      <Button type="submit">Send info</Button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  formData: state.data,
});

const mapDispatchToProps = {
  dispatchPutData: putData,
  dispatchGetData: getData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
