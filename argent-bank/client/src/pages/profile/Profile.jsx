import './profile.scss';
import { useSelector } from 'react-redux';
import Button from '../../components/button/Button';
import BalanceCard from '../../components/card/balance-card/BalanceCard';

const accounts = [
    { id: 1, name: 'Argent Bank Checking (x8349)', balance: '$2,082.79' },
    { id: 2, name: 'Argent Bank Savings (x6712)', balance: '$10,928.42' },
    { id: 3, name: 'Argent Bank Credit Card (x8349)', balance: '$184.30' },
];

export default function Profile() {
    const { user } = useSelector((state) => state.profile);
    return (
        <main className='profile bg-dark'>
            <div className='profile__header'>
                <h1 className='profile__title'>
                    Welcome back
                    <br />
                    {`${user.firstName} ${user.lastName}!`}
                </h1>
                <Button className='profile__btn--edit'>Edit Name</Button>
            </div>
            <div className='profile__accounts'>
                <h2 className='sr-only'>Accounts</h2>
                {accounts.map((account) => (
                    <BalanceCard key={account.id} {...account} />
                ))}
            </div>
        </main>
    );
}
