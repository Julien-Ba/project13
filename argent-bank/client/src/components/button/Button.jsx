import './button.scss';
import PropTypes from 'prop-types';
import SubmitButton from './SubmitButton';

export default function Button({ children, className = '', type = 'button', onClick }) {
    if (type === 'submit') return <SubmitButton className={className}>{children}</SubmitButton>;
    return (
        <button type={type} className={`btn ${className}`} onClick={onClick}>
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    onClick: PropTypes.func,
};
