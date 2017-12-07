import PropTypes from 'prop-types';

const muiThemeProps = {
  spacing: PropTypes.object,
  fontFamily: PropTypes.string,
  palette: PropTypes.shape({
    primary1Color: PropTypes.string,
    primary2Color: PropTypes.string,
    primary3Color: PropTypes.string,
    accent1Color: PropTypes.string,
    accent2Color: PropTypes.string,
    accent3Color: PropTypes.string,
    textColor: PropTypes.string,
    alternateTextColor: PropTypes.string,
    canvasColor: PropTypes.string,
    borderColor: PropTypes.string,
    disabledColor: PropTypes.string,
    pickerHeaderColor: PropTypes.string,
    clockCircleColor: PropTypes.string,
    shadowColor: PropTypes.string,
  }),
};

export default muiThemeProps;
