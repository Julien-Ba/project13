import './profile.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile } from '../../store/features/profile';
import Button from '../../components/button/Button';
import BalanceCard from '../../components/card/balance-card/BalanceCard';

const accounts = [
    { id: 1, name: 'Argent Bank Checking (x8349)', balance: '$2,082.79' },
    { id: 2, name: 'Argent Bank Savings (x6712)', balance: '$10,928.42' },
    { id: 3, name: 'Argent Bank Credit Card (x8349)', balance: '$184.30' },
];

export default function Profile() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.profile);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const editResult = await dispatch(
            editProfile({
                newFirstName: firstName,
                newLastName: lastName,
            })
        );
        if (editResult.error) {
            console.error(editResult.payload);
        } else {
            setIsModalOpen(false);
        }
    };

    return (
        <main className='profile bg-dark'>
            {!isModalOpen && (
                <div className='profile__header'>
                    <h1 className='profile__title'>
                        Welcome back
                        <br />
                        {`${user.firstName} ${user.lastName}!`}
                    </h1>
                    <Button className='profile__btn--edit' onClick={() => setIsModalOpen(true)}>
                        Edit Name
                    </Button>
                </div>
            )}
            {isModalOpen && (
                <form className='edit-profile' onSubmit={handleSubmit}>
                    <div className='input-wrapper'>
                        <label htmlFor='firstName'>First Name</label>
                        <input
                            type='text'
                            id='firstName'
                            name='firstName'
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            required
                        />
                    </div>
                    <div className='input-wrapper'>
                        <label htmlFor='lastName'>Last Name</label>
                        <input
                            type='text'
                            id='lastName'
                            name='lastName'
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            required
                        />
                    </div>
                    <Button type='submit' className='form__btn--submit'>
                        Save
                    </Button>
                </form>
            )}
            <div className='profile__accounts'>
                <h2 className='sr-only'>Accounts</h2>
                {accounts.map((account) => (
                    <BalanceCard key={account.id} {...account} />
                ))}
            </div>
        </main>
    );
}
