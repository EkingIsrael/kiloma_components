import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './NumberInputComponent.module.css';

function NumberInputComponent({
  LabelText,
  Step,
  Disabled,
  IsRTL,
  LabelColor,
  InputBackGroundColor,
  IsWithComma,
  InputWidthSize,
  IsTextCenter,
  ShowControlButton,
  MinLength,
  MaxLength,
  PlaceHolder,
}) {
  const [value, setValue] = useState(0);
  const allowedChar = '-';
  const errorMessage = `The character ${allowedChar} can appear only once`;

  const handleChange = (event) => {
    const inputValue = event.target.value;
    let newValue = inputValue.replace(/[^0-9+]|^-/g, (match, offset) => {
      if (offset === 0 && match === '-') {
        return match;
      }
      return '';
    });
    const charCount = (newValue.match(new RegExp(allowedChar, 'g')) || []).length;

    if (charCount > 1) {
      event.preventDefault();
      console.log(errorMessage);
    } else {
      if (newValue.length > 3) {
        const splitValue = newValue.split('.');
        splitValue[0] = splitValue[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); // use a regular expression to add commas every third character
        newValue = splitValue.join('.');
      }
      setValue(newValue);
    }
  };
  const handleChangeWithOutComma = (e) => {
    const inputValue = e.target.value;
    const newValue = inputValue.replace(/[^0-9+]|^-/g, (match, offset) => {
      if (offset === 0 && match === '-') {
        return match;
      }
      return '';
    });
    setValue(newValue);
  };
  const addValue = () => {
    if (Step) {
      setValue((prevValue) => {
        if (!IsWithComma) {
          return Number(Number(prevValue) + Step);
        }
        const newValue = Number((`${prevValue}`).replace(/[^\d]/g, '')) + Step;
        return parseInt(newValue, 10).toLocaleString();
      });
    } else {
      setValue((prevValue) => Number(prevValue + 1));
    }
  };
  const decreaseValue = () => {
    if (Step) {
      setValue((prevValue) => {
        if (!IsWithComma) {
          return Number(Number(prevValue) - Step);
        }
        const newValue = Number((`${prevValue}`).replace(/[^\d]/g, '')) - Step;
        return parseInt(newValue, 10).toLocaleString();
      });
    } else {
      setValue((prevValue) => Number(prevValue - 1));
    }
  };

  const InputBackGroundColorStyle = InputBackGroundColor
    ? { backgroundColor: InputBackGroundColor } : {};

  const LabelColorStyle = LabelColor ? { color: LabelColor } : {};
  const InputWidthSizeStyle = InputWidthSize ? { width: `${InputWidthSize}%` } : {};
  const TextCenterSize = IsTextCenter ? { textAlign: 'center' } : {};

  return (
    <div className={cx(styles.container, { [styles.RTL]: IsRTL })}>
      <label htmlFor="numberInput" className={styles.label} style={{ ...LabelColorStyle }}>
        {LabelText}
        <div className={styles.button_div}>
          <input
            type="text"
            pattern="[^-]+[^0-9]+"
            value={value}
            onInput={IsWithComma ? handleChange : handleChangeWithOutComma}
            step={Step}
            disabled={Disabled}
            minLength={MinLength}
            maxLength={MaxLength}
            placeholder={PlaceHolder}
            className={cx({ [styles.disabled]: Disabled }, [styles.input_style], [styles.LTR])}
            style={{ ...InputBackGroundColorStyle, ...InputWidthSizeStyle, ...TextCenterSize }}
          />
          {ShowControlButton ? (
            <div className={styles.inside_div_button}>
              <button className={cx({ [styles.disabled]: Disabled }, [styles.plus_input_button])} type="button" onClick={addValue}>+</button>
              <button className={cx({ [styles.disabled]: Disabled }, [styles.minus_input_button])} type="button" onClick={decreaseValue}>-</button>

            </div>
          ) : null }
        </div>
      </label>
    </div>
  );
}

NumberInputComponent.propTypes = {
  LabelText: PropTypes.string,
  Step: PropTypes.number,
  Disabled: PropTypes.bool,
  LabelColor: PropTypes.string,
  InputBackGroundColor: PropTypes.string,
  IsRTL: PropTypes.bool,
  IsWithComma: PropTypes.bool,
  InputWidthSize: PropTypes.number,
  IsTextCenter: PropTypes.bool,
  ShowControlButton: PropTypes.bool,
  MinLength: PropTypes.number,
  MaxLength: PropTypes.number,
  PlaceHolder: PropTypes.string,

};

NumberInputComponent.defaultProps = {
  LabelText: '',
  Step: null,
  Disabled: false,
  LabelColor: '',
  InputBackGroundColor: '',
  IsRTL: false,
  IsWithComma: true,
  InputWidthSize: null,
  IsTextCenter: false,
  ShowControlButton: true,
  MinLength: null,
  MaxLength: null,
  PlaceHolder: 'Place Holder',
};

export default NumberInputComponent;
