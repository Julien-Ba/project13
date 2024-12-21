import './button.scss';
import PropTypes from 'prop-types';

export default function SubmitButton({ children, className = '', disabled }) {
    return (
        <button type='submit' className={`btn ${className}`} disabled={disabled}>
            {children}
            {disabled && '...'}
        </button>
    );
}

SubmitButton.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
};
