import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect, useRef } from "react";
import "./text-editor.css";

const TextEditor: React.FC = () => {
	const ref = useRef<HTMLDivElement | null>(null);

	const [editing, setEditing] = useState(false);

	useEffect(() => {
		const listener = (event: MouseEvent) => {
			if (
				ref.current &&
				event.target &&
				ref.current.contains(event.target as Node)
			) {
				console.log("element clicked on is inside editor");
				return;
			}
			console.log("element clicked on is NOT inside editor");
			setEditing(false);
		};
		document.addEventListener("click", listener, { capture: true });

		return () => {
			document.removeEventListener("click", listener, { capture: true });
		};
	}, []);

	if (editing) {
		return (
			<div className='text-editor' ref={ref}>
				<MDEditor />
			</div>
		);
	}

	return (
		<div
			className='text-editor'
			onClick={() => {
				setEditing(true);
			}}
		>
			<MDEditor.Markdown source={"# Header"} />
		</div>
	);
};

export default TextEditor;