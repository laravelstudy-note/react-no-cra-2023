import { useState } from "react";

type Author = {
	author: string;
	text: string;
};
type MainZoneState = Author[];

export default function App() {
	const [state, setState] = useState<MainZoneState>([]);

	const onClickHandler = () => {
		setState([
			...state,
			{
				author: "a",
				text: "b",
			},
		]);
	};

	return (
		<div className="container">
			App Component
			<button onClick={onClickHandler}>test</button>
			{state.map((item) => (
				<p>{item.author}</p>
			))}
			<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
				Button
			</button>
		</div>
	);
}
