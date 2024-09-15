import { useRef, useState } from "react";
import type React from "react";
import InputMask from "react-input-mask";
import type { User } from "../types/user";
import { emailRegex } from "../constants/main";
export function App() {
	const [email, setEmail] = useState("");
	const [number, setNumber] = useState<string | null>(null);
	const [results, setResults] = useState<User[]>([]);
	const [not_found, setNotFound] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const abortControllerRef = useRef<AbortController | null>(null);
	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}
		const controller = new AbortController();
		abortControllerRef.current = controller;
		const _number = number?.replaceAll(/-/g, "") || null;
		setResults((pv) => []);
		setNotFound((pv) => false);
		if (!emailRegex.test(email)) {
			return setError("Некорректная почта");
		}
		if (_number) {
			if (Number.isNaN(Number(_number))) {
				return setError("Некорректный номер");
			}
		}
		setError("");
		setLoading((pv) => true);
		const response = await fetch("http://localhost:4444/api/search", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, number: _number }),
			signal: controller.signal,
		}).finally(() => setLoading((pv) => false));
		if (response.status === 404) {
			return setNotFound((pv) => true);
		}
		if (!response.ok) {
			return setError("Произошла ошибка при запросе");
		}
		const jsonData = await response.json();
		setResults((pv) => jsonData.data as User[]);
		return;
	}

	return (
		<div className="m-2 h-full w-full grid justify-center  items-center">
			<form
				onSubmit={handleSubmit}
				className=" flex flex-col w-96 gap-3 justify-center"
			>
				<label htmlFor="inputEmail">Почта:</label>
				<input
					type="email"
					placeholder="user@example.com"
					id="inputEmail"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<label htmlFor="inputNumber">Номер:</label>
				<InputMask
					id="inputNumber"
					mask="99-99-99"
					value={number || ""}
					placeholder="99-99-99"
					onChange={(e) => setNumber(e.target.value)}
				/>
				<button
					className="hover:bg-slate-700/40 p-2 bg-cyan-300/40 active:bg-green-500/40"
					type="submit"
				>
					Найти
				</button>
			</form>
			{error && <p className=" text-red-600 font-bold">{error}</p>}
			<div>
				{loading && <div>Загрузка...</div>}
				{not_found && <div>Ничего не найдено по вашему запросу</div>}
				{results.map((user, index) => (
					<div
						className="border-4 border-blue-200/40 bg-blue-400/20"
						key={user.number}
					>
						<div className="flex">
							<span className="mr-2">{index + 1} </span>
							<div>
								<p>
									Почта:{" "}
									<span className="text-blue-900">
										{user.email}
									</span>
								</p>
								<p> Номер: {user.number}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
