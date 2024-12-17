import './balance-card.scss';
import PropTypes from 'prop-types';
import Button from '../../button/Button';

export default function BalanceCard({ name, balance }) {
    return (
        <section className='account'>
            <div className='account__content'>
                <h3 className='account__name'>{name}</h3>
                <p className='account__balance'>{balance}</p>
                <p className='account__balance-label'>Available Balance</p>
            </div>
            <div className='account__actions'>
                <Button className='account__btn--transaction'>View transactions</Button>
            </div>
        </section>
    );
}

BalanceCard.propTypes = {
    name: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
};
