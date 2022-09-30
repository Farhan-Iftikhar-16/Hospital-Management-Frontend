const ERROR_MESSAGES = {
  email: 'Please enter a valid email address',
  required: 'This field is required.',
  min: 'value too small',
  max: 'value too large',
  minlength: 'Value is too short',
  maxlength: 'Value is too big',
  passwordNotMatch: 'Password does not match',
  invalidPassword: 'Invalid Password'
};

const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  DOCTOR: 'DOCTOR',
  PATIENT: 'PATIENT'
}

const GENDERS = [
  {label: 'Male', value: 'MALE'},
  {label: 'Female', value: 'FEMALE'},
  {label: 'Other', value: 'OTHER'},
]

const SPECIALISTS = [
  {label: 'Urology', value: 'Urology'},
  {label: 'Orthopedic', value: 'Orthopedic'},
  {label: 'Cardiologis', value: 'Cardiologis'},
  {label: 'Dentist', value: 'Dentist'},
  {label: 'Neurology', value: 'Neurology'},
]

const STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
}

const BLOOD_GROUP_VALUE_SET = [
  {label: 'A-', value: 'A-'},
  {label: 'A+', value: 'A+'},
  {label: 'B-', value: 'B-'},
  {label: 'B+', value: 'B+'},
  {label: 'AB-', value: 'AB-'},
  {label: 'AB+', value: 'AB+'},
  {label: 'O-', value: 'O-'},
  {label: 'O+', value: 'O+'},
]

const STATUS_VALUE_SET = [
  {label: 'All', value: 'ALL'},
  {label: 'Active', value: 'ACTIVE'},
  {label: 'Inactive', value: 'INACTIVE'}
]

export {
  ERROR_MESSAGES,
  ROLES,
  GENDERS,
  STATUS,
  STATUS_VALUE_SET,
  BLOOD_GROUP_VALUE_SET,
  SPECIALISTS
};
