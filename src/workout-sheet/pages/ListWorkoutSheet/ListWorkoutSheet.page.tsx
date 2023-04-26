import { CardWorkoutSheet } from '@/workout-sheet/components';
import { ModalCreate } from '@/workout-sheet/components';
import { useGetAllWorkoutSheets } from '@/workout-sheet/workout-sheet.service';
import { useState } from 'react';

export const ListWorkoutSheet = () => {
	const { data } = useGetAllWorkoutSheets();
	const workoutSheets = data || [];

	const [openModal, setOpenModal] = useState(false);

	const toggleModal = () => setOpenModal(open => !open);

	return (
		<main className='flex flex-col items-center min-h-screen gap-2 p-2 sm:gap-6 sm:p-6'>
			<h1 className='text-lg font-bold sm:text-2xl'>Minhas fichas</h1>

			<div className='flex flex-col items-center w-full gap-3'>
				{workoutSheets.length ? (
					workoutSheets?.map(sheet => (
						<CardWorkoutSheet
							key={sheet.id}
							id={sheet.id}
							name={sheet.name}
							position={sheet.position}
							trainingCount={sheet.trainingCount}
						/>
					))
				) : (
					<p>Você não criou nenhuma ficha :(</p>
				)}

				<button
					onClick={toggleModal}
					className='px-4 py-2 my-3 text-white transition duration-300 bg-blue-600 rounded-md shadow-md hover:bg-blue-500'
				>
					Criar ficha
				</button>
			</div>

			<ModalCreate
				open={openModal}
				toggleModal={toggleModal}
			/>
		</main>
	);
};
