// reactSelectStyles.js
import { FaChevronDown, FaTimes } from 'react-icons/fa';
import { components } from 'react-select';

export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#212529',
    borderColor: state.isFocused ? '#0d6efd' : '#495057',
    boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(13,110,253,.25)' : 'none',
    color: '#fff',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#212529',
    color: '#fff',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#fff',
    opacity: 1,
    transition: 'opacity 300ms',
    display: 'block',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#0d6efd33',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#fff',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#fff',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#dc3545',
      color: '#fff',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#0d6efd'
      : state.isFocused
      ? '#495057'
      : '#212529',
    color: '#fff',
  }),
  input: (provided) => ({
    ...provided,
    opacity: 0,
  }),
};

export const customTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#495057',
    primary: '#0d6efd',
    neutral0: '#212529',
    neutral80: '#fff',
  },
});

export const DropdownIndicator = (props) => (
  <components.DropdownIndicator {...props}>
    <FaChevronDown style={{ color: 'white' }} />
  </components.DropdownIndicator>
);

export const MultiValueRemove = (props) => (
  <components.MultiValueRemove {...props}>
    <FaTimes />
  </components.MultiValueRemove>
);
