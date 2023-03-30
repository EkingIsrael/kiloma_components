import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './TextAreaComponent.module.css';

function Textarea({
  Id,
  Name,
  Row,
  Column,
  AutoComplete,
  IsDisabled,
  IsRequired,
  IsReadOnly,
  MinValue,
  MaxValue,
  IsSpellChecker,
  DefaultValue,
  IsRTL,
  LabelColor,
  TextColor,
  Label,
  LabelFontFamily,
  TextFontFamily,
  PlaceHolder,
  IsShaded,
  ShadowColor,

}) {
  const LabelColorStyle = LabelColor ? { color: LabelColor } : {};
  const insideTextColor = TextColor ? { color: TextColor } : {};
  const LabelFontFamilyProp = LabelFontFamily ? { fontFamily: LabelFontFamily } : { fontFamily: 'Helvetica,Arial, sans-serif' };
  const TextInsideFontFamilyProp = TextFontFamily ? { fontFamily: TextFontFamily } : { fontFamily: 'Helvetica,Arial, sans-serif' };
  const shadowColorStyles = ShadowColor && IsShaded ? { boxShadow: `0px 0px 5px ${ShadowColor}` } : {};

  return (
    <div className={cx(styles.container, { [styles.RTL]: IsRTL })}>
      <textarea
        className={cx(styles.input, {
          [styles.disabled]: IsDisabled,
          [styles.RTL_Label]: IsShaded,
        })}
        style={{ ...TextInsideFontFamilyProp, ...insideTextColor, ...shadowColorStyles }}
        id={Id}
        name={Name}
        rows={Row}
        cols={Column}
        autoComplete={AutoComplete}
        disabled={IsDisabled}
        required={IsRequired}
        readOnly={IsReadOnly}
        minLength={MinValue}
        maxLength={MaxValue}
        spellCheck={IsSpellChecker}
        value={DefaultValue}
        placeholder={PlaceHolder}
      />
      <label htmlFor="TextAreaId" className={cx(styles.label)} style={{ ...LabelColorStyle, ...LabelFontFamilyProp }}>
        {' '}
        {Label}
        {' '}
      </label>

    </div>
  );
}

Textarea.propTypes = {
  Label: PropTypes.string,
  Id: PropTypes.string,
  Name: PropTypes.string,
  Row: PropTypes.number,
  Column: PropTypes.number,
  AutoComplete: PropTypes.bool,
  IsDisabled: PropTypes.bool,
  IsRequired: PropTypes.bool.isRequired,
  IsReadOnly: PropTypes.bool,
  MinValue: PropTypes.number,
  MaxValue: PropTypes.number,
  IsSpellChecker: PropTypes.bool,
  DefaultValue: PropTypes.string,
  IsRTL: PropTypes.bool,
  LabelColor: PropTypes.string,
  TextColor: PropTypes.string,
  LabelFontFamily: PropTypes.string,
  TextFontFamily: PropTypes.string,
  PlaceHolder: PropTypes.string,
  IsShaded: PropTypes.bool,
  ShadowColor: PropTypes.string,
};

Textarea.defaultProps = {
  Label: '',
  Id: '',
  Name: '',
  Row: null,
  Column: null,
  AutoComplete: true,
  IsDisabled: false,
  IsReadOnly: false,
  MinValue: 1,
  MaxValue: 999,
  IsSpellChecker: true,
  DefaultValue: null,
  IsRTL: false,
  LabelColor: '',
  TextColor: '',
  LabelFontFamily: '',
  TextFontFamily: '',
  PlaceHolder: '',
  IsShaded: false,
  ShadowColor: '',
};
export default Textarea;
