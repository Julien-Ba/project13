import './button.scss';
import { useFormStatus } from 'react-dom';
import PropTypes from 'prop-types';

export default function SubmitButton({ children, className = '' }) {
    const { pending } = useFormStatus();
    return (
        <button type='submit' className={`btn ${className}`} disabled={pending}>
            {children}
            {pending && '...'}
        </button>
    );
}

SubmitButton.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};
