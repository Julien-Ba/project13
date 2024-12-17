import './button.scss';
import PropTypes from 'prop-types';

export default function Button({ children, className = '', type = 'button' }) {
    return (
        <button type={type} className={`btn ${className}`}>
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
};
