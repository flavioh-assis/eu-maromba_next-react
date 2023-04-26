import { useState } from 'react';
import { useCreateWorkoutSheet } from '@/workout-sheet/workout-sheet.service';
import { toast } from 'react-toastify';
import { Modal } from '@/workout-sheet/components';

type Props = {
	open: boolean;
	toggleModal: VoidFunction;
};

export const ModalCreate = ({ open, toggleModal }: Props) => {
	const { mutate } = useCreateWorkoutSheet();

	const [name, setName] = useState('');

	const handleCreate = () => {
		if (name === '') {
			toast.error('O texto não pode ser vazio.');
			return;
		}

		const dto = {
			name,
		};

		mutate(dto, {
			onError: () => {
				toast.error('Algo deu errado.');
			},
			onSuccess: () => {
				toast.success('Ficha criada!');
				toggleModal();
			},
		});
	};

	return (
		<Modal
			open={open}
			title='Criar ficha'
			handleConfirm={handleCreate}
			toggleModal={toggleModal}
		>
			<div>
				<label
					className='block mb-2 text-sm font-bold text-gray-700'
					htmlFor='name'
				>
					Nome da ficha
				</label>

				<input
					id='name'
					type='text'
					placeholder='Inferiores'
					value={name}
					onChange={t => setName(t.target.value)}
					className='w-full p-3 leading-tight text-gray-700 border rounded shadow focus:outline-none'
				/>
			</div>
		</Modal>
	);
};